#!/usr/bin/env bash
# Test suite for the Jira state-transition hooks (DOCSP-61672, DOCSP-63226).
#
#   * transition-on-work.sh  (first edit OR commit on a DOCSP branch -> In Progress)
#   * transition-on-pr.sh    (PR opened for review -> Internal Review)
#   * jira-transition.sh     (shared helper: forward-only gate, points gate)
#
# HOW TO RUN
#   bash test-transition-hooks.sh          # hermetic: no network, no Jira, no git writes
#   bash test-transition-hooks.sh --live   # also run read-only contract checks
#
# Run it as a plain script, not as individual Claude Bash tool calls, so the
# repo's PreToolUse git guards do not fire on the internal commands.
#
# WHY THIS SUITE IS HERMETIC
#   The previous version drove the hooks against live scratch tickets. It passed
#   while every defect in DOCSP-63226 was present, because live Jira made the
#   interesting states too expensive to set up: closing and reopening a ticket
#   is slow and needs required fields, so the terminal-state case -- the
#   dangerous one -- went untested. It also asserted that a deferred estimate
#   nudge should be deduped, encoding a bug as expected behavior.
#
#   Here `jira`, `gh`, and `git` are replaced with stubs on PATH. Any ticket
#   state or branch name costs one line to set up, so the whole matrix is
#   covered. The stubs log every invocation, which lets the suite assert
#   positively that no transition was ATTEMPTED rather than inferring it from an
#   unchanged ticket.
#
#   The jira stub models the one Jira behavior these hooks exist to work around:
#   the In Progress transition rejects a ticket with no Story Points Estimate.
#   A hook that skipped the points gate fails here instead of quietly 400ing in
#   production.
#
# PREFLIGHT
#   A broken harness makes "assert nothing happened" checks pass for the wrong
#   reason. An earlier draft of this suite silently failed to build its scratch
#   repo and reported 36 vacuous passes. So the harness now proves it can drive
#   a hook end to end before any test runs, and aborts if it cannot.
#
# WHAT STUBS CANNOT PROVE
#   That the real tools still behave as assumed -- that `jira issue view --raw`
#   exposes customfield_27258, that "In Progress" is a valid transition name,
#   and that `git rev-parse --abbrev-ref HEAD` names the branch. `--live` checks
#   those for real, read-only.

set -uo pipefail

HOOKS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIVE=""
[[ "${1:-}" == "--live" ]] && LIVE=1
LIVE_TICKET="${LIVE_TICKET:-DOCSP-63226}"

pass=0; fail=0
ok() { echo "  PASS: $1"; pass=$((pass+1)); }
no() { echo "  FAIL: $1"; fail=$((fail+1)); }
assert_contains() { case "$1" in *"$2"*) ok "$3";; *) no "$3 (missing '$2' in: ${1:-<empty>})";; esac; }
assert_lacks()    { case "$1" in *"$2"*) no "$3 (unexpected '$2')";; *) ok "$3";; esac; }
assert_empty()    { if [[ -z "${1//[[:space:]]/}" ]]; then ok "$2"; else no "$2 (got: $1)"; fi; }
assert_eq()       { if [[ "$1" == "$2" ]]; then ok "$3"; else no "$3 (want '$2', got '$1')"; fi; }

# --- Scratch environment ----------------------------------------------------
WORK="$(mktemp -d)"
BIN="$WORK/bin"; FIX="$WORK/fixtures"; SENT="$WORK/sentinels"
mkdir -p "$BIN" "$FIX" "$SENT"
LOG="$WORK/calls.log"; : > "$LOG"

cleanup() { rm -rf "$WORK"; }
trap cleanup EXIT

# --- Stub: jira -------------------------------------------------------------
# Reads and mutates per-key fixtures so multi-step sequences behave like a real
# workflow, and logs every call so tests can assert on attempts.
cat > "$BIN/jira" <<'STUB'
#!/usr/bin/env bash
echo "jira $*" >> "$LOG"
key=""; for a in "$@"; do case "$a" in DOCSP-*) key="$a"; break;; esac; done
f="$FIX/$key.json"

if [[ "${1:-}" == "issue" && "${2:-}" == "view" ]]; then
  [[ -f "$f" ]] || exit 1          # unknown ticket: CLI failure, empty stdout
  cat "$f"; exit 0
fi

if [[ "${1:-}" == "issue" && "${2:-}" == "move" ]]; then
  target="${4:-}"
  [[ -f "$f" ]] || { echo "error: issue not found"; exit 1; }
  pts=$(jq -r '.fields.customfield_27258 // "null"' "$f")
  # The behavior these hooks exist to work around: In Progress requires an
  # estimate, and Jira rejects the transition when it is missing.
  if [[ "$target" == "In Progress" && ( "$pts" == "null" || -z "$pts" ) ]]; then
    echo "error: Field 'Story Points Estimate' is required"; exit 1
  fi
  if [[ -n "${FORCE_MOVE_FAILURE:-}" ]]; then
    echo "error: invalid transition"; exit 1
  fi
  jq --arg s "$target" '.fields.status.name = $s' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
  echo "issue transitioned to state \"$target\""; exit 0
fi

if [[ "${1:-}" == "me" ]]; then echo "${STUB_ME:-writer@mongodb.com}"; exit 0; fi
if [[ "${1:-}" == "issue" && "${2:-}" == "comment" ]]; then exit 0; fi
exit 0
STUB

# --- Stub: gh ---------------------------------------------------------------
cat > "$BIN/gh" <<'STUB'
#!/usr/bin/env bash
echo "gh $*" >> "$LOG"
if [[ "${1:-}" == "pr" && "${2:-}" == "view" ]]; then echo "${STUB_PR_URL:-}"; exit 0; fi
exit 0
STUB

