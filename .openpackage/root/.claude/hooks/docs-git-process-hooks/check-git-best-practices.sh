#!/usr/bin/env bash

current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
[[ "$current_branch" != DOCSP* && "$current_branch" != feature/DOCSP* ]] && exit 0

RULES_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/git-best-practices.json"

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

while IFS= read -r rule; do
  pattern=$(printf '%s' "$rule" | jq -r '.pattern')
  message=$(printf '%s' "$rule" | jq -r '.message')
  if printf '%s' "$cmd" | grep -qE "$pattern"; then
    jq -n --arg msg "$message" \
      '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":$msg}}'
    exit 0
  fi
done < <(jq -c '.rules[]' "$RULES_FILE")
