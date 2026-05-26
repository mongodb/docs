#!/bin/bash
# PostToolUse Write: fires when a new documentation page is written to content/
input=$(cat)
file_path=$(echo "$input" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('file_path', ''))
except Exception:
    print('')
" 2>/dev/null)

if echo "$file_path" | grep -qE 'content/.+\.txt$' && ! echo "$file_path" | grep -q '/includes/'; then
    message="A documentation page was written at ${file_path}. Invoke the unified-toc skill now to register this page in the unified table of contents before continuing."
    printf '%s' "$message" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
fi
