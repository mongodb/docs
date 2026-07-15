#!/usr/bin/env bash
# PostToolUse hook: nudge when Claude moves, renames, or deletes a page under
# content/ so the writer can add redirect entries to the project's JSON
# redirects files.
#
# Trigger model (DOCSP-61214): the reminder fires on the file operation itself
# -- a `git mv`/`mv`/`git rm`/`rm` of a content page run by Claude -- not on a
# git-state scan at commit time. This means:
#   * It only ever fires for operations Claude performs. A human moving files in
#     their own terminal never trips a Claude hook, so there is nothing to
#     "defer" and no dismissal flag to maintain.
#   * It is deduped to once per session: the first page move/rename/delete emits
#     the nudge, then it stays quiet for the rest of the session so a bulk
#     restructure does not produce a wall of reminders.
# The reminder is informational and non-blocking. The hard guarantee remains
# block-push-missing-redirects.sh, which blocks the push if redirects are still
# missing -- and which uses a git diff, so it also catches human-made renames
# that Claude never saw.

set -euo pipefail

input=$(cat)

# Only act on Bash tool calls.
tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

if [[ "$tool" != "Bash" ]]; then
  exit 0
fi

# Gate on a move/rename/delete operation: (git )?mv or (git )?rm.
if ! printf '%s' "$cmd" | grep -qE '(^|[;&|[:space:]])(git[[:space:]]+)?(mv|rm)[[:space:]]'; then
  exit 0
fi

# Pull out any content page paths the command touches. Pages live under a
# project's source/ tree and end in .txt; includes are snippets, not pages, so
# they are excluded.
pages=$(printf '%s' "$cmd" \
  | grep -oE 'content/[^[:space:]"'"'"']+\.txt' \
  | grep -E 'source/' \
  | grep -v '/includes/' \
  | sort -u \
  || true)

if [[ -z "$pages" ]]; then
  exit 0
fi

# Dedup to once per session.
session_id=$(printf '%s' "$input" | jq -r '.session_id // empty')
sentinel="${TMPDIR:-/tmp}/claude-redirect-nudge-${session_id:-nosession}"
if [[ -f "$sentinel" ]]; then
  exit 0
fi
touch "$sentinel" 2>/dev/null || true

msg="Detected a page move, rename, or delete under content/ that may need redirect entries in the project's JSON redirects files:"
msg+=$'\n\n'"$pages"
msg+=$'\n\nInvoke the add-redirects skill to classify each change (rename vs delete) and update the project'"'"'s JSON redirects files before pushing. This reminder is informational and fires once per session; the push is blocked until redirects exist.'

# Hook JSON output: non-blocking system message surfaced to Claude.
jq -n --arg m "$msg" '{systemMessage: $m}'
