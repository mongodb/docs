#!/usr/bin/env bash
# PostToolUse hook (DOCSP-61672): when work on a DOCSP branch demonstrably
# starts, move the ticket to "In Progress" so status-timing reports reflect
# real start times.
#
# THREE TRIGGERS, whichever comes first in a session:
#   * the first Edit/Write on the branch
#   * the first `git commit` on the branch
#   * a `jira issue edit` that sets the Story Points Estimate
#
# WHY THE ESTIMATE COUNTS AS A TRIGGER (DOCSP-63226): when the estimate is
# missing the move is deferred, and it used to resume only on a LATER edit or
# commit. A writer who sets the estimate and goes straight to opening the PR
# produced no such event, so the ticket jumped Ready for Work -> Internal Review
# and never recorded a start time. Silent, and order-dependent: the same script
# passed or failed depending on whether an edit happened to follow the estimate.
# Observed live on DOCSP-63663. The deferral is literally "waiting for an
# estimate", so the estimate landing is its natural resume signal.
#
# WHY NOT BRANCH CREATION (DOCSP-63226): this replaced a hook that fired when a
# branch was created. That is a weak proxy for "work started" -- branches get
# created to investigate a ticket and then deleted without a single edit, and
# the ticket was left sitting in In Progress.
#
# WHY NOT EDITS ALONE (DOCSP-63226): an edit-only trigger was too narrow in the
# other direction. Agents doing mechanical work -- bulk metadata sweeps, renames,
# scripted fixes -- often edit through shell commands rather than the Edit tool,
# and those runs never fired the hook at all. Caught in live testing on
# DOCSP-62361: five files edited, committed, and pushed, and the ticket never
# left Ready for Work. A commit is proof that work happened no matter how the
# bytes got written, and investigation branches still do not produce one.
#
# WORKING ON main (DOCSP-63226, raised in review): a writer who edits on main and
# branches only when ready to commit has no branch to take a key from. The key
# then comes from the ticket named in the session's prompts, captured by
# capture-ticket-key.sh, so the ticket moves on the first edit instead of waiting
# for the commit. Writers almost always name the ticket before touching a file.
#
# A prompt-derived key is inference; a branch name is enforced convention. So the
# fallback carries a stricter guard -- the ticket must be assigned to the writer
# (--require-assignee-me) -- on top of the forward-only rule, which already
# refuses anything at or past In Progress. Worst case is a Ready for Work ticket
# of the writer's own starting early, which a human can undo. When neither source
# yields a key the hook does nothing at all: silence beats moving a ticket the
# writer only mentioned in passing.
#
# Still not covered: a commit made outside a Claude session fires no hook. This
# repo does ship git hooks (.husky, via core.hooksPath, wired by the husky
# devDependency in content/table-of-contents/package.json), so a post-commit hook
# could close that gap, but it would only cover clones where that install has
# been run.
#
# The hook is deliberately NOT scoped to content/. Plenty of DOCSP tickets are
# platform/ or .claude/ work, and a content-only filter would silently never
# transition those.
#
# The ticket key comes from the current branch name (DOCSP-XXXXX-...), which is
# already the enforced convention, so no lookup or configuration is needed.
# Advisory and non-blocking.
#
# The In Progress transition requires a Story Points Estimate, so the move is
# gated on that field. When it is empty the helper asks the agent to propose an
# estimate and confirm it with the writer rather than inventing a number.

set -uo pipefail

MAX_NUDGES=2   # stop EMITTING the estimate ask after this many, so a ticket
               # nobody estimates stops nagging
MAX_CHECKS=12  # ...but keep re-checking silently until this many, so an estimate
               # supplied after the ask stopped still starts the ticket

input=$(cat)
tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')

