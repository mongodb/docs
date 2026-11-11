#!/usr/bin/env bash
#
# json-output.sh
#
# Runs a hook command and guarantees JSON on stdout. Cursor loads the hooks in
# .claude/settings.json but blocks the tool call when a hook prints nothing or
# prints plain text; Claude Code treats {} as "no decision, proceed".
#
# Usage: json-output.sh <interpreter> <hook-script> [args...]

out=$("$@")
status=$?
if [[ -z "$out" ]]; then
  echo '{}'
elif printf '%s' "$out" | jq -e 'type == "object"' >/dev/null 2>&1; then
  printf '%s\n' "$out"
else
  jq -n --arg msg "$out" '{systemMessage: $msg}'
fi
exit $status
