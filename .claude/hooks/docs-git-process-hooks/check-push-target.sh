#!/usr/bin/env bash
#
# check-push-target.sh
#
# PreToolUse guard for `git push`: a push may only target the branch you are
# currently on. When the resolved destination differs, the hook asks the user
# to confirm instead of letting the push through.
#
# Why this exists: a ticket branch based on a feature branch (the documented
# workflow) tracks that base branch. If a push lands on the base instead of on
# the ticket branch, GitHub sees every commit of an open PR reachable from its
# base and marks the PR merged -- with no review. The same mistake on a
# branch that tracks origin/main pushes straight to main.
#
# This hook returns permissionDecision "ask" (a human prompt), not "deny":
# the goal is to surface the destination to a person, not to make the agent
# route around the rule. The hard block for pushes to main is a separate hook.
#
# Destination resolution lives in resolve-push-destination.sh so the push
# guards share one parser.

set -uo pipefail

HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)
[[ -z "$cmd" ]] && exit 0

# Only act on git push invocations.
printf '%s' "$cmd" | grep -qE '(^|[;&|(]|&&|\|\|)[[:space:]]*git[[:space:]]+push([[:space:]]|$)' || exit 0

current=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
[[ -z "$current" || "$current" == "HEAD" ]] && exit 0

targets=$(printf '%s' "$input" | "$HOOKS_DIR/resolve-push-destination.sh")
[[ -z "$targets" ]] && exit 0

ask() {
  jq -n --arg msg "$1" \
    '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":$msg}}'
}

while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  mode=${line%%:*}
  branch=${line#*:}

  case "$mode" in
    all|mirror)
      ask "This command pushes every branch (--$mode). Confirm you mean to update more than the branch you're on ('$current')."
      exit 0
      ;;
    push|delete)
      [[ "$branch" == "$current" ]] && continue
      if [[ "$branch" == "main" || "$branch" == "master" ]]; then
        ask "This command pushes to '$branch', not the branch you're on ('$current'). Pushing directly to $branch is not part of the docs workflow -- $branch advances only through reviewed PR merges. Confirm you intend to push to $branch."
      else
        ask "This command pushes to '$branch', but you're on '$current'. Pushing a branch's commits onto a different branch can make GitHub mark an open PR merged without review. To push your own branch instead: git push origin $current. Confirm you intend to push to '$branch'."
      fi
      exit 0
      ;;
  esac
done <<< "$targets"

exit 0
