#!/usr/bin/env bash
# PostToolUse hook (DOCSP-61672): when Claude opens a PR for review, move the
# ticket to "Internal Review" so status-timing reports capture when review
# started. This hook only transitions; it posts no comment.
#
# DRAFTS (DOCSP-63226): a draft PR is not under review, so creating one does
# NOT transition the ticket. The transition fires on a non-draft
# `gh pr create` or on `gh pr ready`.
#
# Known gap: marking a PR ready through the GitHub web UI runs no command here,
# so no transition fires. This tooling is advisory, not an SLA.
#
# The ticket key comes from the current branch name (DOCSP-XXXXX-...). For a
# create, the PR URL must appear in the tool output, which proves the command
# succeeded; if it did not (failure, --web, dry run), the hook does nothing.
# Advisory and non-blocking.

set -uo pipefail

input=$(cat)
tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

[[ "$tool" != "Bash" ]] && exit 0

# Match only where `gh` actually starts a command -- at the beginning of the
# line or after a separator. Matching the bare substring anywhere made the hook
# fire on commands that merely mentioned `gh pr create` inside a quoted string,
# which is exactly what happens when someone tests this hook -- and it then
# acted on a PR that did not exist (DOCSP-63226).
gh_verb() { printf '%s' "$cmd" | grep -qE "(^|[;&|(]|&&|\|\|)[[:space:]]*gh[[:space:]]+pr[[:space:]]+$1([[:space:]]|$)"; }

if gh_verb create; then
  action="create"
elif gh_verb ready; then
  action="ready"
else
  exit 0
fi

# Ticket key from the current branch.
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
key=$(printf '%s' "$branch" | grep -oiE 'DOCSP-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]')
[[ -z "$key" ]] && exit 0

response=$(printf '%s' "$input" | jq -r '.tool_response // ""' 2>/dev/null)
# Any owner of a docs-mongodb-internal* repo, not just 10gen. The URL used to be
# pinned to the monorepo because the hook pasted it into a Jira comment; that
# comment is gone (DOCSP-63226), so the URL now only names the sentinel, which
# already falls back to $key. Pinning it meant the hook silently no-opped on
# every fork -- including the fork used to live-test it, where a real non-draft
# PR produced no transition and no clue why. The repo-name prefix still excludes
# unrelated repositories, and the ticket comes from the branch either way, so
# which host holds the PR cannot change what gets transitioned.
pr_url=$(printf '%s' "$response" \
  | grep -oE 'https://github\.com/[^/[:space:]]+/docs-mongodb-internal[^/[:space:]]*/pull/[0-9]+' \
  | head -1)

# For a create, a PR URL in the tool output proves the command actually produced
# a PR; without one (failure, --web, dry run) there is nothing to act on.
# `gh pr ready` prints no URL and needs none -- the only thing that reads the
# URL now is the draft message, which applies to a create.
[[ "$action" == "create" && -z "$pr_url" ]] && exit 0

session_id=$(printf '%s' "$input" | jq -r '.session_id // empty')
pr_id=$(printf '%s' "$pr_url" | grep -oE '[0-9]+$')
sentinel_base="${TMPDIR:-/tmp}/claude-jira-review-${session_id:-nosession}-${pr_id:-$key}"

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
result=""

# This hook does NOT comment the PR link on the ticket. GitHub and Jira already
# cross-link, so the comment was noise on a ticket the writer is watching
# anyway (DOCSP-63226).

# --- Transition: skip drafts ------------------------------------------------
is_draft=""
[[ "$action" == "create" ]] && printf '%s' "$cmd" \
  | grep -qE '(^|[[:space:]])(--draft|-d)([[:space:]]|$)' && is_draft=1

if [[ -n "$is_draft" ]]; then
  result="Left $key where it is: PR $pr_url is a draft, so it is not in review yet. Run \`gh pr ready\` when it is ready and the ticket will move to \"Internal Review\"."
elif [[ ! -f "$sentinel_base-move" ]]; then
  touch "$sentinel_base-move" 2>/dev/null || true
  result=$("$dir/jira-transition.sh" "$key" "Internal Review")
fi

# Deliver as additionalContext so the message lands in the tool result, and as
# systemMessage so the writer sees it too (DOCSP-63226).
[[ -n "$result" ]] && jq -n --arg m "$result" \
  '{systemMessage: $m, hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $m}}'

exit 0
