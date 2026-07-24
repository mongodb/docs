#!/usr/bin/env bash
# Usage: check-prs.sh DOCSP-AAAAA DOCSP-BBBBB ...
# Waits 7 minutes, then checks for PRs opened by sage-bot-beta for each ticket.
# Outputs PR_FOUND <ticket>: <json> or PR_MISSING <ticket> per ticket.

REPO="10gen/docs-mongodb-internal"
for ticket in "$@"; do
  pr=$(gh pr list \
    --repo "$REPO" \
    --search "$ticket in:title author:app/mongodb-sage-bot" \
    --json number,url,createdAt \
    --jq '.[0]' 2>/dev/null)
  if [ -n "$pr" ] && [ "$pr" != "null" ]; then
    echo "PR_FOUND $ticket: $pr"
  else
    echo "PR_MISSING $ticket"
  fi
done
