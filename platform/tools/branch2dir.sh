#!/bin/bash -e

# branch2dir
#
# Copies the repo state at the latest commit on the target branch (or commit)
# into the specified subdirectory on the current branch. Retains git history on
# copied objects. Set your working directory to the root of the target repo
# before running this script.

Usage() {
  echo "Usage: $0 <from branch|commit> <to subdirectory>"
}

FROM_COMMIT="$1"
TO_DIRECTORY="$2"

if [ -z "$FROM_COMMIT" ] || [ -z "$TO_DIRECTORY" ]; then
  Usage
  exit 1
fi

if [[ "$TO_DIRECTORY" =~ ^/ ]]; then
  echo "Unexpected absolute path"
  exit 1
fi

# Strip trailing slashes and leading `./`s
TO_DIRECTORY=$(echo "$TO_DIRECTORY" | sed -E 's|/*$||' | sed -E 's|^(\./)+||')

if [[ "$(pwd)" != "$(git rev-parse --show-toplevel)" ]]; then
  echo "Error: current working directory is not git project root."
  exit 1
fi

if [ ! -z "$(git status --porcelain)" ]; then
  echo "Error: git working tree is not clean. Commit or stash your changes."
  exit 1
fi

echo "Operating on repo: $(git rev-parse --show-toplevel)"

checksum() {
  find . -not -path "./.git/*" -not -path "./$TO_DIRECTORY/*" -type f -exec md5 "{}" +
}

CURRENT_BRANCH="$(git symbolic-ref --short HEAD)"

CHECKSUM_CURRENT_BRANCH_BEFORE=`checksum`

# Start at latest commit on target branch or commit
git checkout "$(git log "$FROM_COMMIT" --pretty=%h -1)" 2> /dev/null

CHECKSUM_FROM_COMMIT=`checksum`

git checkout "$CURRENT_BRANCH" 2> /dev/null
git subtree add --prefix="$TO_DIRECTORY" "$FROM_COMMIT"

# Validate changes
pushd "$TO_DIRECTORY" > /dev/null
CHECKSUM_COPY=`checksum`
popd > /dev/null

CHECKSUM_CURRENT_BRANCH_AFTER=`checksum`

if [[ "$CHECKSUM_CURRENT_BRANCH_BEFORE" != "$CHECKSUM_CURRENT_BRANCH_AFTER" ]]; then
  echo "Something went wrong: before state does not match current branch state!"
  diff <(echo "$CHECKSUM_CURRENT_BRANCH_BEFORE") <(echo "$CHECKSUM_CURRENT_BRANCH_AFTER")
  exit 1
fi

if [[ "$CHECKSUM_FROM_COMMIT" != "$CHECKSUM_COPY" ]]; then
  echo "Something went wrong: target branch/commit state does not match newly copied directory!"
  diff <(echo "$CHECKSUM_FROM_COMMIT") <(echo "$CHECKSUM_COPY")
  exit 1
fi

echo "Successfully copied $FROM_COMMIT to $TO_DIRECTORY on $CURRENT_BRANCH."
