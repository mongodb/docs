#!/usr/bin/env bash
# Shared helper for automatic Jira state transitions (DOCSP-61672).
#
# Usage:
#   jira-transition.sh <DOCSP-KEY> <TARGET-STATUS> [--require-points]
#                      [--require-assignee-me]
#
# Behavior:
#   * Reads the ticket once, then transitions it to <TARGET-STATUS> using the
#     jira CLI.
#   * Forward-only. The ticket's current status is checked first, and the move
#     is skipped unless <TARGET-STATUS> is strictly later in the workflow. A
#     hook may advance a ticket; it must never rewind one. Without this, a
#     branch created to investigate an already-closed ticket would drag it back
#     to In Progress with no prompt and no confirmation (DOCSP-63226).
#   * With --require-points, the transition is gated on Story Points Estimate
#     (customfield_27258) already being set. This is needed for "In Progress",
#     whose transition screen makes story points a required field: the move is
#     rejected (HTTP 400) when the estimate is empty. Because the rubric is
#     qualitative (writing effort, product knowledge, testing effort), the
#     estimate needs ticket scope a hook cannot judge, so the hook does NOT
#     invent a number. Instead it asks the agent to propose one, confirm it
#     with the writer, and then transition -- and it skips the move this run.
#   * With --require-assignee-me, the move is skipped when the ticket is
#     assigned to SOMEONE ELSE. Callers pass this when the key came from
#     something softer than the branch name -- currently a ticket mentioned in a
#     prompt (DOCSP-63226) -- so that merely discussing a colleague's ticket
#     cannot start it. Skipping here is silent: a mention that was never a start
#     signal is not worth narrating.
#
#     An UNASSIGNED ticket is permitted. It is not someone else's, and picking
#     one up is the normal way DOCSP work starts -- 41% of Ready for Work
#     tickets were unassigned when this was measured, so refusing them put two
#     in five tickets into a silent hole in exactly the scenario this fallback
#     exists to cover. The guard still blocks the case it was written for.
#
# EXIT CODES (the callers depend on these):
#   0   Nothing further to do this session -- moved, already at/past the
#       target, or declined for a reason that will not change on the next edit.
#   10  Deferred pending a story-points estimate. The caller must NOT write its
#       dedup sentinel on this path, so the ask can fire again if it is missed.
#
# NOTE ON NAMES: `jira issue move` takes TRANSITION names, which do not always
# match the status name. "In Progress" and "Internal Review" happen to match;
# closing does not -- the transition is "Close" against the status "Closed"
# (DOCSP-62478). $TARGET is used both to rank the workflow position (a status
# name) and as the transition name, so this helper only supports targets where
# the two agree. Add a name map here before passing one where they diverge.
#
# Reads are done with `jira issue view --raw`, which returns the full issue
# JSON including custom fields, so this helper needs only the jira CLI's own
# auth -- no separate $JIRA_API_TOKEN.
#
# This helper is advisory and non-blocking: no path fails the tool call, and
# any Jira failure is reported as a note. It prints human-readable status lines
# to stdout; the calling hook wraps them for delivery.

set -uo pipefail

KEY="${1:-}"
TARGET="${2:-}"

[[ -z "$KEY" || -z "$TARGET" ]] && exit 0

shift 2
REQUIRE_POINTS=""
REQUIRE_ASSIGNEE=""
for arg in "$@"; do
  case "$arg" in
    --require-points)      REQUIRE_POINTS=1 ;;
    --require-assignee-me) REQUIRE_ASSIGNEE=1 ;;
  esac
done

SP_FIELD="customfield_27258"   # Story Points Estimate (the upfront estimate)

# Workflow order for the forward-only rule. Statuses outside this ladder
# (Blocked, RICET, anything team-specific) rank 0: a human put the ticket
# there deliberately and the helper cannot tell where it sits, so it declines
# rather than guessing.
workflow_rank() {
  case "$1" in
    "Needs Triage"|"Backlog") echo 1 ;;
    "Ready for Work")         echo 2 ;;
    "In Progress")            echo 3 ;;
    "Internal Review")        echo 4 ;;
    "External Review")        echo 5 ;;
    "Needs Merge")            echo 6 ;;
    "Closed")                 echo 7 ;;
    *)                        echo 0 ;;
  esac
}

# --- Read the ticket once ---------------------------------------------------
raw=$(jira issue view "$KEY" --raw 2>/dev/null)
if [[ -z "$raw" ]]; then
  echo "Could not read $KEY from Jira, so it was left alone. Check that the jira CLI is authenticated, then move it to \"$TARGET\" manually if needed."
  exit 0
