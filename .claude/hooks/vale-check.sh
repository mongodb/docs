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
    cd "$REPO_ROOT" || exit 0
    [ -f "$file" ] || exit 0

    # Report only findings on lines that differ from HEAD, so the agent fixes
    # its own copy rather than rewriting existing content on the page. An
    # untracked file is new, so every line counts as changed.
    if git ls-files --error-unmatch -- "$file" &>/dev/null; then
        changed=$(git diff -U0 HEAD -- "$file" | awk '
            /^@@/ {
                split($3, a, ",")
                start = substr(a[1], 2)
                count = (a[2] == "") ? 1 : a[2]
                for (i = 0; i < count; i++) printf "%d\n", start + i
            }' | jq -s '.')
    else
        changed=null
    fi

    output=$(vale --config vale.ini --minAlertLevel suggestion --output=JSON "$file" 2>/dev/null |
        jq -r --argjson changed "$changed" '
            to_entries[0].value // []
            | map(select($changed == null or (.Line as $l | $changed | index($l))))
            | .[]
            | "\(.Line):\(.Span[0]) \(.Severity) \(.Check): \(.Message)"' 2>/dev/null)
    if [ -n "$output" ]; then
        message="Vale lint results for the lines you changed in ${file}:
${output}

Fix every error and warning before you finish, or tell the user why a finding doesn't apply. Review each suggestion and fix the ones that apply in context."
        printf '%s' "$message" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":.}}'
    fi
fi

exit 0
