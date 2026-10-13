#!/usr/bin/env bash
# Test suite for check-push-target.sh + resolve-push-destination.sh (DOCSP-64949).
#
#   * resolve-push-destination.sh  (shared parser: where would this push land?)
#   * check-push-target.sh         (ask when the destination is not the current branch)
#
# HOW TO RUN
#   bash test-push-target.sh
#
# Hermetic: `git` is stubbed on PATH, so every branch/upstream combination is
# one line to set up and no repo state or network is touched. Run it as a plain
# script, not as individual Claude Bash tool calls, so the repo's PreToolUse git
# guards do not fire on the internal commands.

set -uo pipefail

HOOKS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

WORK="$(mktemp -d)"
BIN="$WORK/bin"; mkdir -p "$BIN"
cleanup() { rm -rf "$WORK"; }
trap cleanup EXIT

# --- Stub: git --------------------------------------------------------------
# The hooks call `git rev-parse` twice; everything else is irrelevant here.
cat > "$BIN/git" <<'STUB'
#!/usr/bin/env bash
if [[ "${1:-}" == "rev-parse" ]]; then
  case "$*" in
    *'@{u}'*)
      if [[ -n "${STUB_UPSTREAM:-}" ]]; then echo "$STUB_UPSTREAM"; exit 0; fi
      exit 1 ;;
    *'--abbrev-ref HEAD'*)
      printf '%s\n' "${STUB_BRANCH:-}"; exit 0 ;;
  esac
fi
exit 0
STUB
chmod +x "$BIN/git"

pass=0; fail=0
ok() { echo "  PASS: $1"; pass=$((pass+1)); }
no() { echo "  FAIL: $1"; fail=$((fail+1)); }
assert_eq() { if [[ "$1" == "$2" ]]; then ok "$3"; else no "$3 (want '$2', got '$1')"; fi; }
assert_has() { case "$1" in *"$2"*) ok "$3";; *) no "$3 (missing '$2' in: ${1:-<empty>})";; esac; }
assert_lacks() { case "$1" in *"$2"*) no "$3 (unexpected '$2')";; *) ok "$3";; esac; }

# --- Drivers ----------------------------------------------------------------
payload() { jq -n --arg c "$1" '{tool_input:{command:$c}}'; }

run() { # run <branch> <upstream> <command> -> hook stdout
  payload "$3" | STUB_BRANCH="$1" STUB_UPSTREAM="$2" PATH="$BIN:$PATH" \
    bash "$HOOKS/check-push-target.sh"
}
res() { # res <branch> <upstream> <command> -> resolver stdout
  payload "$3" | STUB_BRANCH="$1" STUB_UPSTREAM="$2" PATH="$BIN:$PATH" \
    bash "$HOOKS/resolve-push-destination.sh"
}
# An empty payload means the hook printed nothing -> allow.
decision() {
  if [[ -z "${1//[[:space:]]/}" ]]; then echo allow
  else jq -r '.hookSpecificOutput.permissionDecision // "allow"' <<< "$1"; fi
}
reason() {
  if [[ -z "${1//[[:space:]]/}" ]]; then echo ""
  else jq -r '.hookSpecificOutput.permissionDecisionReason // ""' <<< "$1"; fi
}

expect() { # expect <branch> <upstream> <command> <want> <label>
  local got; got="$(decision "$(run "$1" "$2" "$3")")"
  if [[ "$got" == "$4" ]]; then ok "$5"; else no "$5 (want $4, got $got)"; fi
}

BR=DOCSP-12345-task
UP_SELF=origin/DOCSP-12345-task
UP_FEAT=origin/feature/DOCSP-999-epic
UP_MAIN=origin/main

echo "== same branch -> allowed =="
expect "$BR" "$UP_SELF" "git push"                        allow "bare push tracking own branch"
expect "$BR" "$UP_SELF" "git push origin $BR"             allow "explicit own branch"
expect "$BR" "$UP_SELF" "git push -u origin $BR"          allow "-u sets upstream on own branch"
expect "$BR" "$UP_SELF" "git push origin HEAD"            allow "HEAD resolves to current branch"
expect "$BR" "$UP_SELF" "git push origin $BR:$BR"         allow "local:same-remote"

