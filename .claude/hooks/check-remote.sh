#!/usr/bin/env bash

if [[ "$(git config docs.team 2>/dev/null)" != "true" ]]; then
  exit 0
fi

remotes=$(git remote -v 2>/dev/null)

if printf '%s' "$remotes" | grep -qE '(https://github\.com/10gen/docs-mongodb-internal|git@github\.com:10gen/docs-mongodb-internal\.git|ssh://git@github\.com/10gen/docs-mongodb-internal)'; then
  exit 0
fi

jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: The docs-mongodb-internal monorepo (https://github.com/10gen/docs-mongodb-internal) must be configured as a remote before making changes. Run git remote -v to check your remotes."}}'
exit 0
