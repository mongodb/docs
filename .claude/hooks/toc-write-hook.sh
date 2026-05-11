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
    python3 -c "
import json, sys
msg = 'A documentation page was written at ' + sys.argv[1] + '. Invoke the unified-toc skill now to register this page in the unified table of contents before continuing.'
print(json.dumps({'systemMessage': msg}))
" "$file_path"
fi
