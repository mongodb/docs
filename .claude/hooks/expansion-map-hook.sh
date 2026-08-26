#!/bin/bash
# PostToolUse Write|Edit: fires when a snooty.toml is saved. Regenerates the
# .expansion-map.yml (constants + substitutions) alongside it so skills can
# read a single maintained map instead of each re-parsing snooty.toml
# themselves.
input=$(cat)
file_path=$(echo "$input" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('file_path', ''))
except Exception:
    print('')
" 2>/dev/null)

if echo "$file_path" | grep -qE '(^|/)snooty\.toml$'; then
    if output=$(python3 "$CLAUDE_PROJECT_DIR/.claude/scripts/build-expansion-map.py" "$file_path" 2>&1); then
        message="Regenerated the expansion map at $(dirname "$file_path")/.expansion-map.yml after this snooty.toml edit."
        printf '%s' "$message" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
    else
        message="Failed to regenerate the expansion map for ${file_path}: ${output}"
        printf '%s' "$message" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
    fi
fi
