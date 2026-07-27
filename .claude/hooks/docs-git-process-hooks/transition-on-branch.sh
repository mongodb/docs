#!/usr/bin/env bash
# PostToolUse hook (DOCSP-61672): when Claude creates a DOCSP branch, move the
# ticket to "In Progress" so status-timing reports reflect real start times.
# The In Progress transition requires a Story Points Estimate, so the move is
# gated on that field: if it is empty, the helper nudges the agent to estimate
# it with the rubric in the jira skill and defers the transition to that run
# instead of inventing a number.
#
# Fires on the same branch-creating commands as check-branch-creation.sh
# (checkout -b / switch -c / git branch <name>). The ticket key is read from
# the branch name (DOCSP-XXXXX-...), which is already the enforced convention,
# so no lookup or configuration is needed. Advisory and non-blocking.

set -uo pipefail

input=$(cat)
tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

[[ "$tool" != "Bash" ]] && exit 0

# Only act on branch-creating commands.
printf '%s' "$cmd" | grep -qE '(checkout[[:space:]]+-b|switch[[:space:]]+-c|git[[:space:]]+branch[[:space:]]+[[:alnum:]_])' || exit 0

# Extract the new branch name.
new_branch=$(printf '%s' "$cmd" | grep -oE '(-b|-c)[[:space:]]+[^[:space:]]+' | awk '{print $2}')
[[ -z "$new_branch" ]] && new_branch=$(printf '%s' "$cmd" | grep -oE 'git[[:space:]]+branch[[:space:]]+[^[:space:]]+' | awk '{print $NF}')

# Pull the DOCSP key out of the branch name (handles optional feature/ prefix).
key=$(printf '%s' "$new_branch" | grep -oiE 'DOCSP-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]')
[[ -z "$key" ]] && exit 0

# Dedup: one transition attempt per ticket per session. The sentinel is keyed
# on the DOCSP key, not the branch name, so creating a second branch for the
# same ticket in one session does not re-fire the In Progress move (the ticket
# is already there). This is intentional: we want one move per ticket.
session_id=$(printf '%s' "$input" | jq -r '.session_id // empty')
sentinel="${TMPDIR:-/tmp}/claude-jira-inprogress-${session_id:-nosession}-${key}"
[[ -f "$sentinel" ]] && exit 0
touch "$sentinel" 2>/dev/null || true

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
result=$("$dir/jira-transition.sh" "$key" "In Progress" --require-points)

[[ -n "$result" ]] && jq -n --arg m "$result" '{systemMessage: $m}'
exit 0