fi

# --- Assignee gate: only for keys the caller flagged as soft ----------------
if [[ -n "$REQUIRE_ASSIGNEE" ]]; then
  lower() { tr '[:upper:]' '[:lower:]'; }   # bash 3.2 has no ${var,,}
  me=$(jira me 2>/dev/null | tr -d '[:space:]' | lower)
  assignee=$(printf '%s' "$raw" \
    | jq -r '.fields.assignee.emailAddress // .fields.assignee.name // empty' 2>/dev/null \
    | tr -d '[:space:]' | lower)
  # Only an assignee that is present AND different is disqualifying. When the
  # ticket has an assignee we must be able to name ourselves to clear it, so an
  # unreadable $me is treated as "cannot verify" and skips.
  if [[ -n "$assignee" ]]; then
    [[ -z "$me" || "$me" != "$assignee" ]] && exit 0
  fi
fi

status=$(printf '%s' "$raw" | jq -r '.fields.status.name // empty' 2>/dev/null)
points=$(printf '%s' "$raw" | jq -r ".fields.$SP_FIELD // empty" 2>/dev/null)

# --- Status gate: forward-only ---------------------------------------------
target_rank=$(workflow_rank "$TARGET")
current_rank=$(workflow_rank "$status")

if [[ "$target_rank" -eq 0 ]]; then
  echo "Cannot place \"$TARGET\" in the DOCSP workflow, so $KEY was left alone. Move it manually if needed."
  exit 0
fi

if [[ "$current_rank" -eq 0 ]]; then
  echo "$KEY is in \"${status:-unknown}\", which is outside the normal workflow, so it was left alone. If it should be in \"$TARGET\", move it manually."
  exit 0
fi

# Already at the target. Silent by design: the common, correct case, and it
# needs no narration.
if [[ "$current_rank" -eq "$target_rank" ]]; then
  exit 0
fi

# Further along than the target. Rewinding would be wrong, but this is worth
# saying: editing files against a ticket that is already in review or closed
# usually means the work shipped, and knowing that early saves the writer a
# pointless investigation (DOCSP-63226).
if [[ "$current_rank" -gt "$target_rank" ]]; then
  echo "$KEY is in \"$status\", further along than \"$TARGET\", so it was left alone. If you are starting fresh work on it, check whether the earlier work already shipped, then transition it yourself."
  exit 0
fi

# --- Story points gate: defer the transition when the estimate is empty -----
if [[ -n "$REQUIRE_POINTS" && ( -z "$points" || "$points" == "null" ) ]]; then
  cat <<EOF
$KEY needs a Story Points Estimate before it can move to "$TARGET" -- ask the writer for one now. Do not skip this silently or mention it only in passing.

Estimate it with the Story Point Estimation rubric in .claude/skills/jira/SKILL.md (judge by writing effort, product knowledge, and testing effort), tell the writer the number you propose, and ask them to confirm or override it. Then set the estimate and stop there.

Do not transition the ticket yourself. Once the estimate is set, this hook moves it to "$TARGET" on your next edit or commit, so you never need permission to change a ticket status.

The field is the upfront estimate, $SP_FIELD ("Story Points Estimate") -- not the close-time Story Points field, customfield_10555.

If you are not starting work on $KEY -- you are investigating, or the work turns out to be already done -- do nothing.
EOF
  exit 10
fi

# --- Transition -------------------------------------------------------------
# A ticket that reaches review without ever passing through "In Progress" has no
# recorded start time, so its cycle time cannot be measured -- and the gap is
# invisible in Jira, surfacing only much later as a ticket missing from the
# report. Say it out loud instead (DOCSP-63226, found on DOCSP-63663, which went
# Ready for Work -> Internal Review directly). Rank 3 is "In Progress": this
# fires when the ticket starts before it and lands after it.
gap_note=""
if [[ "$current_rank" -lt 3 && "$target_rank" -gt 3 ]]; then
  gap_note=" Note: it never entered \"In Progress\", so no start time was recorded and its cycle time cannot be measured. If work did happen on it, move it back only if you want that reflected -- this hook will not rewind it."
fi

if out=$(jira issue move "$KEY" "$TARGET" 2>&1); then
  echo "Moved $KEY to \"$TARGET\".$gap_note"
else
  # An invalid transition, a required field, or a transient Jira failure:
  # report it, never fail the tool call.
  reason=$(printf '%s' "$out" | grep -iE 'error|invalid|transition' | head -1)
  echo "Did not move $KEY to \"$TARGET\"${reason:+ ($reason)}. Transition it manually if needed."
fi

exit 0
