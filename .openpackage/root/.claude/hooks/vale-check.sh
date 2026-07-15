#!/usr/bin/env bash
# Run Vale on .txt/.rst content files after Claude creates or edits them.
# PostToolUse hook: receives tool call JSON on stdin.
# Outputs additionalContext JSON so findings reach Claude as context.

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

if ! command -v vale &>/dev/null; then
    exit 0
fi

if [ ! -f "$REPO_ROOT/vale.ini" ]; then
    exit 0
fi

input=$(cat)
file=$(printf '%s' "$input" | jq -r '.tool_input.file_path // ""')

if [[ "$file" =~ \.(txt|rst)$ ]] && [[ "$file" == content/* || "$file" == ./content/* || "$file" == */content/* ]] && [[ "$file" != */content/code-examples/* ]]; then
    output=$(cd "$REPO_ROOT" && vale --config vale.ini --minAlertLevel suggestion "$file" 2>/dev/null)
    if [ -n "$output" ]; then
        message="Vale lint results for ${file}:\n${output}"
        printf '%s' "$message" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
    fi
fi

exit 0
