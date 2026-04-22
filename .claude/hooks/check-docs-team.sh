#!/usr/bin/env bash

if [[ -n "$(git config docs.team 2>/dev/null)" ]]; then
  exit 0
fi

echo "DOCS_TEAM_SETUP: The docs.team git config flag is not set. Are you a docs writer on this repo? Answer before proceeding." >&2    
exit 2