# --- Stub: git --------------------------------------------------------------
# The hooks use git only to name the current branch. Stubbing it keeps the suite
# from needing a scratch repo (and from any git writes at all). $STUB_BRANCH is
# the branch under test; unset means "not a git repo", which the hooks must
# tolerate.
cat > "$BIN/git" <<'STUB'
#!/usr/bin/env bash
echo "git $*" >> "$LOG"
if [[ "${1:-}" == "rev-parse" ]]; then
  [[ -n "${STUB_BRANCH:-}" ]] || exit 128
  echo "$STUB_BRANCH"; exit 0
fi
exit 0
STUB

chmod +x "$BIN/jira" "$BIN/gh" "$BIN/git"

# --- Fixture and invocation helpers ----------------------------------------
# set_ticket KEY STATUS [POINTS] [ASSIGNEE]   POINTS omitted or "null" means
# unset. ASSIGNEE defaults to the authenticated stub user, so tests that do not
# exercise --require-assignee-me are unaffected by it.
set_ticket() {
  local pts="${3:-null}" who="${4:-writer@mongodb.com}"
  if [[ "$who" == "none" ]]; then
    # Jira returns assignee: null for an unassigned ticket, not an empty string.
    jq -n --arg s "$2" --argjson p "$pts" \
      '{fields:{status:{name:$s}, customfield_27258:$p, assignee:null}}' > "$FIX/$1.json"
  else
    jq -n --arg s "$2" --argjson p "$pts" --arg a "$who" \
      '{fields:{status:{name:$s}, customfield_27258:$p, assignee:{emailAddress:$a}}}' > "$FIX/$1.json"
  fi
}
ticket_status() { jq -r '.fields.status.name' "$FIX/$1.json" 2>/dev/null; }
ticket_points() { jq -r '.fields.customfield_27258 // "null"' "$FIX/$1.json" 2>/dev/null; }

reset_log() { : > "$LOG"; }
logged()    { grep -qF "$1" "$LOG"; }
assert_logged()     { if logged "$1"; then ok "$2"; else no "$2 (never called: '$1')"; fi; }
assert_not_logged() { if logged "$1"; then no "$2 (unexpectedly called: '$1')"; else ok "$2"; fi; }
assert_no_move()    { if grep -q "issue move" "$LOG"; then no "$1 (a transition was attempted)"; else ok "$1"; fi; }

# run_hook <hook> [EXTRA_ENV=...]   BRANCH is passed via $BRANCH.
run_hook() {
  local hook="$1"; shift
  PATH="$BIN:$PATH" TMPDIR="$SENT" LOG="$LOG" FIX="$FIX" \
    STUB_ME="${STUB_ME:-writer@mongodb.com}" \
    STUB_BRANCH="${BRANCH:-}" env "$@" bash "$HOOKS/$hook"
}

edit_payload() { jq -n --arg s "$1" --arg t "${2:-Edit}" \
  '{tool_name:$t, tool_input:{file_path:"content/atlas/source/index.txt"}, session_id:$s}'; }
# Command strings are assembled from parts so this file never literally contains
# the pattern the PR hook matches on. Otherwise running the suite through the
# Claude harness trips the live hook -- which is how a comment for a nonexistent
# PR reached a real ticket during DOCSP-63226.
G=gh; PR_=pr; CREATE=create; READY=ready
bash_payload() { jq -n --arg c "$1" --arg s "$2" --arg r "${3:-}" \
  '{tool_name:"Bash", tool_input:{command:$c}, session_id:$s, tool_response:$r}'; }

edit_hook()   { edit_payload "$1" "${2:-Edit}" | run_hook transition-on-work.sh; }
# commit_hook <session> [command] [tool_response]
GIT=git; COMMIT=commit
commit_hook() { bash_payload "${2:-$GIT $COMMIT -m msg}" "$1" "${3:-[main abc1234] msg}" \
  | run_hook transition-on-work.sh; }
# Same split-string trick: transition-on-work.sh now matches `jira issue edit`
# with a story-points-estimate, so spelling it literally here would trip the
# live hook when the suite runs inside the Claude harness.
J=jira; ISSUE=issue; EDIT=edit
# estimate_hook <session> <key> [command]
estimate_hook() { bash_payload "${3:-$J $ISSUE $EDIT $2 --custom story-points-estimate=3 --no-input}" \
  "$1" "" | run_hook transition-on-work.sh; }
pr_hook()   { bash_payload "$1" "$2" "${3:-}" | run_hook transition-on-pr.sh; }
prompt_payload() { jq -n --arg p "$1" --arg s "$2" '{prompt:$p, session_id:$s}'; }
prompt_hook()    { prompt_payload "$1" "$2" | run_hook capture-ticket-key.sh; }
promptkey_of()   { cat "$SENT/claude-jira-promptkey-$1" 2>/dev/null; }
msg_of()     { echo "$1" | jq -r '.systemMessage // ""' 2>/dev/null; }
context_of() { echo "$1" | jq -r '.hookSpecificOutput.additionalContext // ""' 2>/dev/null; }

FAKE_PR="https://github.com/10gen/docs-mongodb-internal/pull/999999"

echo "=== Jira transition hooks: hermetic test suite ==="
echo "work dir: $WORK"
echo ""

# ===========================================================================
# PREFLIGHT: prove the harness can actually drive a hook. Without this, every
# "assert nothing happened" check below would pass for the wrong reason if the
# stubs or payloads were broken.
# ===========================================================================
echo "PREFLIGHT: harness self-check"
set_ticket DOCSP-9999 "Ready for Work" 3
BRANCH="DOCSP-9999-preflight"; reset_log
pre_out=$(edit_hook s-preflight)
pre_err=""
logged "issue view DOCSP-9999"            || pre_err="the jira stub was never invoked"
[[ -z "$pre_err" ]] && { logged "issue move DOCSP-9999 In Progress" || pre_err="the hook did not attempt the transition"; }
[[ -z "$pre_err" ]] && { [[ "$(ticket_status DOCSP-9999)" == "In Progress" ]] || pre_err="the stub did not record the move"; }
[[ -z "$pre_err" ]] && { [[ -n "$(msg_of "$pre_out")" ]] || pre_err="the hook emitted no systemMessage"; }
if [[ -n "$pre_err" ]]; then
  echo "  ABORT: harness self-check failed -- $pre_err"
  echo "  Fix the harness before trusting any result: a broken harness makes"
  echo "  the negative assertions below pass vacuously."
  echo ""
  echo "  hook output: ${pre_out:-<empty>}"
  echo "  call log:"; sed 's/^/    /' "$LOG"
  exit 2
