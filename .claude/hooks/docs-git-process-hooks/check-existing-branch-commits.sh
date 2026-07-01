#!/usr/bin/env bash

# Fires on the first Edit or Write tool call of each Claude Code session.
# session_id comes from the hook stdin JSON and is unique per Claude session,
# so the sentinel resets automatically when the user reopens Claude Code.
input=$(cat)
session_id=$(printf '%s' "$input" | jq -r '.session_id // empty' 2>/dev/null)

repo_root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
repo_hash=$(printf '%s' "$repo_root" | cksum | awk '{print $1}')

if [[ -n "$session_id" ]]; then
  sentinel="/tmp/branch-commit-check-${session_id}-${repo_hash}"
else
  sentinel="/tmp/branch-commit-check-${repo_hash}"
fi

[[ -f "$sentinel" ]] && exit 0
touch "$sentinel"

# Only act on DOCSP-NNNNN branches
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
[[ "$branch" =~ ^DOCSP-([0-9]+) ]] || exit 0
ticket_prefix="DOCSP-${BASH_REMATCH[1]}"

# Get commits ahead of origin/main
commits=$(git log origin/main..HEAD --oneline 2>/dev/null)
[[ -z "$commits" ]] && exit 0

# Flag commits attributed to a different DOCSP ticket.
# Skip merge/revert commits and commits with no DOCSP prefix (e.g. "Fix typo",
# "WIP") — those are local housekeeping and not cross-ticket contamination.
offending=()
while IFS= read -r line; do
  subject="${line#* }"
  [[ "$subject" =~ ^(Merge|Revert) ]] && continue
  [[ "$subject" == "$ticket_prefix"* ]] && continue
  [[ "$subject" =~ ^DOCSP-[0-9]+ ]] || continue
  offending+=("  $line")
done <<< "$commits"

[[ ${#offending[@]} -eq 0 ]] && exit 0

printf 'Warning: Branch "%s" contains commits that may not belong to %s.\n' "$branch" "$ticket_prefix"
printf 'If intentional, continue. If not, move them to the correct branch before opening a PR:\n'
printf 'cherry-pick the commits onto a new branch from origin/main, then rebase them off this one.\n\n'
printf '%s\n' "${offending[@]}"