echo "== different branch -> ask =="
expect "$BR" "$UP_FEAT" "git push"                                   ask "bare push tracking the feature branch"
expect "$BR" "$UP_MAIN" "git push"                                   ask "bare push tracking main"
expect "$BR" "$UP_SELF" "git push origin feature/DOCSP-999-epic"     ask "explicit feature branch"
expect "$BR" "$UP_SELF" "git push origin HEAD:feature/DOCSP-999-epic" ask "HEAD:feature-branch"
expect "$BR" "$UP_SELF" "git push origin $BR:feature/DOCSP-999-epic" ask "local:feature-branch"
expect "$BR" "$UP_SELF" "git push origin main"                       ask "explicit main"
expect "$BR" "$UP_SELF" "git push origin --delete feature/DOCSP-999-epic" ask "delete another branch"
expect "$BR" "$UP_SELF" "git push origin :feature/DOCSP-999-epic"    ask "delete via refspec"
expect "$BR" "$UP_SELF" "git push --all"                             ask "--all"
expect "$BR" "$UP_SELF" "git push --mirror"                          ask "--mirror"

echo "== not a branch push -> allowed =="
expect "$BR" "$UP_SELF" "git push --tags"                 allow "--tags only"
expect "$BR" "$UP_SELF" "git push origin --tags"          allow "--tags to a remote"
expect "$BR" "$UP_SELF" "git push --dry-run origin main"  allow "--dry-run writes nothing"
expect "$BR" ""         "git push"                        allow "bare push with no upstream"
expect "HEAD" "$UP_SELF" "git push origin main"           allow "detached HEAD"

echo "== shell operators / redirections are not refspecs =="
expect "$BR" "$UP_SELF" "git push origin $BR 2>&1 | tail -20"  allow "own branch piped to tail"
expect "$BR" "$UP_SELF" "git push origin $BR > /dev/null"       allow "own branch redirected"
expect "$BR" "$UP_SELF" "git push origin main 2>&1 | tail"      ask   "main piped to tail"
expect "$BR" "$UP_SELF" "git push origin main && echo done"     ask   "main with && chained"
expect "$BR" "$UP_SELF" "git push origin main 2>/dev/null"      ask   "main with stderr suppressed"
r="$(reason "$(run "$BR" "$UP_SELF" "git push origin main 2>&1 | tail")")"
assert_lacks "$r" "2>&1" "reason does not treat 2>&1 as a branch"

echo "== non-push commands -> ignored =="
expect "$BR" "$UP_SELF" "git status"                      allow "git status"
expect "$BR" "$UP_SELF" "echo git push origin main"       allow "text that merely mentions git push"

echo "== 'git push' mentioned inside another argument =="
expect "$BR" "$UP_SELF" "echo \"what would git push do\"; git push origin $BR" allow "echo string mentioning git push, then own branch"
expect "$BR" "$UP_SELF" "git commit -m \"git push origin main\""               allow "commit message containing git push"
expect "$BR" "$UP_SELF" "echo \"git push origin $BR\"; git push origin main"   ask   "echo mentions own branch, real push to main"
multi=$'echo "=== what a bare \'git push\' would do ==="\ngit push origin '"$BR"' 2>&1 | tail -20'
expect "$BR" "$UP_SELF" "$multi" allow "multi-line: quoted git push, then own branch piped"

echo "== message names both branches =="
r="$(reason "$(run "$BR" "$UP_SELF" "git push origin main")")"
assert_has "$r" "$BR"   "reason names the current branch"
assert_has "$r" "main"  "reason names the target branch"

echo "== resolver output =="
assert_eq "$(res "$BR" "$UP_MAIN" "git push")"                      "push:main"      "bare push resolves to upstream"
assert_eq "$(res "$BR" "$UP_SELF" "git push origin HEAD:feature/x")" "push:feature/x" "HEAD:feature -> feature/x"
assert_eq "$(res "$BR" "$UP_SELF" "git push origin :feature/x")"     "delete:feature/x" "delete refspec -> delete mode"
assert_eq "$(res "$BR" "$UP_SELF" "git push --tags")"               ""               "--tags only -> no output"
assert_eq "$(res "$BR" "$UP_SELF" "git push origin refs/heads/main")" "push:main"     "refs/heads/ prefix stripped"

echo
echo "PASS=$pass FAIL=$fail"
[[ "$fail" -eq 0 ]]