fi
ok "harness drives a hook end to end"

# ===========================================================================
# GROUP 1: the forward-only status gate.
# Untested before, and the Closed case is the one that could have dragged a
# resolved ticket back into In Progress unprompted.
# ===========================================================================
echo "GROUP 1: forward-only status gate"

echo " 1.1 Closed ticket, edit on its branch"
set_ticket DOCSP-1001 "Closed" 3; BRANCH="DOCSP-1001-investigate"; reset_log
out=$(edit_hook s-1001)
assert_no_move "no transition attempted on a Closed ticket"
assert_contains "$(msg_of "$out")" "further along than" "explains that the ticket is past the target"
assert_contains "$(msg_of "$out")" "already shipped" "hints the work may already be done"
assert_eq "$(ticket_status DOCSP-1001)" "Closed" "Closed ticket left Closed"

echo " 1.2 Ticket already in Internal Review"
set_ticket DOCSP-1002 "Internal Review" 3; BRANCH="DOCSP-1002-more"; reset_log
out=$(edit_hook s-1002)
assert_no_move "no transition attempted on a ticket past In Progress"
assert_eq "$(ticket_status DOCSP-1002)" "Internal Review" "not rewound"

echo " 1.3 Blocked ticket (off the workflow ladder)"
set_ticket DOCSP-1003 "Blocked" 3; BRANCH="DOCSP-1003-poke"; reset_log
out=$(edit_hook s-1003)
assert_no_move "no transition attempted from an off-ladder status"
assert_contains "$(msg_of "$out")" "outside the normal workflow" "declines rather than guessing"

echo " 1.4 Already at the target: silent"
set_ticket DOCSP-1004 "In Progress" 3; BRANCH="DOCSP-1004-work"; reset_log
out=$(edit_hook s-1004)
assert_no_move "no redundant transition when already In Progress"
assert_empty "$out" "no narration for the common already-there case"

echo " 1.5 Forward move is allowed"
set_ticket DOCSP-1005 "Ready for Work" 3; BRANCH="DOCSP-1005-work"; reset_log
out=$(edit_hook s-1005)
assert_logged "issue move DOCSP-1005 In Progress" "attempts the forward transition"
assert_eq "$(ticket_status DOCSP-1005)" "In Progress" "ticket moved to In Progress"
assert_contains "$(msg_of "$out")" "Moved DOCSP-1005" "reports the move"

echo " 1.6 Needs Triage is also allowed forward"
set_ticket DOCSP-1007 "Needs Triage" 3; BRANCH="DOCSP-1007-work"; reset_log
out=$(edit_hook s-1007)
assert_logged "issue move DOCSP-1007 In Progress" "an untriaged ticket can still start"

echo " 1.7 Unknown target status is refused"
set_ticket DOCSP-1006 "Ready for Work" 3; reset_log
out=$(PATH="$BIN:$PATH" LOG="$LOG" FIX="$FIX" bash "$HOOKS/jira-transition.sh" DOCSP-1006 "Frobnicated")
assert_no_move "no transition attempted for an unrankable target"
assert_contains "$out" "Cannot place" "explains the refusal"

# ===========================================================================
# GROUP 2: the story-points gate.
# ===========================================================================
echo "GROUP 2: story-points gate"

echo " 2.1 Empty estimate defers the move and asks"
set_ticket DOCSP-2001 "Ready for Work" null; BRANCH="DOCSP-2001-work"; reset_log
out=$(edit_hook s-2001); m=$(msg_of "$out")
assert_no_move "no doomed transition attempted without an estimate"
assert_contains "$m" "needs a Story Points Estimate" "asks for an estimate"
assert_contains "$m" "ask the writer for one now" "tells the agent to ask the writer"
assert_contains "$m" "Do not skip this silently" "forbids the silent skip Julia hit"
assert_contains "$m" "SKILL.md" "points at the rubric"
assert_contains "$m" "customfield_27258" "names the upfront estimate field"
assert_contains "$m" "customfield_10555" "distinguishes it from close-time Story Points"
assert_contains "$m" "If you are not starting work" "conditional phrasing, not a bare directive"
# The agent must not be told to change a ticket status itself: CLAUDE.md says
# "Never update ticket status without explicit user permission", so an agent
# that obeys it declines the move and the ticket strands. The hook does the
# transition on the next edit or commit instead, needing no permission.
assert_contains "$m" "Do not transition the ticket yourself" "tells the agent not to move the ticket"
assert_lacks "$m" "move the ticket to" "does not ask the agent to perform the transition"
assert_eq "$(ticket_points DOCSP-2001)" "null" "hook invents no number"
assert_eq "$(ticket_status DOCSP-2001)" "Ready for Work" "ticket stays put"

echo " 2.2 The ask reaches both delivery channels"
assert_eq "$(context_of "$out")" "$m" "additionalContext matches systemMessage"
assert_contains "$out" '"hookEventName": "PostToolUse"' "declares the hook event"

echo " 2.3 Existing estimate is used, not clobbered"
set_ticket DOCSP-2002 "Ready for Work" 5; BRANCH="DOCSP-2002-work"; reset_log
out=$(edit_hook s-2002)
assert_lacks "$(msg_of "$out")" "needs a Story Points Estimate" "no ask when already set"
assert_eq "$(ticket_points DOCSP-2002)" "5" "estimate not overwritten"
assert_eq "$(ticket_status DOCSP-2002)" "In Progress" "ticket moved"

