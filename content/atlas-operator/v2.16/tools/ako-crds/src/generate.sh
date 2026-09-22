#!/usr/bin/env bash
# Generate both sets of AKO CRD reference docs (manual + generated)
# from the AKO source repo at a given release tag.
#
# Usage:
#   ./generate.sh <version-tag>
#
# Example:
#   ./generate.sh v2.12.0

set -euo pipefail

REPO_URL="git@github.com:mongodb/mongodb-atlas-kubernetes.git"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <version-tag>"
  echo "Example: $0 v2.12.0"
  exit 1
fi

VERSION="$1"

echo "==> Generating CRD reference docs for AKO ${VERSION}..."
python3 "${SCRIPT_DIR}/main.py" \
  --repo-url "${REPO_URL}" \
  --version "${VERSION}" \
  --manual-crds

echo "==> Done."
