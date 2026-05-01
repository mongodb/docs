#!/bin/bash
affected=$(git -C "${CLAUDE_PROJECT_DIR:-.}" status --short 2>/dev/null | grep -E '^(\?\?|[ADRC].| D)' | grep 'content/.*\.txt')

if [ -n "$affected" ]; then
  python3 -c "
import json
msg = 'Git status shows documentation pages added, moved, or deleted in content/. If any of these are new, removed, or relocated pages, invoke the /unified-toc skill to sync the unified table of contents.'
print(json.dumps({'hookSpecificOutput': {'hookEventName': 'Stop', 'additionalContext': msg}}))
"
fi
