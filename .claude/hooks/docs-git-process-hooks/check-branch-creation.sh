#!/usr/bin/env bash

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

# Only act on branch-creating commands
if ! printf '%s' "$cmd" | grep -qE '(checkout[[:space:]]+-b|switch[[:space:]]+-c|git[[:space:]]+branch[[:space:]]+[[:alnum:]_])'; then
  exit 0
fi

# Extract the new branch name from the command
new_branch=$(printf '%s' "$cmd" | grep -oE '(-b|-c)[[:space:]]+[^[:space:]]+' | awk '{print $2}')
if [[ -z "$new_branch" ]]; then
  new_branch=$(printf '%s' "$cmd" | grep -oE 'git[[:space:]]+branch[[:space:]]+[^[:space:]]+' | awk '{print $NF}')
fi

# Only enforce for DOCSP and feature/DOCSP branches
[[ "$new_branch" != DOCSP* && "$new_branch" != feature/DOCSP* ]] && exit 0

remotes=$(git remote -v 2>/dev/null)
if ! printf '%s' "$remotes" | grep -qE '(https://github\.com/10gen/docs-mongodb-internal|git@github\.com:10gen/docs-mongodb-internal\.git|ssh://git@github\.com/10gen/docs-mongodb-internal)'; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: The docs-mongodb-internal monorepo (https://github.com/10gen/docs-mongodb-internal) must be configured as a remote before creating a branch. Run git remote -v to check your remotes."}}'
  exit 0
fi

# Check for git fetch origin && prefix
if ! printf '%s' "$cmd" | grep -qE 'git[[:space:]]+fetch[[:space:]]+origin[[:space:]]+&&'; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: The fetch must be part of the same command as the branch creation, so a fetch you ran earlier does not satisfy this check. Use: git fetch origin && git checkout -b <name> origin/<base>. Any origin/<base> is accepted, not only origin/main -- to base on an unmerged branch, use its name, for example origin/DOCSP-12345-some-branch."}}'
  exit 0
fi

# Detect worktree: git rev-parse --git-dir returns a path ending in
# /worktrees/<name> when running inside a linked worktree.
git_dir=$(git rev-parse --git-dir 2>/dev/null)
in_worktree=false
if [[ "$git_dir" == */worktrees/* ]]; then
  in_worktree=true
fi

# Check for unstaged or uncommitted changes (safe in both worktrees and main tree)
if [[ -n $(git status --porcelain 2>/dev/null) ]]; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: You have unstaged or uncommitted changes. Commit or stash them before creating a new branch."}}'
  exit 0
fi

# In a worktree, new DOCSP branches must be based on origin/main to avoid
# accidentally forking off the worktree branch instead of main.
if [[ "$in_worktree" == true ]]; then
  if ! printf '%s' "$cmd" | grep -qE 'origin/main([[:space:]]|$)'; then
    jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: You are inside a worktree. New DOCSP branches must be based on origin/main to avoid forking off the worktree branch. Use: git fetch origin && git checkout -b <name> origin/main (run from the main repo checkout, or add origin/main explicitly here)"}}'
    exit 0
  fi
fi

# Check for origin/<base> start point
if ! printf '%s' "$cmd" | grep -qE 'origin/[^[:space:]]+'; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: New branches must specify an origin/<base> start point. Any origin/<base> is accepted, not only origin/main. Use: git fetch origin && git checkout -b <name> origin/main, or name another branch to base on it, for example origin/DOCSP-12345-some-branch."}}'
  exit 0
fi

exit 0