echo " 2.4 An estimate of 0 counts as set"
set_ticket DOCSP-2003 "Ready for Work" 0; BRANCH="DOCSP-2003-work"; reset_log
out=$(edit_hook s-2003)
assert_lacks "$(msg_of "$out")" "needs a Story Points Estimate" "zero is a real estimate, not an empty one"
assert_eq "$(ticket_status DOCSP-2003)" "In Progress" "ticket moved"

echo " 2.5 The gate only applies to targets that need it"
set_ticket DOCSP-2004 "In Progress" null; BRANCH="DOCSP-2004-work"; reset_log
out=$(PATH="$BIN:$PATH" LOG="$LOG" FIX="$FIX" bash "$HOOKS/jira-transition.sh" DOCSP-2004 "Internal Review")
assert_logged "issue move DOCSP-2004 Internal Review" "Internal Review does not require an estimate"
assert_lacks "$out" "needs a Story Points Estimate" "no estimate ask for a target that does not need one"

# ===========================================================================
# GROUP 3: sentinel and retry behavior.
# The old suite asserted the opposite of 3.1 -- it treated the lost nudge as
# correct dedup, which is why the defect survived a passing test run.
# ===========================================================================
echo "GROUP 3: sentinel and retry behavior"

echo " 3.1 A deferred ask survives to the next edit (regression)"
set_ticket DOCSP-3001 "Ready for Work" null; BRANCH="DOCSP-3001-work"; reset_log
first=$(edit_hook s-3001)
second=$(edit_hook s-3001)
assert_contains "$(msg_of "$first")"  "needs a Story Points Estimate" "asks on the first edit"
assert_contains "$(msg_of "$second")" "needs a Story Points Estimate" "asks again after a miss"

echo " 3.2 ...but stops after the cap"
third=$(edit_hook s-3001)
assert_empty "$third" "ask stops once capped"

echo " 3.2b Capping the ask does not stop the hook working (regression)"
# Observed live on DOCSP-56511: the cap used to write the sentinel, which killed
# the hook for the rest of the session. An estimate supplied after the ask went
# quiet could never start the ticket, and a commit after two edits short-
# circuited before its own detection logic ran.
set_ticket DOCSP-3001 "Ready for Work" 2      # writer supplies it late, post-cap
reset_log
out=$(edit_hook s-3001)
assert_logged "issue move DOCSP-3001 In Progress" "a late estimate still starts the ticket"
assert_eq "$(ticket_status DOCSP-3001)" "In Progress" "ticket moved after the ask had gone quiet"

echo " 3.2c A commit after the cap is still reachable (regression)"
set_ticket DOCSP-3004 "Ready for Work" null; BRANCH="DOCSP-3004-work"
_=$(edit_hook s-3004); _=$(edit_hook s-3004); _=$(edit_hook s-3004)   # exhaust the ask
set_ticket DOCSP-3004 "Ready for Work" 3; reset_log
out=$(commit_hook s-3004)
assert_logged "issue move DOCSP-3004 In Progress" "the commit trigger is not starved by preceding edits"

echo " 3.2d Silent re-checks are bounded"
set_ticket DOCSP-3005 "Ready for Work" null; BRANCH="DOCSP-3005-work"
i=0; while [[ "$i" -lt 12 ]]; do _=$(edit_hook s-3005); i=$((i+1)); done
set_ticket DOCSP-3005 "Ready for Work" 3; reset_log
out=$(edit_hook s-3005)
assert_not_logged "issue view DOCSP-3005" "stops re-reading the ticket once MAX_CHECKS is hit"
assert_empty "$out" "and stays silent"

echo " 3.3 Setting the estimate mid-session unblocks the move"
set_ticket DOCSP-3003 "Ready for Work" null; BRANCH="DOCSP-3003-work"; reset_log
_=$(edit_hook s-3003)                       # deferred, no sentinel
set_ticket DOCSP-3003 "Ready for Work" 2    # writer supplies the estimate
out=$(edit_hook s-3003)
assert_logged "issue move DOCSP-3003 In Progress" "the next edit transitions once points exist"
assert_eq "$(ticket_status DOCSP-3003)" "In Progress" "ticket moved after the estimate landed"

echo " 3.4 A successful move is deduped"
set_ticket DOCSP-3002 "Ready for Work" 3; BRANCH="DOCSP-3002-work"
_=$(edit_hook s-3002); reset_log
out=$(edit_hook s-3002)
assert_empty "$out" "second edit in the session is silent"
assert_not_logged "issue view DOCSP-3002" "settled ticket is not re-read on later edits"

echo " 3.5 Sessions are independent"
reset_log
out=$(edit_hook s-3002-other)
assert_logged "issue view DOCSP-3002" "a new session re-evaluates the ticket"

# ===========================================================================
# GROUP 4: trigger scope for the edit hook.
# ===========================================================================
echo "GROUP 4: edit-hook trigger scope"

echo " 4.1 Branch with no DOCSP key"
set_ticket DOCSP-4001 "Ready for Work" 3; BRANCH="feature/no-ticket"; reset_log
out=$(edit_hook s-4001)
assert_empty "$out" "no output without a ticket key in the branch"
assert_not_logged "jira" "Jira is never contacted"

echo " 4.2 Not a git repo at all"
BRANCH=""; reset_log
out=$(edit_hook s-4001b)
assert_empty "$out" "no output when the branch cannot be determined"
assert_not_logged "jira" "Jira is never contacted"

echo " 4.3 Non-edit tool is ignored"
BRANCH="DOCSP-4002-work"; set_ticket DOCSP-4002 "Ready for Work" 3; reset_log
out=$(bash_payload "ls -la" s-4002 | run_hook transition-on-work.sh)
assert_empty "$out" "a Bash event does not trigger the edit hook"
assert_no_move "no transition from a non-edit tool"

echo " 4.4 Write counts as an edit"
set_ticket DOCSP-4003 "Ready for Work" 3; BRANCH="DOCSP-4003-work"; reset_log
out=$(edit_hook s-4003 Write)
assert_logged "issue move DOCSP-4003 In Progress" "Write triggers the hook"

