#!/usr/bin/env bash

if [[ "$(git config docs.team 2>/dev/null)" != "true" ]]; then
  exit 0
fi

remotes=$(git remote -v 2>/dev/null)
if ! printf '%s' "$remotes" | grep -qE '(https://github\.com/10gen/docs-mongodb-internal|git@github\.com:10gen/docs-mongodb-internal\.git|ssh://git@github\.com/10gen/docs-mongodb-internal)'; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: The docs-mongodb-internal monorepo (https://github.com/10gen/docs-mongodb-internal) must be configured as a remote before creating a branch. Run git remote -v to check your remotes."}}'
  exit 0
fi

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

# Only act on branch-creating commands
if ! printf '%s' "$cmd" | grep -qE '(checkout[[:space:]]+-b|switch[[:space:]]+-c|git[[:space:]]+branch[[:space:]]+[^-])'; then
  exit 0
fi

# Check for git fetch origin && prefix
if ! printf '%s' "$cmd" | grep -qE 'git[[:space:]]+fetch[[:space:]]+origin[[:space:]]+&&'; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: Always fetch before creating a branch. Use: git fetch origin && git checkout -b <name> origin/<base>"}}'
  exit 0
fi

# Check for unstaged or uncommitted changes
if [[ -n $(git status --porcelain 2>/dev/null) ]]; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: You have unstaged or uncommitted changes. Commit or stash them before creating a new branch."}}'
  exit 0
fi

# Check for origin/<base> start point
if ! printf '%s' "$cmd" | grep -qE 'origin/[^[:space:]]+'; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: New branches must specify an origin/ base. Use: git fetch origin && git checkout -b <name> origin/<base>"}}'
  exit 0
fi

exit 0
