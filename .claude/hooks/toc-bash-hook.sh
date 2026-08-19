#!/bin/bash
# PostToolUse Bash: fires when a Bash command moves or deletes a page in content/
input=$(cat)
command=$(echo "$input" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('command', ''))
except Exception:
    print('')
" 2>/dev/null)

# Only run git status if the command plausibly moved or deleted a content/
# .txt file: require an actual (git )?mv or (git )?rm verb token, not just a
# substring match (e.g. "term" or "confirm" contain "rm"), and a content/
# .txt path somewhere in the command.
if ! echo "$command" | grep -qE '(^|[;&|[:space:]])(git[[:space:]]+)?(mv|rm)[[:space:]]'; then
    exit 0
fi
if ! echo "$command" | grep -q 'content/.*\.txt'; then
    exit 0
fi

affected=$(git -C "${CLAUDE_PROJECT_DIR:-.}" status --short 2>/dev/null \
    | grep -E '^(\?\?|[ADRC].| D)' \
    | grep 'content/.*\.txt' \
    | grep -v '/includes/' \
    || true)

if [ -n "$affected" ]; then
    message="Documentation pages moved or deleted in content/. Invoke the unified-toc skill now to update the unified table of contents before continuing."
    printf '%s' "$message" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
fi
