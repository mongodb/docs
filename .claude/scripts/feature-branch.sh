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
#      branches, so the branch does not drift from main.
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

main() {
  local sub="${1:-}"; shift || true
  case "$sub" in
    create)     [[ $# -eq 1 ]] || die "usage: feature-branch.sh create <feature-branch>"; cmd_create "$1" ;;
    sync)       [[ $# -eq 1 ]] || die "usage: feature-branch.sh sync <feature-branch>"; cmd_sync "$1" ;;
    start-task) [[ $# -eq 2 ]] || die "usage: feature-branch.sh start-task <feature-branch> <ticket-branch>"; cmd_start_task "$1" "$2" ;;
    ""|-h|--help|help) sed -n '2,51p' "$0" ;;
    *) die "unknown subcommand '$sub' (try: create | sync | start-task)" ;;
  esac
}

main "$@"
