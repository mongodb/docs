#!/usr/bin/env bash
# Test suite for block-push-to-main.sh (DOCSP-64949).
#
# HOW TO RUN
#   bash test-block-push-to-main.sh
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

payload() { jq -n --arg c "$1" '{tool_input:{command:$c}}'; }

run() { # run <branch> <upstream> <command> -> hook stdout
  payload "$3" | STUB_BRANCH="$1" STUB_UPSTREAM="$2" PATH="$BIN:$PATH" \
    bash "$HOOKS/block-push-to-main.sh"
}
decision() {
  if [[ -z "${1//[[:space:]]/}" ]]; then echo allow
  else jq -r '.hookSpecificOutput.permissionDecision // "allow"' <<< "$1"; fi
}
reason() {
  if [[ -z "${1//[[:space:]]/}" ]]; then echo ""
  else jq -r '.hookSpecificOutput.permissionDecisionReason // ""' <<< "$1"; fi
}
assert_has() { case "$1" in *"$2"*) ok "$3";; *) no "$3 (missing '$2' in: ${1:-<empty>})";; esac; }

expect() { # expect <branch> <upstream> <command> <want> <label>
  local got; got="$(decision "$(run "$1" "$2" "$3")")"
  if [[ "$got" == "$4" ]]; then ok "$5"; else no "$5 (want $4, got $got)"; fi
}

BR=DOCSP-12345-task
UP_SELF=origin/DOCSP-12345-task
UP_MAIN=origin/main

echo "== pushes to main -> denied =="
expect "$BR" "$UP_SELF" "git push origin main"                      deny "explicit main"
expect "$BR" "$UP_SELF" "git push upstream main"                    deny "upstream remote main"
expect "$BR" "$UP_SELF" "git push origin HEAD:main"                 deny "HEAD:main"
expect "$BR" "$UP_SELF" "git push origin $BR:main"                  deny "local:main"
expect "$BR" "$UP_SELF" "git push origin main:main"                 deny "main:main"
expect "$BR" "$UP_SELF" "git push origin refs/heads/main"           deny "refs/heads/main"
expect "$BR" "$UP_SELF" "git push origin :main"                     deny "delete main via refspec"
expect "$BR" "$UP_SELF" "git push origin --delete main"             deny "delete main via flag"
expect "$BR" "$UP_SELF" "git push origin master"                    deny "master also denied"
expect "$BR" "$UP_MAIN" "git push"                                  deny "bare push tracking main"
expect "main" "$UP_MAIN" "git push"                                 deny "bare push while on main"
expect "main" "$UP_MAIN" "git push origin main"                     deny "explicit main while on main"
expect "$BR" "$UP_SELF" "git push --all"                            deny "--all can carry main"
expect "$BR" "$UP_SELF" "git push --mirror"                         deny "--mirror can carry main"
expect "$BR" "$UP_SELF" "git push origin main 2>&1 | tail"          deny "main piped to tail"

echo "== non-main pushes -> allowed =="
expect "$BR" "$UP_SELF" "git push origin $BR"                       allow "own branch"
expect "$BR" "$UP_SELF" "git push origin feature/DOCSP-999-epic"    allow "feature branch (ask-guard's job, not this one)"
expect "$BR" "$UP_SELF" "git push"                                  allow "bare push tracking own branch"
expect "$BR" "$UP_SELF" "git push origin $BR 2>&1 | tail"           allow "own branch piped"
expect "$BR" "$UP_SELF" "git push --tags"                           allow "--tags only"
expect "$BR" "$UP_SELF" "git push --dry-run origin main"            allow "--dry-run writes nothing"
expect "$BR" "$UP_SELF" "git status"                                allow "not a push"
expect "$BR" "$UP_SELF" "echo \"git push origin main\"; git push origin $BR" allow "git push in an echo string is ignored"

echo "== message names main and says no override =="
r="$(reason "$(run "$BR" "$UP_SELF" "git push origin main")")"
assert_has "$r" "main"        "reason names main"
assert_has "$r" "no override" "reason states there is no override"

echo
echo "PASS=$pass FAIL=$fail"
[[ "$fail" -eq 0 ]]
