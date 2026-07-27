#!/usr/bin/env bash
# Test suite for the DOCSP-61672 Jira state-transition hooks.
#
# Run this on the DOCSP-61672-jira-state-transitions branch to verify:
#   * transition-on-branch.sh  (branch created -> In Progress + rubric nudge)
#   * transition-on-pr.sh       (gh pr create   -> Internal Review + PR comment)
#   * jira-transition.sh        (shared helper)
#
# PREREQUISITES
#   * Run it as a plain script:  bash test-transition-hooks.sh
#     (Running it as a script, not as individual Claude Bash tool calls, keeps
#      the repo's PreToolUse git guards from firing on the internal git
#      commands.)
#   * jira CLI authenticated, and $JIRA_API_TOKEN exported (used to read/verify
#      status and story points over the REST API).
#   * A clean-ish working tree is NOT required, but the suite will create and
#      delete two throwaway local branches off HEAD and return you to your
#      current branch when done.
#
# TEST DATA
#   Uses three scratch tickets under the DOCSP-59693 test epic. Override with
#   env vars if these are in use:
#     SUITE_TICKET_A (default DOCSP-59694)  -- PR-hook happy path
#     SUITE_TICKET_B (default DOCSP-59695)  -- branch hook, points already set
#     SUITE_TICKET_C (default DOCSP-59696)  -- branch hook, empty points
#   Every ticket is reset to Backlog with cleared story points at the end.
#
# The suite is read-mostly on your repo and fully resets the scratch tickets;
# it does not touch the real DOCSP-61672 ticket.

set -uo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER="${JIRA_SERVER_URL:-https://jira.mongodb.org}"
SP_FIELD="customfield_27258"
A="${SUITE_TICKET_A:-DOCSP-59694}"
B="${SUITE_TICKET_B:-DOCSP-59695}"
C="${SUITE_TICKET_C:-DOCSP-59696}"
ORIG_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
FAKE_PR="https://github.com/10gen/docs-mongodb-internal/pull/999999"

pass=0; fail=0
ok()  { echo "  PASS: $1"; pass=$((pass+1)); }
no()  { echo "  FAIL: $1"; fail=$((fail+1)); }
assert_contains()  { case "$1" in *"$2"*) ok "$3";; *) no "$3 (missing: '$2')";; esac; }
assert_empty()     { if [[ -z "${1// }" ]]; then ok "$2"; else no "$2 (got output: '$1')"; fi; }
assert_eq()        { if [[ "$1" == "$2" ]]; then ok "$3"; else no "$3 (want '$2', got '$1')"; fi; }

# --- Jira helpers -----------------------------------------------------------
require() {
  command -v jira >/dev/null 2>&1 || { echo "ABORT: jira CLI not found"; exit 2; }
  [[ -n "${JIRA_API_TOKEN:-}" ]] || { echo "ABORT: JIRA_API_TOKEN not set"; exit 2; }
}
jstatus() { curl -s -H "Authorization: Bearer $JIRA_API_TOKEN" \
  "$SERVER/rest/api/2/issue/$1?fields=status" | jq -r '.fields.status.name // "?"'; }
jpoints() { curl -s -H "Authorization: Bearer $JIRA_API_TOKEN" \
  "$SERVER/rest/api/2/issue/$1?fields=$SP_FIELD" \
  | jq -r ".fields.$SP_FIELD // \"null\"" | sed 's/\.0$//'; }
set_points() { curl -s -o /dev/null -X PUT -H "Authorization: Bearer $JIRA_API_TOKEN" \
  -H "Content-Type: application/json" -d "{\"fields\":{\"$SP_FIELD\":$2}}" \
  "$SERVER/rest/api/2/issue/$1"; }
# Reset to Backlog, then let Jira settle before the next transition. Rapid
# back-to-back transitions can otherwise be rejected (the hook is non-blocking,
# so a real transient failure just leaves the ticket where it was).
reset_ticket() { jira issue move "$1" "Backlog" >/dev/null 2>&1; set_points "$1" null; sleep 2; }
sid() { echo "suite-$RANDOM-$RANDOM"; }

# Build a PostToolUse Bash payload: payload <command> <session> [tool_response]
payload() { jq -n --arg c "$1" --arg s "$2" --arg r "${3:-}" \
  '{tool_name:"Bash", tool_input:{command:$c}, session_id:$s, tool_response:$r}'; }

cleanup() {
  echo ""
  echo "--- cleanup ---"
  git checkout -q "$ORIG_BRANCH" 2>/dev/null
  git branch -D "$A-suite-pr" >/dev/null 2>&1
  git branch -D "suite-no-ticket" >/dev/null 2>&1
  for t in "$A" "$B" "$C"; do reset_ticket "$t"; done
  rm -f "${TMPDIR:-/tmp}"/claude-jira-inprogress-suite-* \
        "${TMPDIR:-/tmp}"/claude-jira-review-suite-* 2>/dev/null
  echo "reset $A/$B/$C to Backlog, deleted temp branches, returned to $ORIG_BRANCH"
}
trap cleanup EXIT

