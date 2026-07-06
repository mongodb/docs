#!/bin/bash
#
# Convenience wrapper for documentation linters
# Can run from any directory!
#
# Usage:
#   ./lint-docs.sh seo file1.txt file2.rst ...
#   ./lint-docs.sh 404 file1.txt file2.rst ...
#   ./lint-docs.sh redirects netlify.toml ...
#   ./lint-docs.sh all file1.txt file2.rst ...
#

# Find repo root - try git first, then fall back to script location
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [ -z "$REPO_ROOT" ]; then
  # Not in a git repo - use script's own location
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  if [ -d "$SCRIPT_DIR/.github/lint-docs" ]; then
    REPO_ROOT="$SCRIPT_DIR"
  else
    echo "❌ Cannot find repo root. Run from within the repo or use absolute path to this script."
    exit 1
  fi
fi

LINT_DIR="$REPO_ROOT/.github/lint-docs"

# Run Vale and strip suppressed-severity counts from its summary line.
# Uses CLICOLOR_FORCE=1 so Vale keeps colors even when stdout is a pipe.
_vale_run() {
  CLICOLOR_FORCE=1 vale --config "$REPO_ROOT/vale.ini" --minAlertLevel "$VALE_MIN_ALERT_LEVEL" "$@" | \
    awk -v level="$VALE_MIN_ALERT_LEVEL" '
      NR > 1 { print prev }
      { prev = $0 }
      END {
        if (NR == 0) exit
        gsub(/\033\[[0-9;]*m/, "", prev)
        if (level == "suggestion") {
          sub(/ and /, ", and ", prev)
        } else if (level == "warning") {
          match(prev, /[0-9]+ warnings?/)
          w = substr(prev, RSTART, RLENGTH)
          sub(/,.*in /, " and " w " in ", prev)
        } else if (level == "error")
          gsub(/, [0-9]+ warnings? and [0-9]+ suggestions? in /, " in ", prev)
        print prev
      }
    '
  return ${PIPESTATUS[0]}
}

# Vale alert threshold. Defaults to warning to match CI; override per-run, e.g.:
#   VALE_MIN_ALERT_LEVEL=suggestion ./lint-docs.sh vale my-file.txt
VALE_MIN_ALERT_LEVEL="${VALE_MIN_ALERT_LEVEL:-warning}"
case "$VALE_MIN_ALERT_LEVEL" in
  suggestion|warning|error) ;;
  *)
    echo "❌ Invalid VALE_MIN_ALERT_LEVEL: '$VALE_MIN_ALERT_LEVEL' (expected: suggestion, warning, or error)"
    exit 1
    ;;
esac

# Check if node is available
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is required but not installed"
  exit 1
fi

# Parse command
CMD="${1:-help}"
shift

case "$CMD" in
  seo)
    npx tsx "$LINT_DIR/seo-lint-cli.ts" "$@"
    ;;
  404|links)
    npx tsx "$LINT_DIR/404-lint-cli.ts" "$@"
    lint_exit=$?
    if [ $lint_exit -ne 0 ] && [ ! -t 1 ]; then
      echo ""
      echo "⚠️  Broken links found."
      echo "   The fix-404s skill can resolve these for you: it checks each URL"
      echo "   for redirects, searches for live replacements, and confirms changes"
      echo "   with you before applying them."
      echo ""
      echo "   How would you like to proceed?"
      echo "   1. Fix now — invoke the fix-404s skill"
      echo "   2. Skip — leave broken links for now and continue"
    fi
    exit $lint_exit
    ;;
  redirects|redirect)
    npx tsx "$LINT_DIR/redirect-lint-cli.ts" "$@"
    ;;
  findability|find)
    npx tsx "$LINT_DIR/findability-lint-cli.ts" "$@"
    ;;
  nested)
    npx tsx "$LINT_DIR/nested-components-lint-cli.ts" "$@"
    ;;
  vale)
    if ! command -v vale &> /dev/null; then
      echo "❌ Vale is required but not installed."
      echo "   Install: https://vale.sh/docs/vale-cli/installation/"
      exit 1
    fi
    _vale_run "$@"
    ;;
  all|both)
    exit_code=0
    echo "=== SEO Linter ==="
    npx tsx "$LINT_DIR/seo-lint-cli.ts" "$@" || exit_code=1
    echo ""
    echo "=== 404 Linter ==="
    npx tsx "$LINT_DIR/404-lint-cli.ts" "$@"
    link_exit=$?
    if [ $link_exit -ne 0 ] && [ ! -t 1 ]; then
      echo ""
      echo "⚠️  Broken links found."
      echo "   The fix-404s skill can resolve these for you: it checks each URL"
      echo "   for redirects, searches for live replacements, and confirms changes"
      echo "   with you before applying them."
      echo ""
      echo "   How would you like to proceed?"
      echo "   1. Fix now — invoke the fix-404s skill"
      echo "   2. Skip — leave broken links for now and continue"
      exit_code=1
    fi
    echo ""
    echo "=== Findability Linter ==="
    npx tsx "$LINT_DIR/findability-lint-cli.ts" "$@" || exit_code=1
    echo ""
    echo "=== Nested Components Linter ==="
    npx tsx "$LINT_DIR/nested-components-lint-cli.ts" "$@" || exit_code=1
    echo ""
    echo "=== Vale Prose Linter ==="
    if command -v vale &> /dev/null; then
      _vale_run "$@" || exit_code=1
    else
      echo "⚠️  Vale is not installed. Skipping prose lint. Install: https://vale.sh/docs/vale-cli/installation/"
    fi
    exit $exit_code
    ;;
  help|--help|-h)
    echo "Documentation Linters"
    echo ""
    echo "Usage: ./lint-docs.sh <command> <files...>"
    echo ""
    echo "Commands:"
    echo "  seo          Run SEO linter (titles, descriptions, headings)"
    echo "  404          Run broken link checker"
    echo "  redirects    Run circular redirect checker"
    echo "  findability  Run findability linter (facets, keywords, docs URLs)"
    echo "  nested       Run nested components linter (forbidden RST directive nesting)"
    echo "  vale         Run Vale prose linter (requires Vale installed)"
    echo "  all          Run SEO + 404 + findability + nested + Vale prose linters"
    echo ""
    echo "Examples:"
    echo "  ./lint-docs.sh seo content/manual/source/intro.txt"
    echo "  ./lint-docs.sh 404 content/atlas/source/*.txt"
    echo "  ./lint-docs.sh redirects content/atlas/netlify.toml"
    echo "  ./lint-docs.sh vale content/atlas/source/my-page.txt"
    echo "  ./lint-docs.sh all my-file.rst another-file.md"
    echo ""
    echo "Environment variables:"
    echo "  VALE_MIN_ALERT_LEVEL   Vale threshold: suggestion, warning (default), or error"
    echo "                         e.g. VALE_MIN_ALERT_LEVEL=suggestion ./lint-docs.sh vale my-file.txt"
    ;;
  *)
    echo "Unknown command: $CMD"
    echo "Run './lint-docs.sh help' for usage"
    exit 1
    ;;
esac
