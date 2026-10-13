#!/usr/bin/env bash

current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
[[ "$current_branch" != DOCSP* && "$current_branch" != feature/DOCSP* ]] && exit 0

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

# Only act on git merge origin/main. Split the command into segments on
# shell separators and match only segments that invoke git merge, so text
# that merely quotes the command (echo, grep, heredoc bodies) does not match.
is_merge=false
while IFS= read -r segment; do
  if [[ "$segment" =~ ^[[:space:]]*git([[:space:]]+-C[[:space:]]+[^[:space:]]+)?[[:space:]]+merge[[:space:]](.*[[:space:]])?origin/main([[:space:]]|$) ]]; then
    is_merge=true
    break
  fi
done < <(printf '%s\n' "$cmd" | awk '{ gsub(/&&|\|\||;|\|/, "\n"); print }')
[[ "$is_merge" == true ]] || exit 0

# Allow if no upstream set
upstream=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)
[[ -z "$upstream" ]] && exit 0

# Allow unless tracking a different feature branch
feature_branch="${upstream#origin/}"
[[ "$feature_branch" != feature/* ]] && exit 0
[[ "$feature_branch" == "$current_branch" ]] && exit 0

# Tracking a feature branch — block and suggest correct workflow
message="Blocked: Do not merge origin/main directly into '$current_branch'. Update the feature branch first: (1) git checkout $feature_branch && git merge origin/main, then (2) git checkout $current_branch && git merge $feature_branch"

jq -n --arg msg "$message" \
  '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":$msg}}'
exit 0
