#!/usr/bin/env bash
# create-daily-merge-workflow.sh
#
# Automates the Feature Branch Maintenance procedure
# (https://wiki.corp.mongodb.com/spaces/DOC/pages/559781807/Feature+Branch+Maintenance):
# generates a GitHub Actions workflow that merges main into a branch once a
# day and reports the result to Slack. `.claude/scripts/feature-branch.sh
# daily-sync` calls this script, so the Feature Planner Agent and manual runs
# produce the same workflow.
#
# The workflow is generated from
# .claude/templates/daily-merge-workflow-template.yml.
#
# Defaults:
#   - Branch:         the branch you have checked out when you run the script.
#   - Schedule:       9:00 in your local time zone, converted to a UTC cron
#                     expression. Uses the system time zone (or $TZ if set).
#                     The conversion uses your current UTC offset, so the run
#                     shifts by an hour across daylight saving changes.
#   - Secrets:        GH_ACCESS_TOKEN and DOC_RESYNC_NOTIFICATIONS, defined in
#                     the repo secrets (Settings → Secrets and variables → Actions).
#                     GH_ACCESS_TOKEN is the GitHub token the workflow uses to
#                     check out, merge, and push the branch.
#                     DOC_RESYNC_NOTIFICATIONS contains the Slack webhook URL for
#                     posting the merge results to the docs-resync-notifications
#                     Slack channel. Pass --secret to use a different Slack
#                     webhook secret. If you omit --secret, the script asks
#                     you to confirm the default in an interactive terminal.
#                     Without a terminal, it uses the default without
#                     prompting. The Feature Planner Agent asks the writer
#                     which secret to use and always passes it, so it doesn't
#                     rely on this fallback.
#
# The script does the following:
#   1. Creates a new branch from origin/main (scheduled workflows only run
#      from the default branch, so the workflow file must merge to main).
#   2. Writes .github/workflows/daily-merge-<name>.yml on that branch, where
#      <name> is the branch's DOCSP key (docsp-xxxxx), or the whole branch
#      name if it has no key.
#   3. With --open-pr: commits, pushes, and opens a draft PR, then switches
#      back to your branch.
#
# Usage:
#   bash .github/scripts/create-daily-merge-workflow.sh [options]
#
# Options:
#   --branch NAME        Feature or DOCSP branch to keep in sync (default: current branch)
#   --secret NAME        Name (not value) of the GitHub secret that holds the
#                        Slack webhook URL (default: DOC_RESYNC_NOTIFICATIONS)
#   --time HH:MM         Local time of the daily merge, 24-hour (default: 09:00)
#   --work-branch NAME   Branch to create from main
#                        (default: DOCSP-XXXXX-daily-merge, or daily-merge-<name>)
#   --dry-run            Print the generated workflow and exit; no git changes
#   --open-pr            Commit, push, and open a draft PR after generating
#   --force              Overwrite a workflow file that already exists on main
#   -h, --help           Show this help

set -euo pipefail

GITHUB_TOKEN_SECRET="GH_ACCESS_TOKEN"
DEFAULT_SLACK_WEBHOOK_SECRET="DOC_RESYNC_NOTIFICATIONS"
TEMPLATE=".claude/templates/daily-merge-workflow-template.yml"

usage() {
  sed -n '2,/^$/p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

die() {
  echo "Error: $*" >&2
  exit 1
}

feature_branch=""
secret=""
local_time="09:00"
work_branch=""
dry_run=false
open_pr=false
force=false

while [ $# -gt 0 ]; do
  case "$1" in
    --branch)      feature_branch="${2:?--branch requires a value}"; shift 2 ;;
    --secret)      secret="${2:?--secret requires a value}"; shift 2 ;;
    --time)        local_time="${2:?--time requires a value}"; shift 2 ;;
    --work-branch) work_branch="${2:?--work-branch requires a value}"; shift 2 ;;
    --dry-run)     dry_run=true; shift ;;
    --open-pr)     open_pr=true; shift ;;
    --force)       force=true; shift ;;
    -h|--help)     usage 0 ;;
    *)             echo "Unknown option: $1" >&2; usage 1 ;;
  esac
