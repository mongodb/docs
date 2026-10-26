#!/usr/bin/env bash
#
# feature-branch.sh — deterministic git helpers for the AI-assisted feature-docs
# workflow. The Feature Planner Agent and Feature Drafter Agent call this instead
# of running raw git, so the branch flow is identical every run.
#
# All operations use `git merge`, never `git rebase`, per the docs team's
# Feature Branches Handling process:
# https://wiki.corp.mongodb.com/spaces/DE/pages/239736577/Feature+Branches+Handling
#
# Usage:
#   feature-branch.sh create <feature-branch>
#       Create the feature branch from an up-to-date main and push it. Idempotent:
#       if the branch already exists on origin, it checks it out instead.
#       Example:
#         feature-branch.sh create feature/DOCSP-60866-vector-quantization
#
#   feature-branch.sh sync <feature-branch>
#       Owner-only. Merge the latest main into the feature branch and push, so it
#       does not fall behind. Run about once per day.
#       Example:
#         feature-branch.sh sync feature/DOCSP-60866-vector-quantization
#
#   feature-branch.sh start-task <feature-branch> <ticket-branch>
#       Drafter. Cut a ticket branch off the latest remote feature tip. Does NOT
#       check out the feature branch, so it is safe to run in parallel worktrees.
#       Example:
#         feature-branch.sh start-task feature/DOCSP-60866-vector-quantization \
#           DOCSP-60870-quantization-concept
#
#   feature-branch.sh daily-sync [<feature-branch> [<slack-webhook-secret>]] [options]
#       Owner. Runs .github/scripts/create-daily-merge-workflow.sh, which
#       generates .github/workflows/daily-merge-<name>.yml from
#       .claude/templates/daily-merge-workflow-template.yml. The workflow merges
#       main into the feature branch daily and posts the result to Slack.
#       <feature-branch> defaults to the branch you have checked out. <name> is
#       the branch's DOCSP key (docsp-xxxxx), or the whole branch name if it
#       has no key, so it also works for branches created outside this workflow.
#       <slack-webhook-secret> is the name (not the value) of the GitHub secret
#       that holds the Slack webhook URL. If you omit it, the script asks you to
#       confirm the default, DOC_RESYNC_NOTIFICATIONS, or enter another name in
#       an interactive terminal. Without a terminal, it uses the default without
#       prompting. The Feature Planner Agent asks the writer which secret to use
#       and always passes it, so it doesn't rely on this fallback.
#       The workflow runs daily at 9:00 in your local time zone, converted to
#       UTC. Scheduled workflows run only from main, so the script cuts a work
#       branch from origin/main (default DOCSP-XXXXX-daily-merge) and writes the
#       file there. Requires a clean working tree. It does not commit, push, or
#       touch secrets unless you pass --open-pr. Other options (--time,
#       --work-branch, --dry-run, --open-pr, --force) pass through to the
#       script; run `feature-branch.sh daily-sync --help` to list them.
#       Example:
#         feature-branch.sh daily-sync feature/DOCSP-60866-vector-quantization
#
# PROCESS OVERVIEW
# The full feature-docs branch lifecycle this script supports:
#
#   1. The planner runs `create` once to make the feature branch off the
#      latest main. All of the feature's docs land here before shipping.
#   2. Each drafter runs `start-task` to cut its own ticket branch off the
#      feature tip, drafts one unit, and opens a PR that targets the feature
#      branch, never main.
#   3. The writer reviews and merges each ticket PR into the feature branch.
#      Merge shared-include and dependency PRs first, so dependent tasks
#      branch off a feature tip that already has them.
#   4. The feature-branch owner runs `sync` about once a day to merge the
#      latest main in, then tells collaborators to update their ticket
#      branches, so the branch does not drift from main. To automate this,
#      the owner runs `daily-sync` once and merges the generated workflow
#      into main.
#   5. When the feature's docs are complete and reviewed, the writer opens one
#      final PR from the feature branch into main, so the feature publishes as
#      a unit. To ship the change to other versions, the writer adds
#      `backport-<project>-<version>` labels (see .github/backport-config.yml)
#      to that final PR before merging, and the backport workflow cherry-picks
#      it into those version directories.
#
set -euo pipefail

die() { echo "error: $*" >&2; exit 1; }

# Feature branches must match feature/DOCSP-XXXXX-lowercase-hyphenated-name.
validate_feature_branch() {
  local b="$1"
  [[ "$b" =~ ^feature/DOCSP-[0-9]+-[a-z0-9]+(-[a-z0-9]+)*$ ]] || die \
    "feature branch '$b' must match feature/DOCSP-XXXXX-name (all lowercase, hyphenated)"
}

