#!/bin/bash
# This script cleans up the Snooty parser environment after a build.
# It removes the cloned snooty-parser repository and build artifacts
# to prevent pushing a repo within a repo to GitHub.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Cleaning up Snooty environment..."

# Remove the cloned snooty-parser repository
if [ -d "$SCRIPT_DIR/snooty-parser" ]; then
  rm -rf "$SCRIPT_DIR/snooty-parser"
  echo "Removed snooty-parser directory"
fi

# Optionally remove the virtual environment
if [ -d "$SCRIPT_DIR/.venv" ]; then
  rm -rf "$SCRIPT_DIR/.venv"
  echo "Removed .venv directory"
fi

# Remove the build output directory
ATLAS_ROOT="$(dirname "$SCRIPT_DIR")"
if [ -d "$ATLAS_ROOT/build" ]; then
  rm -rf "$ATLAS_ROOT/build"
  echo "Removed build output directory"
fi

# Remove the build log from tmp directory
if [ -f "/tmp/snooty-build-log.txt" ]; then
  rm -f "/tmp/snooty-build-log.txt"
  echo "Removed build log from /tmp"
fi

echo "Cleanup complete."