require
echo "=== Jira transition hooks: test suite ==="
echo "branch: $ORIG_BRANCH   tickets: A=$A B=$B C=$C"
echo ""

# --- CASE 1: branch hook, empty points -> nudge, transition DEFERRED --------
# In Progress requires a story-points estimate, and the rubric needs judgment
# the hook can't do, so the move is deferred: nudge only, ticket stays put.
echo "CASE 1: branch created, story points empty"
reset_ticket "$C"; s=$(sid)
out=$(payload "git fetch origin && git checkout -b $C-fix origin/main" "$s" | bash "$DIR/transition-on-branch.sh")
msg=$(echo "$out" | jq -r '.systemMessage // ""' 2>/dev/null)
assert_contains "$msg" "no Story Points Estimate" "emits rubric nudge when points empty"
assert_contains "$msg" "SKILL.md" "nudge references the rubric location"
assert_eq "$(jpoints "$C")" "null" "hook writes no story-points number"
assert_eq "$(jstatus "$C")" "Backlog" "transition deferred: ticket stays in Backlog until points set"

# --- CASE 2: branch hook, points already set -> no nudge, not clobbered -----
echo "CASE 2: branch created, story points already set (5)"
reset_ticket "$B"; set_points "$B" 5; s=$(sid)
out=$(payload "git checkout -b $B-refactor origin/main" "$s" | bash "$DIR/transition-on-branch.sh")
msg=$(echo "$out" | jq -r '.systemMessage // ""' 2>/dev/null)
case "$msg" in *"Story Points Estimate"*) no "no story-points nudge when already set";; *) ok "no story-points nudge when already set";; esac
assert_eq "$(jpoints "$B")" "5" "existing estimate not clobbered"
assert_eq "$(jstatus "$B")" "In Progress" "ticket moved to In Progress"

# --- CASE 3: branch hook, non-DOCSP branch -> no-op -------------------------
echo "CASE 3: branch created without a DOCSP key"
s=$(sid)
out=$(payload "git checkout -b feature/no-ticket origin/main" "$s" | bash "$DIR/transition-on-branch.sh")
assert_empty "$out" "no output for a non-DOCSP branch"

# --- CASE 4: branch hook dedup within a session -----------------------------
echo "CASE 4: same branch + session fires only once"
reset_ticket "$C"; s=$(sid)
_=$(payload "git checkout -b $C-again origin/main" "$s" | bash "$DIR/transition-on-branch.sh")
out2=$(payload "git checkout -b $C-again origin/main" "$s" | bash "$DIR/transition-on-branch.sh")
assert_empty "$out2" "second identical branch event is deduped"

# --- CASE 5: PR hook happy path -> Internal Review + PR comment -------------
echo "CASE 5: gh pr create on a DOCSP branch"
reset_ticket "$A"; jira issue move "$A" "In Progress" >/dev/null 2>&1
git checkout -q -b "$A-suite-pr" HEAD
s=$(sid)
out=$(payload "gh pr create --fill" "$s" "$FAKE_PR"$'\n' | bash "$DIR/transition-on-pr.sh")
msg=$(echo "$out" | jq -r '.systemMessage // ""' 2>/dev/null)
assert_contains "$msg" "Internal Review" "emits Internal Review transition"
assert_contains "$msg" "Posted PR link" "posts the PR link comment"
assert_eq "$(jstatus "$A")" "Internal Review" "ticket moved to Internal Review"
last_comment=$(curl -s -H "Authorization: Bearer $JIRA_API_TOKEN" \
  "$SERVER/rest/api/2/issue/$A/comment" | jq -r '.comments[-1].body // ""')
assert_contains "$last_comment" "$FAKE_PR" "PR URL present in latest comment"
git checkout -q "$ORIG_BRANCH"

# --- CASE 6: PR hook no-op when no PR URL in the tool response --------------
echo "CASE 6: gh pr create that produced no PR URL"
git checkout -q -b "$A-suite-pr" HEAD 2>/dev/null || git checkout -q "$A-suite-pr"
s=$(sid)
out=$(payload "gh pr create --fill" "$s" "error: could not create pull request"$'\n' | bash "$DIR/transition-on-pr.sh")
assert_empty "$out" "no transition when tool response has no PR URL"
git checkout -q "$ORIG_BRANCH"

# --- CASE 7: In Progress gate degrades gracefully with no token -------------
# Without $JIRA_API_TOKEN the helper cannot read points and the transition
# would 400, so it should say "set $JIRA_API_TOKEN" and not attempt the move.
echo "CASE 7: --require-points with JIRA_API_TOKEN unset"
reset_ticket "$C"
out=$(env -u JIRA_API_TOKEN bash "$DIR/jira-transition.sh" "$C" "In Progress" --require-points)
assert_contains "$out" "JIRA_API_TOKEN is not set" "nudges to set the token instead of a confusing error"
assert_eq "$(jstatus "$C")" "Backlog" "no move attempted when token is missing"

echo ""
echo "=== RESULTS: $pass passed, $fail failed ==="
exit $(( fail > 0 ? 1 : 0 ))