done

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" \
  || die "run this script from inside the docs repository."
cd "$repo_root"
[ -f "$TEMPLATE" ] || die "template not found: $TEMPLATE"

# --- Feature branch ---------------------------------------------------------

if [ -z "$feature_branch" ]; then
  feature_branch="$(git rev-parse --abbrev-ref HEAD)"
fi
original_branch="$(git rev-parse --abbrev-ref HEAD)"

case "$feature_branch" in
  HEAD) die "you are in a detached HEAD state. Check out your feature branch or pass --branch." ;;
  main) die "the feature branch can't be main. Check out your feature branch or pass --branch." ;;
esac
git check-ref-format --branch "$feature_branch" >/dev/null 2>&1 \
  || die "'$feature_branch' is not a valid branch name."
case "$feature_branch" in
  *[\|\&\\]*) die "branch '$feature_branch' contains |, &, or \\, which this script can't substitute." ;;
esac

# Name the file after the DOCSP key in the branch name if there is one (for
# example, feature/DOCSP-60866-name -> docsp-60866). Otherwise, use the whole
# branch name.
jira_key="$(printf '%s' "$feature_branch" | grep -oiE 'DOCSP-[0-9]+' | head -n 1 || true)"
if [ -n "$jira_key" ]; then
  jira_key="$(printf '%s' "$jira_key" | tr '[:lower:]' '[:upper:]')"
  name="$(printf '%s' "$jira_key" | tr '[:upper:]' '[:lower:]')"
  work_branch="${work_branch:-$jira_key-daily-merge}"
