#!/usr/bin/env bash
#
# block-push-to-main.sh
#
# PreToolUse guard for `git push`: deny any push whose destination is `main`
# (or `master`). This is a hard block -- a hook "deny" is not something Claude
# can argue past, and there is deliberately no override flag.
#
# It complements check-push-target.sh, which only *asks* when a push targets a
# branch other than the current one. The two share destination resolution via
# resolve-push-destination.sh, so a push to main from another branch is denied
# here (deny wins over ask) rather than merely prompted.
#
# This governs Claude's Bash tool calls. A human pushing from their own
# terminal is unaffected.

set -uo pipefail

HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)
[[ -z "$cmd" ]] && exit 0

# Only act on git push invocations.
printf '%s' "$cmd" | grep -qE '(^|[;&|(]|&&|\|\|)[[:space:]]*git[[:space:]]+push([[:space:]]|$)' || exit 0

targets=$(printf '%s' "$input" | "$HOOKS_DIR/resolve-push-destination.sh")
[[ -z "$targets" ]] && exit 0

deny() {
  jq -n --arg msg "$1" \
    '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":$msg}}'
}

while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  mode=${line%%:*}
  branch=${line#*:}

  case "$mode" in
    all|mirror)
      deny "Blocked: 'git push --$mode' can update main along with other branches. Push a single branch instead: git push origin <your-branch>. This block has no override."
      exit 0
      ;;
    push|delete)
      if [[ "$branch" == "main" || "$branch" == "master" ]]; then
        deny "Blocked: pushing to '$branch' is prohibited -- $branch advances only through reviewed PR merges, so open a pull request from your branch instead. Ticket branches track their base branch by design (Docs Team Git Process), so a bare git push resolves to that base; push your own branch explicitly with git push origin <your-branch>. This block has no override."
      fi
      ;;
  esac
done <<< "$targets"

exit 0
