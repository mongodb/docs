#!/usr/bin/env bash
# PostToolUse hook: nudge when a git commit mixed .claude/ changes with
# content/ or code-example-tests/ changes.
#
# .claude/ has its own CODEOWNERS entry, so shipping it alongside unrelated
# content work causes reviewers to be auto-requested on the resulting PR and
# then silently dropped -- with no unsubscribe -- the moment the .claude/
# diff is removed in a later commit or force-push. Non-blocking by design:
# checks the commit that already landed rather than gating the commit
# itself, so it never interrupts normal work (see check-redirects-needed.sh
# for the same non-blocking-nudge pattern applied to a different problem).

set -euo pipefail

input=$(cat)

tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

if [[ "$tool" != "Bash" ]] || ! printf '%s' "$cmd" | grep -qE '(^|[;&|[:space:]])git[[:space:]]+commit'; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

changed=$(git diff-tree --no-commit-id --name-only -r HEAD 2>/dev/null || true)
[[ -z "$changed" ]] && exit 0

claude_files=$(printf '%s\n' "$changed" | grep -E '^\.claude/' || true)
[[ -z "$claude_files" ]] && exit 0

other_files=$(printf '%s\n' "$changed" | grep -E '^(content/|code-example-tests/)' || true)
[[ -z "$other_files" ]] && exit 0

msg="Heads up: the commit you just made ($(git log -1 --format=%h)) mixes .claude/ changes with content/ or code-example-tests/ changes:"
msg+=$'\n\n.claude/ files:\n'"$(printf '  %s\n' "$claude_files")"
msg+=$'\nother files:\n'"$(printf '  %s\n' "$other_files")"
msg+=$'\n.claude/ has its own CODEOWNERS entry. If a PR is opened from this branch, those reviewers get auto-requested -- and if the .claude/ files are later dropped from the branch (e.g. they were leftover session artifacts), the request is removed but reviewers stay subscribed with nothing to review. If the .claude/ files here are unintentional, drop them from this commit before pushing/opening a PR (git reset HEAD~1 --soft, unstage, recommit). If the .claude/ change is intentional, split it into its own commit/PR.'

printf '%s' "$msg" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