echo " 4.5 Edits outside content/ still count"
set_ticket DOCSP-4004 "Ready for Work" 3; BRANCH="DOCSP-4004-tooling"; reset_log
out=$(jq -n '{tool_name:"Edit", tool_input:{file_path:".claude/hooks/x.sh"}, session_id:"s-4004"}' \
  | run_hook transition-on-work.sh)
assert_logged "issue move DOCSP-4004 In Progress" "a platform/tooling edit is real work too"

echo " 4.6 Lowercase branch key is normalized"
set_ticket DOCSP-4005 "Ready for Work" 3; BRANCH="docsp-4005-work"; reset_log
out=$(edit_hook s-4005)
assert_logged "issue move DOCSP-4005 In Progress" "lowercase docsp- prefix is upcased"

echo " 4.7 feature/ prefix is tolerated"
set_ticket DOCSP-4006 "Ready for Work" 3; BRANCH="feature/DOCSP-4006-work"; reset_log
out=$(edit_hook s-4006)
assert_logged "issue move DOCSP-4006 In Progress" "a prefixed branch still yields the key"

# ===========================================================================
# GROUP 4B: the commit trigger.
# Regression cover for DOCSP-62361, where an agent edited five files through
# shell commands rather than the Edit tool. The edit-only trigger never fired
# and the ticket never left Ready for Work despite the work being committed and
# pushed. A commit is proof of work regardless of how the bytes were written.
# ===========================================================================
echo "GROUP 4B: commit trigger"

echo " 4B.1 A commit starts the ticket (regression)"
set_ticket DOCSP-4101 "Ready for Work" 3; BRANCH="DOCSP-4101-scripted"; reset_log
out=$(commit_hook s-4101)
assert_logged "issue move DOCSP-4101 In Progress" "committing moves the ticket"
assert_eq "$(ticket_status DOCSP-4101)" "In Progress" "ticket started without a single Edit event"

echo " 4B.2 Scripted edits then a commit still start the ticket"
# The exact DOCSP-62361 shape: all file changes via Bash, then a commit.
set_ticket DOCSP-4102 "Ready for Work" 3; BRANCH="DOCSP-4102-sweep"; reset_log
_=$(bash_payload "sed -i '' 's/old/new/' content/atlas/source/a.txt" s-4102 "" | run_hook transition-on-work.sh)
assert_no_move "a bare sed is not itself a start signal"
out=$(commit_hook s-4102)
assert_logged "issue move DOCSP-4102 In Progress" "the commit that follows is"

echo " 4B.3 git -c key=value commit is recognized"
set_ticket DOCSP-4103 "Ready for Work" 3; BRANCH="DOCSP-4103-work"; reset_log
out=$(commit_hook s-4103 "$GIT -c commit.gpgsign=false $COMMIT -m msg")
assert_logged "issue move DOCSP-4103 In Progress" "flags between git and commit are tolerated"

echo " 4B.4 A commit that committed nothing is not a start signal"
set_ticket DOCSP-4104 "Ready for Work" 3; BRANCH="DOCSP-4104-work"; reset_log
out=$(commit_hook s-4104 "$GIT $COMMIT -m msg" "nothing to commit, working tree clean")
assert_no_move "an empty commit attempt does not move the ticket"
assert_empty "$out" "and says nothing"

echo " 4B.5 A quoted mention of the command does not fire"
set_ticket DOCSP-4105 "Ready for Work" 3; BRANCH="DOCSP-4105-work"; reset_log
out=$(commit_hook s-4105 "echo \"run $GIT $COMMIT when ready\"")
assert_no_move "mentioning the command inside a string is not an invocation"

echo " 4B.6 Other git subcommands do not fire"
set_ticket DOCSP-4106 "Ready for Work" 3; BRANCH="DOCSP-4106-work"; reset_log
for c in "$GIT status" "$GIT log --oneline -5" "$GIT diff --stat" "$GIT push"; do
  _=$(commit_hook s-4106 "$c")
done
assert_no_move "status, log, diff, and push are not start signals"

echo " 4B.7 Edit and commit share one sentinel"
set_ticket DOCSP-4107 "Ready for Work" 3; BRANCH="DOCSP-4107-work"; reset_log
_=$(edit_hook s-4107)                    # settles via the edit path
out=$(commit_hook s-4107)                # a later commit must not re-fire
assert_empty "$out" "a commit after a settled edit is silent"
assert_eq "$(grep -c 'issue move' "$LOG")" "1" "exactly one transition attempt across both triggers"

echo " 4B.8 A commit on a non-DOCSP branch is a no-op"
BRANCH="feature/no-ticket"; reset_log
out=$(commit_hook s-4108)
assert_empty "$out" "no output without a ticket key"
assert_not_logged "jira" "Jira is never contacted"

# ===========================================================================
# GROUP 4C: setting the estimate resumes the deferred move, and a ticket that
# reaches review without a start time says so. Both from DOCSP-63663, which went
# Ready for Work -> Internal Review with no In Progress transition at all.
# ===========================================================================
echo "GROUP 4C: estimate trigger and the skipped-start warning"

echo " 4C.1 Setting the estimate completes a deferred transition"
set_ticket DOCSP-4301 "Ready for Work"; BRANCH="DOCSP-4301-work"; reset_log
out=$(edit_hook s-4301)
assert_contains "$(msg_of "$out")" "Story Points Estimate" "first edit defers and asks"
assert_no_move "deferred, so nothing moved yet"
# The writer sets it; the hook must notice without waiting for another edit.
set_ticket DOCSP-4301 "Ready for Work" 3; reset_log
out=$(estimate_hook s-4301 DOCSP-4301)
assert_logged "issue move DOCSP-4301 In Progress" "the estimate itself resumes the move"
assert_eq "$(ticket_status DOCSP-4301)" "In Progress" "ticket started without a further edit"

