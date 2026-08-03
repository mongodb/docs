#!/usr/bin/env bash
# PostToolUse hook (DOCSP-61672): when Claude opens a PR with `gh pr create`,
# move the ticket to "Internal Review" and post the PR URL as a comment, so
# status-timing reports capture when review started.
#
# The ticket key comes from the current branch name (DOCSP-XXXXX-...). The PR
# URL comes from the tool output; if the command did not actually produce a PR
# URL (failure, dry run), the hook does nothing. Advisory and non-blocking.

set -uo pipefail

input=$(cat)
tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

[[ "$tool" != "Bash" ]] && exit 0
printf '%s' "$cmd" | grep -qE 'gh[[:space:]]+pr[[:space:]]+create' || exit 0

# Confirm a PR URL was actually produced (proves the command succeeded).
response=$(printf '%s' "$input" | jq -r '.tool_response // ""' 2>/dev/null)
pr_url=$(printf '%s' "$response" | grep -oE 'https://github\.com/10gen/docs-mongodb-internal/pull/[0-9]+' | head -1)
[[ -z "$pr_url" ]] && exit 0

# Ticket key from the current branch.
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
key=$(printf '%s' "$branch" | grep -oiE 'DOCSP-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]')
[[ -z "$key" ]] && exit 0

# Dedup: one attempt per PR per session.
session_id=$(printf '%s' "$input" | jq -r '.session_id // empty')
sentinel="${TMPDIR:-/tmp}/claude-jira-review-${session_id:-nosession}-$(printf '%s' "$pr_url" | grep -oE '[0-9]+$')"
[[ -f "$sentinel" ]] && exit 0
touch "$sentinel" 2>/dev/null || true

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
result=$("$dir/jira-transition.sh" "$key" "Internal Review")

# Post the PR link as a comment (matches the jira skill's Internal Review step).
if jira issue comment add "$key" "PR: $pr_url" >/dev/null 2>&1; then
  result+=$'\n'"Posted PR link to $key: $pr_url"
fi

[[ -n "$result" ]] && jq -n --arg m "$result" '{systemMessage: $m}'
exit 0
