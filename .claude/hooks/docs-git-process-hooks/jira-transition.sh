#!/usr/bin/env bash
# Shared helper for automatic Jira state transitions (DOCSP-61672).
#
# Usage:
#   jira-transition.sh <DOCSP-KEY> <TARGET-STATUS> [--require-points]
#
# Behavior:
#   * Transitions the ticket to <TARGET-STATUS> using the jira CLI. The CLI
#     accepts status names directly (for example "In Progress",
#     "Internal Review").
#   * With --require-points, the transition is gated on Story Points Estimate
#     (customfield_27258) already being set. This is needed for "In Progress",
#     whose transition screen makes story points a required field: the move is
#     rejected (HTTP 400) when the estimate is empty. Because the rubric is
#     qualitative (writing effort, product knowledge, testing effort), the
#     estimate needs ticket scope a hook cannot judge, so the hook does NOT
#     invent a number. Instead, when the estimate is empty it emits a message
#     asking the agent to estimate via the rubric, set the field, then
#     transition -- and it skips the transition this run. When the estimate is
#     already set, it transitions normally. The field is read via the Jira
#     REST API using the bearer token the jira CLI already relies on
#     ($JIRA_API_TOKEN), because story points are not exposed to the CLI's
#     --custom flag.
#
# This helper is advisory and non-blocking: every path exits 0, and any Jira
# failure is reported as a note rather than failing the tool call. It prints
# human-readable status lines to stdout; the calling hook wraps them into the
# hook's systemMessage.

set -uo pipefail

KEY="${1:-}"
TARGET="${2:-}"
REQUIRE_POINTS=""
[[ "${3:-}" == "--require-points" ]] && REQUIRE_POINTS=1

[[ -z "$KEY" || -z "$TARGET" ]] && exit 0

JIRA_SERVER="${JIRA_SERVER_URL:-https://jira.mongodb.org}"
SP_FIELD="customfield_27258"   # Story Points Estimate

# --- Story points gate: defer the transition when the estimate is empty -----
if [[ -n "$REQUIRE_POINTS" ]]; then
  # Without the token we cannot read story points, and the "$TARGET" transition
  # requires them -- attempting the move would just 400. Say so plainly instead
  # of emitting a confusing "did not move (error)" note.
  if [[ -z "${JIRA_API_TOKEN:-}" ]]; then
    echo "Cannot verify $KEY Story Points Estimate because \$JIRA_API_TOKEN is not set, and the \"$TARGET\" transition requires it. Set \$JIRA_API_TOKEN, then move the ticket to \"$TARGET\"."
    exit 0
  fi

  current=$(curl -s -H "Authorization: Bearer $JIRA_API_TOKEN" \
    "$JIRA_SERVER/rest/api/2/issue/$KEY?fields=$SP_FIELD" 2>/dev/null \
    | jq -r ".fields.$SP_FIELD // empty" 2>/dev/null)

  if [[ -z "$current" || "$current" == "null" ]]; then
    echo "$KEY has no Story Points Estimate, which is required to move it to \"$TARGET\". Estimate it using the Story Point Estimation rubric in .claude/skills/jira/SKILL.md (judge by ticket scope, product knowledge, and testing effort), set $SP_FIELD via the jira skill, then move the ticket to \"$TARGET\". If scope is unclear, ask the writer."
    exit 0
  fi
fi

# --- Transition -------------------------------------------------------------
out=$(jira issue move "$KEY" "$TARGET" 2>&1)
if [[ $? -eq 0 ]]; then
  echo "Moved $KEY to \"$TARGET\"."
else
  # Already in the target state, or an invalid transition: report, do not fail.
  reason=$(printf '%s' "$out" | grep -iE 'error|invalid|transition' | head -1)
  echo "Did not move $KEY to \"$TARGET\"${reason:+ ($reason)}. Transition it manually if needed."
fi

exit 0