else
  name="$(printf '%s' "${feature_branch#feature/}" \
    | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')"
  work_branch="${work_branch:-daily-merge-$name}"
fi
workflow_file=".github/workflows/daily-merge-${name}.yml"

# --- Slack webhook secret ---------------------------------------------------

if [ -z "$secret" ]; then
  if [ -t 0 ]; then
    read -r -p "Use the default Slack webhook secret $DEFAULT_SLACK_WEBHOOK_SECRET? [Y/n] " reply
    if [[ "$reply" =~ ^[Nn] ]]; then
      read -r -p "Enter the name of the GitHub secret that holds the Slack webhook URL (not the URL itself): " secret
      [ -n "$secret" ] || die "no secret name entered."
    else
      secret="$DEFAULT_SLACK_WEBHOOK_SECRET"
    fi
  else
    secret="$DEFAULT_SLACK_WEBHOOK_SECRET"
    echo "No Slack webhook secret given; using the default, $secret."
  fi
fi
[[ "$secret" =~ ^[A-Z_][A-Z0-9_]*$ && "$secret" != GITHUB_* ]] \
  || die "secret name '$secret' must be uppercase letters, digits, and underscores, and must not start with GITHUB_."

# --- Schedule: local time -> UTC cron ---------------------------------------

[[ "$local_time" =~ ^([01]?[0-9]|2[0-3]):([0-5][0-9])$ ]] \
  || die "--time must be HH:MM in 24-hour format, for example 09:00."
local_hour=$((10#${BASH_REMATCH[1]}))
local_minute=$((10#${BASH_REMATCH[2]}))

# date +%z prints the current UTC offset, for example -0700 or +0530.
offset="$(date +%z)"
tz_name="$(date +%Z)"
offset_minutes=$(( 10#${offset:1:2} * 60 + 10#${offset:3:2} ))
if [ "${offset:0:1}" = "-" ]; then
  offset_minutes=$(( -offset_minutes ))
fi

utc_total=$(( (local_hour * 60 + local_minute - offset_minutes) % 1440 ))
if [ "$utc_total" -lt 0 ]; then
  utc_total=$(( utc_total + 1440 ))
fi
utc_hour=$(( utc_total / 60 ))
utc_minute=$(( utc_total % 60 ))

cron="${utc_minute} ${utc_hour} * * *"
cron_comment="$(printf '%02d:%02d %s (UTC%s:%s) daily' \
  "$local_hour" "$local_minute" "$tz_name" "${offset:0:3}" "${offset:3:2}")"

# --- Generate the workflow --------------------------------------------------

# Drop the template's leading comment block, then fill in the placeholders.
workflow="$(awk 'started || !/^#/ { started = 1; print }' "$TEMPLATE" \
  | sed -e "s|<feature-branch>|$feature_branch|g" \
        -e "s|<slack-webhook-secret>|$secret|g" \
        -e "s|<github-token-secret>|$GITHUB_TOKEN_SECRET|g" \
        -e "s|<cron>|$cron|g" \
        -e "s|<cron-comment>|$cron_comment|g")"

echo "Feature branch: $feature_branch"
echo "Schedule:       $cron_comment -> cron \"$cron\" (UTC)"
echo "Slack secret:   $secret"
echo "Workflow file:  $workflow_file"
echo "Work branch:    $work_branch (cut from origin/main)"

if $dry_run; then
  echo
  printf '%s\n' "$workflow"
  exit 0
fi

# --- Git: new branch from main, write the file ------------------------------

if [ -n "$(git status --porcelain)" ]; then
  die "your working tree has uncommitted changes. Commit or stash them first so they don't end up in the PR to main."
fi

if ! git ls-remote --exit-code --heads origin "$feature_branch" >/dev/null 2>&1; then
  echo "Warning: '$feature_branch' doesn't exist on origin yet. Push it before the workflow runs, or the checkout step fails." >&2
fi

git fetch origin main --quiet

if git show-ref --verify --quiet "refs/heads/$work_branch"; then
  die "branch '$work_branch' already exists. Delete it or pass --work-branch."
fi

if git cat-file -e "origin/main:$workflow_file" 2>/dev/null && ! $force; then
  die "$workflow_file already exists on main. Pass --force to overwrite it."
fi

# --no-track keeps the new branch from tracking origin/main, so a bare
# `git push` can't target main.
git switch --quiet --no-track -c "$work_branch" origin/main
printf '%s\n' "$workflow" > "$workflow_file"
echo "Created branch '$work_branch' from origin/main and wrote $workflow_file."

if ! $open_pr; then
  cat <<EOF

Next steps:
  1. Review $workflow_file.
  2. Commit, push, and open a PR against main:
       git add $workflow_file
       git commit -m "Add daily merge of main into $feature_branch"
       git push origin $work_branch
     Or rerun this script with --open-pr.
  3. After the PR merges, test the workflow from the Actions tab with
     "Run workflow": https://github.com/10gen/docs-mongodb-internal/actions
  4. Delete the workflow when '$feature_branch' merges into main.
  5. To return to your branch: git switch $original_branch
EOF
  exit 0
fi

# --- Optional: commit, push, open a draft PR --------------------------------

command -v gh >/dev/null || die "--open-pr requires the GitHub CLI (gh)."

git add "$workflow_file"
git commit --quiet -m "Add daily merge of main into $feature_branch"
git push --quiet origin "$work_branch"

pr_body="$(cat <<EOF
## Description

Adds a scheduled GitHub Actions workflow that merges \`main\` into \`$feature_branch\` daily at $cron_comment (cron \`$cron\` UTC), following the [Feature Branch Maintenance](https://wiki.corp.mongodb.com/spaces/DOC/pages/559781807/Feature+Branch+Maintenance) procedure.

- Pushes the merge when it succeeds.
- Aborts and reports conflicting files when it conflicts.
- Posts the result to Slack through \`$secret\`.

Generated by \`.github/scripts/create-daily-merge-workflow.sh\`.
EOF
)"

gh pr create --draft --base main --head "$work_branch" \
  --title "Add daily merge of main into $feature_branch" \
  --body "$pr_body"

git switch --quiet "$original_branch"
echo "Switched back to '$original_branch'."