echo " 4C.2 A jira edit that sets something else is not a trigger"
set_ticket DOCSP-4302 "Ready for Work" 3; BRANCH="DOCSP-4302-work"; reset_log
out=$(estimate_hook s-4302 DOCSP-4302 "$J $ISSUE $EDIT DOCSP-4302 --priority Major --no-input")
assert_no_move "an unrelated field edit does not start the ticket"
assert_not_logged "issue view" "Jira is never contacted"

echo " 4C.3 Merely mentioning the field in a string is not a trigger"
set_ticket DOCSP-4303 "Ready for Work" 3; BRANCH="DOCSP-4303-work"; reset_log
out=$(estimate_hook s-4303 DOCSP-4303 "echo 'run $J $ISSUE $EDIT with story-points-estimate later'")
assert_no_move "an unanchored mention does not start the ticket"

echo " 4C.4 Reaching review with no start time is called out"
set_ticket DOCSP-4304 "Ready for Work" 3; BRANCH="DOCSP-4304-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-4304 "$FAKE_PR")
m=$(msg_of "$out")
assert_logged "issue move DOCSP-4304 Internal Review" "still transitions"
assert_contains "$m" "never entered" "warns that no start time was recorded"
assert_contains "$m" "cycle time" "says why it matters"

echo " 4C.5 A normal In Progress to review carries no warning"
set_ticket DOCSP-4305 "In Progress" 3; BRANCH="DOCSP-4305-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-4305 "$FAKE_PR")
assert_lacks "$(msg_of "$out")" "never entered" "no warning when the ticket started properly"

echo ""

# ===========================================================================
# GROUP 5: the PR hook.
# ===========================================================================
echo "GROUP 5: PR hook"

echo " 5.1 Non-draft create transitions the ticket"
set_ticket DOCSP-5001 "In Progress" 3; BRANCH="DOCSP-5001-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-5001 "$FAKE_PR")
m=$(msg_of "$out")
assert_logged "issue move DOCSP-5001 Internal Review" "moves to Internal Review"
assert_not_logged "issue comment add" "posts no comment on the ticket"
assert_contains "$m" "Internal Review" "reports the transition"
assert_eq "$(context_of "$out")" "$m" "both delivery channels carry the same text"

echo " 5.2 Draft create does not transition (regression)"
set_ticket DOCSP-5002 "In Progress" 3; BRANCH="DOCSP-5002-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --draft --fill" s-5002 "$FAKE_PR")
assert_not_logged "issue comment add" "draft posts no comment either"
assert_no_move "a draft PR does not move the ticket"
assert_contains "$(msg_of "$out")" "is a draft" "explains why it did not move"
assert_eq "$(ticket_status DOCSP-5002)" "In Progress" "ticket unchanged"

echo " 5.3 Draft via the -d short flag"
set_ticket DOCSP-5003 "In Progress" 3; BRANCH="DOCSP-5003-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE -d --fill" s-5003 "$FAKE_PR")
assert_no_move "-d is recognized as a draft"

echo " 5.4 Marking ready transitions the ticket"
set_ticket DOCSP-5004 "In Progress" 3; BRANCH="DOCSP-5004-work"; reset_log
out=$(pr_hook "$G $PR_ $READY 999999" s-5004 "$FAKE_PR")
assert_logged "issue move DOCSP-5004 Internal Review" "ready moves the ticket"
assert_not_logged "issue comment add" "posts no comment"

echo " 5.5 Ready needs no PR URL at all"
# Nothing reads the URL on the ready path now that the hook posts no comment,
# so it must neither require one nor go looking for it.
set_ticket DOCSP-5005 "In Progress" 3; BRANCH="DOCSP-5005-work"; reset_log
out=$(pr_hook "$G $PR_ $READY" s-5005 "marked as ready for review")
assert_logged "issue move DOCSP-5005 Internal Review" "transitions without a URL in the output"
assert_not_logged "$PR_ view" "does not spend a lookup fetching a URL it no longer needs"

echo " 5.6b A PR opened on a fork still transitions the ticket"
# Regression (DOCSP-63226): the URL used to be pinned to 10gen/docs-mongodb-
# internal, so a real non-draft PR opened in a personal fork produced no
# transition and no diagnostic. Found while live-testing in exactly such a fork.
set_ticket DOCSP-5007 "In Progress" 3; BRANCH="DOCSP-5007-work"; reset_log
FORK_PR="https://github.com/erabil-mdb/docs-mongodb-internal-captain-bot/pull/147"
out=$(pr_hook "$G $PR_ $CREATE --fill" s-5007 "$FORK_PR")
assert_logged "issue move DOCSP-5007 Internal Review" "a fork PR moves the ticket"
assert_not_logged "issue comment add" "still posts no comment"

echo " 5.6c A PR on an unrelated repo is ignored"
# The relaxed pattern must stay scoped to docs-mongodb-internal* repos: running
# gh pr create against some other project should not touch a DOCSP ticket.
set_ticket DOCSP-5008 "In Progress" 3; BRANCH="DOCSP-5008-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-5008 "https://github.com/10gen/some-other-repo/pull/1")
assert_empty "$out" "no output for a PR outside the repo family"
assert_no_move "an unrelated repo does not move the ticket"

echo " 5.6 Create with no PR URL is a no-op"
set_ticket DOCSP-5006 "In Progress" 3; BRANCH="DOCSP-5006-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-5006 "error: could not create pull request")
assert_empty "$out" "no output when no PR was produced"
assert_not_logged "jira" "Jira is never contacted"

echo " 5.7 A quoted mention does not fire the hook (regression)"
set_ticket DOCSP-5007 "In Progress" 3; BRANCH="DOCSP-5007-work"; reset_log
out=$(pr_hook "run \"$G $PR_ $CREATE --fill\" stub-a" s-5007 "$FAKE_PR")
assert_empty "$out" "mentioning the command inside a string is not an invocation"
assert_not_logged "jira" "no comment posted for a PR that was never created"