# Ticket branches must match DOCSP-XXXXX-lowercase-hyphenated-name (no feature/ prefix).
validate_ticket_branch() {
  local b="$1"
  [[ "$b" =~ ^DOCSP-[0-9]+-[a-z0-9]+(-[a-z0-9]+)*$ ]] || die \
    "ticket branch '$b' must match DOCSP-XXXXX-name (all lowercase, hyphenated)"
}

warn_if_dirty() {
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "warning: working tree has uncommitted changes; commit or stash before switching branches" >&2
  fi
}

cmd_create() {
  local branch="$1"
  validate_feature_branch "$branch"
  warn_if_dirty
  git checkout main
  git pull origin main          # git pull, NOT git pull --rebase, on feature-branch work
  if git ls-remote --exit-code --heads origin "$branch" >/dev/null 2>&1; then
    echo "feature branch '$branch' already exists on origin; checking it out"
    git fetch origin "$branch"
    git checkout "$branch"
  else
    git checkout -b "$branch" origin/main
    git push origin "$branch"
    echo "created and pushed feature branch '$branch'"
  fi
}

cmd_sync() {
  local branch="$1"
  validate_feature_branch "$branch"
  warn_if_dirty
  git checkout "$branch"
  git fetch origin
  git merge origin/main         # merge, never rebase
  git push origin "$branch"
  echo "synced '$branch' with main. Tell collaborators to update their ticket branches."
}

cmd_start_task() {
  local feature="$1" ticket="$2"
  validate_feature_branch "$feature"
  validate_ticket_branch "$ticket"
  warn_if_dirty
  git fetch origin
  # Branch the ticket directly off the latest remote feature tip. We do NOT check
  # out the feature branch itself: the drafter runs in its own worktree, and the
  # feature branch may already be checked out elsewhere (the planner's working
  # copy, or another parallel drafter). Git refuses to check out one branch in two
  # worktrees, so branching straight to a unique ticket branch avoids the collision.
  git checkout -b "$ticket" "origin/$feature"
  echo "cut ticket branch '$ticket' off origin/$feature. Open its PR with: open-pr --base $feature"
}

cmd_daily_sync() {
  # Thin wrapper: .github/scripts/create-daily-merge-workflow.sh does the work,
  # so agent and manual runs generate the same workflow. The positional
  # <feature-branch> and <slack-webhook-secret> map to its --branch and
  # --secret; other options (--time, --work-branch, --dry-run, --open-pr,
  # --force, --help) pass through unchanged.
  local -a positional=() passthrough=() args=()
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --branch|--secret|--time|--work-branch)
        [[ $# -ge 2 ]] || die "$1 requires a value"
        passthrough+=("$1" "$2"); shift 2 ;;
      -*) passthrough+=("$1"); shift ;;
      *)  positional+=("$1"); shift ;;
    esac
  done
  [[ ${#positional[@]} -le 2 ]] || die \
    "usage: feature-branch.sh daily-sync [<feature-branch> [<slack-webhook-secret>]] [options]"
  [[ -z "${positional[0]:-}" ]] || args+=(--branch "${positional[0]}")
  [[ -z "${positional[1]:-}" ]] || args+=(--secret "${positional[1]}")

  local root script
  root="$(git rev-parse --show-toplevel)" || die "run this from inside the docs repository"
  script="$root/.github/scripts/create-daily-merge-workflow.sh"
  [[ -f "$script" ]] || die "script not found: $script"
  # The ${arr[@]+...} form keeps empty arrays safe under set -u in bash 3.2.
  bash "$script" ${args[@]+"${args[@]}"} ${passthrough[@]+"${passthrough[@]}"}
}

main() {
  local sub="${1:-}"; shift || true
  case "$sub" in
    create)     [[ $# -eq 1 ]] || die "usage: feature-branch.sh create <feature-branch>"; cmd_create "$1" ;;
    sync)       [[ $# -eq 1 ]] || die "usage: feature-branch.sh sync <feature-branch>"; cmd_sync "$1" ;;
    start-task) [[ $# -eq 2 ]] || die "usage: feature-branch.sh start-task <feature-branch> <ticket-branch>"; cmd_start_task "$1" "$2" ;;
    daily-sync) cmd_daily_sync "$@" ;;
    ""|-h|--help|help) sed -n '2,/^set -euo pipefail$/p' "$0" | sed '$d' ;;
    *) die "unknown subcommand '$sub' (try: create | sync | start-task | daily-sync)" ;;
  esac
}

main "$@"
