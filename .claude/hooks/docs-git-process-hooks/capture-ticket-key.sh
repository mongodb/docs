#!/usr/bin/env bash
# UserPromptSubmit hook (DOCSP-63226): remember the DOCSP ticket the writer named,
# so work that starts before a branch exists can still be attributed to it.
#
# WHY: transition-on-work.sh takes the ticket key from the branch name. A writer
# who edits on main and branches only at commit time has no key at edit time, so
# the In Progress move waits for the commit and the recorded start time lands
# late. Raised in review on the DOCSP-63226 PR. Writers almost always name the
# ticket in a prompt before touching a file, which makes the prompt an earlier
# and usually accurate source.
#
# ONLY AN UNAMBIGUOUS KEY IS RECORDED. Two distinct keys in one prompt means the
# writer is comparing or cross-referencing, and guessing which one they are
# starting would move the wrong ticket. In that case the remembered key is
# dropped rather than kept, because the session's subject is now in doubt. A
# prompt with no key at all leaves the existing memory alone: writers name the
# ticket once and then keep working.
#
# This hook only records. transition-on-work.sh decides whether to act on the
# key, and applies a stricter guard when it does, since a prompt mention is
# inference where a branch name is enforced convention.
#
# Advisory and non-blocking. Emits nothing on stdout, so it never injects context
# into the prompt.

set -uo pipefail

input=$(cat)
session_id=$(printf '%s' "$input" | jq -r '.session_id // empty' 2>/dev/null)
prompt=$(printf '%s' "$input" | jq -r '.prompt // empty' 2>/dev/null)
[[ -z "$session_id" || -z "$prompt" ]] && exit 0

file="${TMPDIR:-/tmp}/claude-jira-promptkey-${session_id}"

keys=$(printf '%s' "$prompt" | grep -oiE 'DOCSP-[0-9]+' \
       | tr '[:lower:]' '[:upper:]' | sort -u)
count=$(printf '%s' "$keys" | grep -c 'DOCSP-' 2>/dev/null || true)
[[ -z "$count" ]] && count=0

if [[ "$count" -eq 1 ]]; then
  printf '%s' "$keys" > "$file" 2>/dev/null || true
elif [[ "$count" -gt 1 ]]; then
  rm -f "$file" 2>/dev/null || true
fi

exit 0