echo " 5.8 A grep for the command does not fire the hook"
BRANCH="DOCSP-5007-work"; reset_log
out=$(pr_hook "grep -rn '$G $PR_ $CREATE' .claude/" s-5007b "$FAKE_PR")
assert_empty "$out" "searching for the pattern is not an invocation"

echo " 5.9 Fires after a separator"
set_ticket DOCSP-5008 "In Progress" 3; BRANCH="DOCSP-5008-work"; reset_log
out=$(pr_hook "git push -u origin HEAD && $G $PR_ $CREATE --fill" s-5008 "$FAKE_PR")
assert_logged "issue move DOCSP-5008 Internal Review" "a chained invocation still counts"

echo " 5.10 Unrelated gh subcommand is ignored"
set_ticket DOCSP-5009 "In Progress" 3; BRANCH="DOCSP-5009-work"; reset_log
out=$(pr_hook "$G $PR_ list" s-5009 "$FAKE_PR")
assert_empty "$out" "gh pr list does nothing"

echo " 5.11 PR hook is deduped per session"
set_ticket DOCSP-5010 "In Progress" 3; BRANCH="DOCSP-5010-work"
_=$(pr_hook "$G $PR_ $CREATE --fill" s-5010 "$FAKE_PR")
set_ticket DOCSP-5010 "In Progress" 3     # pretend the move was undone by hand
reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-5010 "$FAKE_PR")
assert_no_move "no repeat transition attempt in the same session"
assert_empty "$out" "second create in the session is silent"

echo " 5.12 PR hook will not rewind a ticket past Internal Review"
set_ticket DOCSP-5011 "External Review" 3; BRANCH="DOCSP-5011-work"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-5011 "$FAKE_PR")
assert_no_move "no rewind from External Review to Internal Review"
assert_eq "$(ticket_status DOCSP-5011)" "External Review" "ticket unchanged"

echo " 5.13 PR hook needs a DOCSP branch"
BRANCH="feature/no-ticket"; reset_log
out=$(pr_hook "$G $PR_ $CREATE --fill" s-5012 "$FAKE_PR")
assert_empty "$out" "no output without a ticket key"
assert_not_logged "jira" "Jira is never contacted"

# ===========================================================================
# GROUP 6: failure handling. Hooks are advisory and must never break the tool
# call or swallow a real Jira failure.
# ===========================================================================
echo "GROUP 6: failure handling"

echo " 6.1 Unreadable ticket"
BRANCH="DOCSP-6001-work"; reset_log     # no fixture: the CLI read fails
out=$(edit_hook s-6001)
assert_contains "$(msg_of "$out")" "Could not read" "reports the failed read"
assert_no_move "no transition attempted on an unreadable ticket"

echo " 6.2 A failing transition is reported, not swallowed"
set_ticket DOCSP-6002 "Ready for Work" 3; BRANCH="DOCSP-6002-work"; reset_log
out=$(edit_payload s-6002 | run_hook transition-on-work.sh FORCE_MOVE_FAILURE=1)
assert_contains "$(msg_of "$out")" "Did not move DOCSP-6002" "surfaces the failure"
assert_contains "$(msg_of "$out")" "manually" "tells the writer what to do"

echo " 6.3 Every hook path exits 0 (advisory, never blocking)"
rc_all=0
set_ticket DOCSP-6004 "Closed" 3; BRANCH="DOCSP-6004-work"
edit_payload s-6004 | run_hook transition-on-work.sh >/dev/null 2>&1 || rc_all=1
bash_payload "$G $PR_ $CREATE --fill" s-6004 "$FAKE_PR" | run_hook transition-on-pr.sh >/dev/null 2>&1 || rc_all=1
BRANCH="DOCSP-6005-work"   # unreadable ticket
edit_payload s-6005 | run_hook transition-on-work.sh >/dev/null 2>&1 || rc_all=1
set_ticket DOCSP-6006 "Ready for Work" 3; BRANCH="DOCSP-6006-work"
edit_payload s-6006 | run_hook transition-on-work.sh FORCE_MOVE_FAILURE=1 >/dev/null 2>&1 || rc_all=1
assert_eq "$rc_all" "0" "no hook path returns a nonzero exit status"

echo " 6.4 Malformed payload does not crash"
BRANCH="DOCSP-6007-work"
printf 'not json' | run_hook transition-on-work.sh >/dev/null 2>&1; rc=$?
assert_eq "$rc" "0" "garbage input to the edit hook exits cleanly"
printf 'not json' | run_hook transition-on-pr.sh >/dev/null 2>&1; rc=$?
assert_eq "$rc" "0" "garbage input to the PR hook exits cleanly"

echo " 6.5 Helper with missing arguments is a no-op"
reset_log
out=$(PATH="$BIN:$PATH" LOG="$LOG" FIX="$FIX" bash "$HOOKS/jira-transition.sh")
assert_empty "$out" "no arguments produces no output"
assert_not_logged "jira" "Jira is never contacted"

# ===========================================================================
# GROUP 6B: prompt-key capture, and the work-on-main fallback it enables.
# Raised in review on the DOCSP-63226 PR: a writer who edits on main and
# branches only at commit time has no branch key when the work actually starts.
# ===========================================================================
echo "GROUP 6B: prompt-key capture and the work-on-main fallback"

echo " 6B.1 capture-ticket-key records only an unambiguous key"
out=$(prompt_hook "please start DOCSP-70001 now" s-pk1)
assert_eq "$(promptkey_of s-pk1)" "DOCSP-70001" "a single key is remembered"
assert_empty "$out" "the capture hook injects no context"

prompt_hook "work on docsp-70002 please" s-pk2 >/dev/null
assert_eq "$(promptkey_of s-pk2)" "DOCSP-70002" "a lowercase key is normalized"

prompt_hook "DOCSP-70003 and also DOCSP-70003 again" s-pk3 >/dev/null
assert_eq "$(promptkey_of s-pk3)" "DOCSP-70003" "the same key twice is still one key"

