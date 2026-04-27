#!/bin/bash
# Validates skill directories changed in a pull request.
#
# This script handles only the changed-skill check. A separate workflow step
# validates all skills (see .github/workflows/validate-skills.yml).
#
# NOTE: The validator flags used here (e.g. --strict) should stay aligned with
# the all-skill check in .github/workflows/validate-skills.yml. If you change which
# checks are run or how strictly they're enforced, update both commands.
#
# Usage: validate-skills.sh <base-ref>
#   base-ref  The base branch name to diff against (e.g. "main").
#
# Exit codes:
#   0  All validated skills passed (or no changed skills found).
#   1  One or more skills failed validation.

# -e is intentionally omitted: all error paths are handled explicitly,
# so abort-on-error would conflict with the || FAILED=1 accumulator pattern.
set -uo pipefail

BASE_REF="${1:-}"

if [ -z "$BASE_REF" ]; then
  echo "Usage: validate-skills.sh <base-ref>"
  exit 1
fi

# Find unique skill directories containing files changed in this PR.
# The three-dot diff requires fetch-depth: 0 and a properly configured remote,
# which is always the case on GitHub Actions.
diff_output="$(git diff --name-only "origin/${BASE_REF}...HEAD" -- .claude/skills/)" || {
  echo "Error: git diff against origin/${BASE_REF} failed."
  echo "Ensure the base branch has been fetched (fetch-depth: 0 in the workflow)."
  exit 1
}

changed_skills=()
mapfile -t changed_skills < <(echo "$diff_output" \
  | cut -d'/' -f3 \
  | sort -u \
  | grep -v '^$')

if [ "${#changed_skills[@]}" -eq 0 ]; then
  echo "No changed skill directories found, skipping validation."
  exit 0
fi

FAILED=0
for skill in "${changed_skills[@]}"; do
  # Skip skills whose directories were deleted in this PR.
  if [ ! -d ".claude/skills/$skill" ]; then
    echo "Skipping deleted skill: $skill"
    continue
  fi

  # Run validation with markdown output so the result is written to the job
  # summary in one pass. --emit-annotations works with any output format, so
  # inline PR annotations are still emitted alongside the markdown report.
  # We use process substitution to:
  # 1. Send all output (including ::error commands) to stdout for GitHub Actions
  # 2. Filter out ::error/::warning/::notice lines before writing to the summary
  skill-validator check --allow-extra-frontmatter --strict --emit-annotations -o markdown "./.claude/skills/$skill/" \
    > >(tee >(grep -v '^::' >> "${GITHUB_STEP_SUMMARY:-/dev/null}")) 2>&1 || FAILED=1
done

if [ $FAILED -ne 0 ]; then
  echo ""
  echo "❌ Skill validation failed!"
  echo ""
  echo "📋 See the Job Summary for detailed validation results:"
  echo "   https://github.com/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
  echo ""
fi

exit $FAILED