case "$tool" in
  Edit|Write|MultiEdit|NotebookEdit)
    ;;
  Bash)
    cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
    # Both patterns are anchored to start-of-command or a separator, so a
    # command that merely mentions one inside a quoted string does not count.
    is_commit() {
      printf '%s' "$cmd" \
        | grep -qE '(^|[;&|(]|&&|\|\|)[[:space:]]*git[[:space:]]+(-c[[:space:]]+[^[:space:]]+[[:space:]]+)*commit([[:space:]]|$)'
    }
    is_estimate_set() {
      printf '%s' "$cmd" \
        | grep -qE '(^|[;&|(]|&&|\|\|)[[:space:]]*jira[[:space:]]+issue[[:space:]]+edit([[:space:]]|$)' \
        && printf '%s' "$cmd" | grep -q 'story-points-estimate'
    }
    if is_commit; then
      # A commit that committed nothing is not a start signal.
      response=$(printf '%s' "$input" | jq -r '.tool_response // ""' 2>/dev/null)
      printf '%s' "$response" | grep -qiE 'nothing to commit|no changes added to commit' && exit 0
    elif is_estimate_set; then
      # Fall through: the estimate the move was waiting on may have just landed.
      # No response check -- jira-cli exits 0 even when a custom field is
      # silently dropped, so the only reliable test is re-reading the ticket,
      # which jira-transition.sh does anyway.
      :
    else
      exit 0
    fi
    ;;
  *)
    exit 0
    ;;
esac

session_id=$(printf '%s' "$input" | jq -r '.session_id // empty')

# Ticket key from the current branch (handles an optional feature/ prefix).
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
key=$(printf '%s' "$branch" | grep -oiE 'DOCSP-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]')

# No branch key: fall back to the ticket named in the session's prompts. Scalar
# rather than an array so the empty case expands to nothing under bash 3.2.
GUARD=""
if [[ -z "$key" ]]; then
  key=$(grep -oE 'DOCSP-[0-9]+' \
        "${TMPDIR:-/tmp}/claude-jira-promptkey-${session_id:-nosession}" 2>/dev/null | head -1)
  [[ -n "$key" ]] && GUARD="--require-assignee-me"
fi
[[ -z "$key" ]] && exit 0

base="${TMPDIR:-/tmp}/claude-jira-inprogress-${session_id:-nosession}-${key}"
sentinel="$base"          # settled: do not fire again this session
nudge_count_file="$base-nudges"

# Settled already -- transitioned, or nothing to do. Short-circuit before any
# Jira call so the common case costs nothing on subsequent edits and commits.
[[ -f "$sentinel" ]] && exit 0

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
result=$("$dir/jira-transition.sh" "$key" "In Progress" --require-points $GUARD)
rc=$?

if [[ "$rc" -eq 10 ]]; then
  # Deferred pending an estimate. The sentinel is deliberately NOT written on
  # this path: nothing happened, so the ask should survive to the next edit or
  # commit if it was missed.
  count=$(( $(cat "$nudge_count_file" 2>/dev/null || echo 0) + 1 ))
  printf '%s' "$count" > "$nudge_count_file" 2>/dev/null || true

  # Past the message cap, keep checking but say nothing. Settling here instead
  # would mean an estimate supplied AFTER the ask stopped never starts the
  # ticket, and it would starve the commit trigger: two edits on an unestimated
  # ticket used to exhaust the cap and write the sentinel, so the commit that
  # followed short-circuited before its own detection logic ever ran. Both
  # observed live on DOCSP-56511.
  [[ "$count" -gt "$MAX_NUDGES" ]] && result=""

  # Bound the silent re-checks. Each one costs a Jira read, and a long editing
  # session on a ticket nobody will estimate should not pay it forever.
  [[ "$count" -ge "$MAX_CHECKS" ]] && touch "$sentinel" 2>/dev/null
else
  touch "$sentinel" 2>/dev/null || true
fi

# Deliver as additionalContext so the message lands in the tool result, and as
# systemMessage so the writer sees it too. systemMessage alone proved
# unreliable -- it arrived late or not at all, and got lost in long tool output
# (DOCSP-63226).
[[ -n "$result" ]] && jq -n --arg m "$result" \
  '{systemMessage: $m, hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $m}}'

exit 0
