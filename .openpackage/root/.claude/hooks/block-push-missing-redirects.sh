#!/usr/bin/env bash
# PreToolUse hook: block git push when page deletions/renames on this branch
# lack corresponding redirect entries in the project's netlify.toml.
#
# Checks each deleted/renamed page path individually against the netlify.toml
# content — not just whether netlify.toml was touched at all.

set -euo pipefail

input=$(cat)

# Only act on Bash tool calls that are git push commands.
tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

if [[ "$tool" != "Bash" ]] || ! printf '%s' "$cmd" | grep -qE '^\s*git\s+push'; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Find page-level deletions/renames on this branch vs main.
page_changes=$(git diff --name-status origin/main...HEAD 2>/dev/null \
  | grep -E '^(D|R)' \
  | grep -E 'content/[^/]+/.+/source/|content/[^/]+/source/' \
  | grep '\.txt$' \
  | grep -v '/includes/' \
  || true)

if [[ -z "$page_changes" ]]; then
  exit 0
fi

# For each changed file, derive its URL path and check whether a 'from' entry
# for that URL exists anywhere in the project's netlify.toml.
unhandled=()

while IFS=$'\t' read -r status old_path new_path_or_empty; do
  # For renames (R<score>), old_path is the source; for deletes (D), it's the
  # only path field.
  file_path="$old_path"

  # Derive project root: content/<project>
  project=$(printf '%s' "$file_path" | grep -oE 'content/[^/]+')
  toml="${project}/netlify.toml"

  if [[ ! -f "$toml" ]]; then
    unhandled+=("$file_path (no netlify.toml found at $toml)")
    continue
  fi

  # Derive the page slug by stripping everything up to and including "source/"
  # and the trailing ".txt". Works for both versioned and non-versioned projects.
  slug=$(printf '%s' "$file_path" | sed 's|.*/source/||; s|\.txt$||')

  # Check if any 'from =' line in the netlify.toml contains this slug.
  # Scope to 'from' lines only — 'to' lines are redirect destinations, not sources.
  # Avoid grep -q here: under pipefail, grep -q's early exit sends SIGPIPE to
  # the upstream grep (exit 141), making the pipeline falsely fail even when
  # the slug is found. Redirect to /dev/null instead so both greps run fully.
  from_lines=$(grep -E '^\s*from\s*=' "$toml")

  # First check for an exact slug match.
  covered=false
  if printf '%s\n' "$from_lines" | grep -F "$slug" > /dev/null; then
    covered=true
  fi

  # Also accept a splat wildcard whose prefix covers the slug.
  # A 'from' ending in /* covers any slug that starts with that prefix.
  if [[ "$covered" == "false" ]]; then
    while IFS= read -r from_line; do
      # Extract the path value (strip 'from = "' and trailing '"')
      from_path=$(printf '%s' "$from_line" | sed 's|.*from[[:space:]]*=[[:space:]]*"||; s|".*||')
      # Check for wildcard: remove trailing /* and see if slug starts with that prefix
      if [[ "$from_path" == *"/*" ]]; then
        prefix="${from_path%/\*}"
        # Strip leading /docs/<project>/ so prefix is comparable to the slug
        prefix_slug=$(printf '%s' "$prefix" | sed 's|^/docs/[^/]*/||')
        if [[ "$slug" == "$prefix_slug"/* || "$slug" == "$prefix_slug" ]]; then
          covered=true
          break
        fi
      fi
    done < <(printf '%s\n' "$from_lines")
  fi

  if [[ "$covered" == "false" ]]; then
    unhandled+=("$file_path  →  missing 'from' entry for /$slug/")
  fi
done < <(printf '%s\n' "$page_changes" \
  | awk '{print $1 "\t" $2 "\t" ($3 ? $3 : "")}')

if [[ ${#unhandled[@]} -eq 0 ]]; then
  exit 0
fi

reason="Push blocked: redirect entries missing for these deleted/renamed pages:

$(printf '  %s\n' "${unhandled[@]}")

Invoke the add-redirects skill to add the required [[redirects]] entries for ALL listed pages, then push."

jq -n --arg r "$reason" '{"decision": "block", "reason": $r}'
