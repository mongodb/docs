#!/usr/bin/env bash
# Run the nested components linter on .txt/.rst content files after Claude creates or edits them.
# PostToolUse hook: receives tool call JSON on stdin.
# Outputs additionalContext JSON so violations reach Claude as context.

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

input=$(cat)
file=$(printf '%s' "$input" | jq -r '.tool_input.file_path // ""')

if [[ "$file" =~ \.(txt|rst)$ ]] && [[ "$file" == content/* || "$file" == ./content/* || "$file" == */content/* ]]; then
    output=$(cd "$REPO_ROOT" && npx tsx .github/lint-docs/nested-components-lint-cli.ts "$file" 2>/dev/null)
    if [ $? -ne 0 ]; then
        message="Nested components lint found violations in ${file}:\n${output}"
        printf '%s' "$message" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
    fi
fi

exit 0
