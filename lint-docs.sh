#!/bin/bash
#
# Convenience wrapper for the SEO and 404 linters
# Run from any directory in the repo!
#
# Usage:
#   ./lint-docs.sh seo file1.txt file2.rst ...
#   ./lint-docs.sh 404 file1.txt file2.rst ...
#   ./lint-docs.sh all file1.txt file2.rst ...
#

# Find repo root
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [ -z "$REPO_ROOT" ]; then
  echo "❌ Not in a git repository"
  exit 1
fi

LINT_DIR="$REPO_ROOT/.github/lint-docs"

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
    ;;
  all|both)
    echo "=== SEO Linter ==="
    npx tsx "$LINT_DIR/seo-lint-cli.ts" "$@"
    echo ""
    echo "=== 404 Linter ==="
    npx tsx "$LINT_DIR/404-lint-cli.ts" "$@"
    ;;
  help|--help|-h)
    echo "Documentation Linters"
    echo ""
    echo "Usage: ./lint-docs.sh <command> <files...>"
    echo ""
    echo "Commands:"
    echo "  seo     Run SEO linter (titles, descriptions, headings)"
    echo "  404     Run broken link checker"
    echo "  all     Run both linters"
    echo ""
    echo "Examples:"
    echo "  ./lint-docs.sh seo content/manual/current/source/intro.txt"
    echo "  ./lint-docs.sh 404 content/atlas/current/source/*.txt"
    echo "  ./lint-docs.sh all my-file.rst another-file.md"
    ;;
  *)
    echo "Unknown command: $CMD"
    echo "Run './lint-docs.sh help' for usage"
    exit 1
    ;;
esac