prompt_hook "compare DOCSP-70004 with DOCSP-70005" s-pk4 >/dev/null
assert_eq "$(promptkey_of s-pk4)" "" "two distinct keys record nothing"

# Ambiguity must also DROP an earlier memory: the session's subject is now in
# doubt, and acting on the stale key would start the wrong ticket.
prompt_hook "start DOCSP-70006" s-pk5 >/dev/null
prompt_hook "how does DOCSP-70007 differ from DOCSP-70008" s-pk5 >/dev/null
assert_eq "$(promptkey_of s-pk5)" "" "a later ambiguous prompt clears the memory"

# ...but a prompt with no key at all leaves it alone. Writers name the ticket
# once and then keep working.
prompt_hook "start DOCSP-70009" s-pk6 >/dev/null
prompt_hook "now wrap that line at 72 characters" s-pk6 >/dev/null
assert_eq "$(promptkey_of s-pk6)" "DOCSP-70009" "a keyless prompt preserves the memory"

echo " 6B.2 editing on main transitions the remembered ticket"
set_ticket DOCSP-70010 "Ready for Work" 3
prompt_hook "let's work on DOCSP-70010" s-pk7 >/dev/null
BRANCH="main"; reset_log
out=$(edit_hook s-pk7)
assert_logged "issue move DOCSP-70010 In Progress" "an edit on main moves the remembered ticket"
assert_eq "$(ticket_status DOCSP-70010)" "In Progress" "the ticket actually advanced"

echo " 6B.3 the fallback will not start someone else's ticket"
set_ticket DOCSP-70011 "Ready for Work" 3 "someone.else@mongodb.com"
prompt_hook "what is DOCSP-70011 about" s-pk8 >/dev/null
BRANCH="main"; reset_log
out=$(edit_hook s-pk8)
assert_no_move "a ticket assigned to someone else is left alone"
assert_eq "$(ticket_status DOCSP-70011)" "Ready for Work" "its status is untouched"
assert_empty "$out" "declining on assignee is silent"

echo " 6B.3b An unassigned ticket IS started by the fallback"
# 41% of Ready for Work DOCSP tickets are unassigned, and picking one up is how
# work normally starts. Refusing them put two in five tickets into a silent hole
# in the very scenario this fallback covers (DOCSP-63226, seen on DOCSP-63627).
set_ticket DOCSP-70015 "Ready for Work" 3 none
prompt_hook "starting DOCSP-70015" s-pk11 >/dev/null
BRANCH="main"; reset_log
out=$(edit_hook s-pk11)
assert_logged "issue move DOCSP-70015 In Progress" "an unassigned ticket is not someone else's"
assert_eq "$(ticket_status DOCSP-70015)" "In Progress" "it actually advanced"

echo " 6B.4 a branch key still wins over a remembered key"
set_ticket DOCSP-70012 "Ready for Work" 3
set_ticket DOCSP-70013 "Ready for Work" 3
prompt_hook "context from DOCSP-70013" s-pk9 >/dev/null
BRANCH="DOCSP-70012-real-work"; reset_log
out=$(edit_hook s-pk9)
assert_logged "issue move DOCSP-70012 In Progress" "the branch key is the one used"
assert_eq "$(ticket_status DOCSP-70013)" "Ready for Work" "the mentioned ticket is untouched"

echo " 6B.5 no branch key and nothing remembered costs nothing"
BRANCH="main"; reset_log
out=$(edit_hook s-pk-unknown)
assert_empty "$out" "the hook stays silent"
assert_not_logged "issue view" "Jira is never contacted"

echo " 6B.6 the assignee guard applies only to the soft path"
# A branch-derived key must NOT be assignee-gated: writers legitimately pick up
# a colleague's ticket, and the branch name is explicit intent.
set_ticket DOCSP-70014 "Ready for Work" 3 "someone.else@mongodb.com"
BRANCH="DOCSP-70014-picked-up"; reset_log
out=$(edit_hook s-pk10)
assert_logged "issue move DOCSP-70014 In Progress" "a branch key moves a colleague's ticket"

echo " 6B.7 garbage input to the capture hook exits cleanly"
echo 'not json' | run_hook capture-ticket-key.sh >/dev/null 2>&1
assert_eq "$?" "0" "malformed payload exits 0"

echo ""

# ===========================================================================
# GROUP 7: live contract checks (--live). Read-only.
# ===========================================================================
if [[ -n "$LIVE" ]]; then
  echo "GROUP 7: live contract checks (read-only, ticket $LIVE_TICKET)"
  if ! command -v jira >/dev/null 2>&1; then
    no "jira CLI not found; cannot run live checks"
  else
    raw=$(jira issue view "$LIVE_TICKET" --raw 2>/dev/null)
    assert_contains "$raw" '"status"' "jira issue view --raw returns issue JSON"
    st=$(printf '%s' "$raw" | jq -r '.fields.status.name // ""' 2>/dev/null)
    if [[ -n "$st" ]]; then ok "status is readable via the CLI (got '$st')"
    else no "status not readable from --raw output"; fi
    if printf '%s' "$raw" | jq -e '.fields | has("customfield_27258")' >/dev/null 2>&1
    then ok "customfield_27258 present in --raw output (the helper's read path)"
    else no "customfield_27258 missing from --raw output -- helper cannot read the estimate"; fi
    names=$(jira issue move "$LIVE_TICKET" "__invalid__" 2>&1 | tr '\n' ' ')
    assert_contains "$names" "In Progress" "\"In Progress\" is still a valid transition name"
  fi
  real_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [[ -n "$real_branch" ]]; then ok "git rev-parse names the branch (got '$real_branch')"
  else no "git rev-parse --abbrev-ref HEAD returned nothing"; fi
else
  echo "GROUP 7: live contract checks SKIPPED (pass --live to run)"
fi

echo ""
echo "=== RESULTS: $pass passed, $fail failed ==="
exit $(( fail > 0 ? 1 : 0 ))
