#!/usr/bin/env bash

if [[ "$(git config docs.team 2>/dev/null)" != "true" ]]; then
  exit 0
fi

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

# Only act on git merge origin/main
if ! printf '%s' "$cmd" | grep -qE 'git[[:space:]]+merge[[:space:]].*origin/main([[:space:]]|$)'; then
  exit 0
fi

# Allow if detached HEAD
current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [[ -z "$current_branch" || "$current_branch" == "HEAD" ]]; then
  exit 0
fi

# Allow if no upstream set
upstream=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)
if [[ -z "$upstream" ]]; then
  exit 0
fi

# Allow if tracking origin/main or main
if [[ "$upstream" == "origin/main" || "$upstream" == "main" ]]; then
  exit 0
fi

# Tracking a feature branch — block and suggest correct workflow
feature_branch="${upstream#origin/}"
message="Blocked: Do not merge origin/main directly into '$current_branch'. Update the feature branch first: (1) git checkout $feature_branch && git merge origin/main, then (2) git checkout $current_branch && git merge $feature_branch"

jq -n --arg msg "$message" \
  '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":$msg}}'
exit 0
