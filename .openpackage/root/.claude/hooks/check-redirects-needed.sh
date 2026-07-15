#!/usr/bin/env bash
# Stop hook: warn when page moves/renames/deletes under content/ need
# redirect entries in the project's netlify.toml.
#
# Checks both uncommitted changes (vs HEAD) and committed-but-not-pushed
# changes (vs upstream or origin/main). Emits a systemMessage via hook JSON.

set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# 1. Uncommitted changes (working tree + index vs HEAD).
uncommitted=$(git diff --name-status HEAD 2>/dev/null \
  | grep -E '^(A|D|R)' \
  | grep -E 'content/[^/]+/.+/source/|content/[^/]+/source/' \
  | grep '\.txt$' \
  | grep -v '/includes/' \
  || true)

# 2. All changes on this branch vs main (catches committed+pushed on a feature branch).
#    Three-dot diff finds the merge-base, so it works regardless of whether the
#    branch is ahead of or behind origin/main.
committed=$(git diff --name-status origin/main...HEAD 2>/dev/null \
  | grep -E '^(A|D|R)' \
  | grep -E 'content/[^/]+/.+/source/|content/[^/]+/source/' \
  | grep '\.txt$' \
  | grep -v '/includes/' \
  | sort -u \
  || true)

# 3. Untracked new .txt pages.
untracked=$(git ls-files --others --exclude-standard 'content/*/source/**/*.txt' 2>/dev/null \
  | grep -v '/includes/' \
  || true)

if [[ -z "$uncommitted" && -z "$committed" && -z "$untracked" ]]; then
  exit 0
fi

msg="Detected page-level changes under content/ that may need redirect entries in netlify.toml:"
if [[ -n "$uncommitted" ]]; then
  msg+=$'\n\nUncommitted:\n'"$uncommitted"
fi
if [[ -n "$committed" ]]; then
  msg+=$'\n\nOn this branch vs main:\n'"$committed"
fi
if [[ -n "$untracked" ]]; then
  msg+=$'\n\nUntracked new pages:\n'"$untracked"
fi
msg+=$'\n\nInvoke the add-redirects skill to classify each change (rename vs delete vs new page) and update the project'"'"'s netlify.toml before the PR is merged.'

# Hook JSON output: non-blocking system message surfaced to Claude.
jq -n --arg m "$msg" '{systemMessage: $m}'
