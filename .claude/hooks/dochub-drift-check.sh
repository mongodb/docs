#!/usr/bin/env bash
# PostToolUse hook: when Claude moves, renames, or deletes a page under
# content/, check whether any DocHub link (dochub.mongodb.org/core/<key>) points
# at that page and nudge to update it. DocHub links are embedded in product UI
# and error messages, so a moved page can silently break a shipped "Learn more"
# link with nothing on the docs side to catch it.
#
# Design (DOCSP-60864):
#   * Fires on the file operation itself -- a git mv/mv/git rm/rm of a content
#     page run by Claude -- mirroring check-redirects-needed.sh. A human moving
#     files in their own terminal never trips a Claude hook.
#   * Uses a cheap, reliable-enough signal: dochub.py page-refs matches the moved
#     page's filename slug against dochub target URLs (generic slugs skipped).
#     The precise check (snooty URL derivation + drift) happens when /dochub is
#     invoked. This keeps the hook fast and out of fragile per-project URL logic.
#   * INFORMATIONAL only. Unlike redirects, a stale dochub link lives in another
#     repo (10gen/docs-subdomains) and must never block the docs PR from merging.
#   * Deduped once per session so a bulk restructure doesn't spam.

set -euo pipefail

input=$(cat)

tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
[[ "$tool" == "Bash" ]] || exit 0

# Gate on a move/rename/delete: (git )?mv or (git )?rm.
printf '%s' "$cmd" \
  | grep -qE '(^|[;&|[:space:]])(git[[:space:]]+)?(mv|rm)[[:space:]]' || exit 0

# Content pages: under a project source/ tree, .txt, excluding includes.
pages=$(printf '%s' "$cmd" \
  | grep -oE 'content/[^[:space:]"'"'"']+\.txt' \
  | grep -E 'source/' \
  | grep -v '/includes/' \
  | sort -u \
  || true)
[[ -n "$pages" ]] || exit 0

session_id=$(printf '%s' "$input" | jq -r '.session_id // empty')
tmp="${TMPDIR:-/tmp}"
sentinel="$tmp/claude-dochub-nudge-${session_id:-nosession}"
[[ -f "$sentinel" ]] && exit 0

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
dochub_py="$script_dir/../skills/dochub/scripts/dochub.py"
[[ -f "$dochub_py" ]] || exit 0

# Cache the dochub netlify.toml once per session. If it can't be fetched
# (offline, no gh), skip silently -- the hook must never fail a tool call.
cache="$tmp/claude-dochub-netlify-${session_id:-nosession}.toml"
if [[ ! -f "$cache" ]]; then
  python3 "$dochub_py" fetch "$cache" >/dev/null 2>&1 \
    || gh api repos/10gen/docs-subdomains/contents/dochub.mongodb.org/netlify.toml \
         --jq '.content' 2>/dev/null | base64 -d > "$cache" 2>/dev/null \
    || { rm -f "$cache"; exit 0; }
fi
[[ -s "$cache" ]] || exit 0

# Build --path args and run the heuristic matcher.
path_args=()
while IFS= read -r p; do [[ -n "$p" ]] && path_args+=(--path "$p"); done <<< "$pages"
hits=$(python3 "$dochub_py" page-refs --file "$cache" "${path_args[@]}" 2>/dev/null || echo '[]')

# Only nudge when there's a real candidate hit.
count=$(printf '%s' "$hits" | jq 'length' 2>/dev/null || echo 0)
[[ "$count" -gt 0 ]] || exit 0

touch "$sentinel" 2>/dev/null || true

keys=$(printf '%s' "$hits" | jq -r '.[] | "  \(.from)  ->  \(.to)"' | sort -u)
msg="Moved/removed a page that a DocHub link may point at. These dochub keys reference the affected page(s):"
msg+=$'\n\n'"$keys"
msg+=$'\n\nInvoke the dochub skill to confirm (it derives the exact old URL and runs a precise drift check) and repoint any affected links. Informational, fires once per session; dochub links live in 10gen/docs-subdomains and do not block this PR.'

jq -n --arg m "$msg" '{systemMessage: $m}'
