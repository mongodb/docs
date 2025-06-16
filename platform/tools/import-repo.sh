#!/bin/bash -e

# import-repo
#
# Run this from the destination monorepo. Converts versions to subdirectories on
# target repo (if needed) and moves target repo into monorepo.

# ANSI colors
RED='\033[0;31m'
GRN='\033[0;32m'
YEL='\033[1;33m'
CYN='\033[0;36m'
RST='\033[0m'

Usage() {
  echo -e "${YEL}Usage:${RST} $0 <repo url> <project name>"
}

REPO_URL="$1"
PROJECT_NAME="$2"

if [ -z "$REPO_URL" ] || [ -z "$PROJECT_NAME" ]; then
  Usage
  exit 1
fi

if [[ "$(pwd)" != "$(git rev-parse --show-toplevel)" ]]; then
  echo -e "${RED}Error:${RST} current working directory is not git project root."
  exit 1
fi

fzf=$(which fzf)
if [ -z "$fzf" ]; then
  echo -e "${RED}Dependency 'fzf' not found!${RST} (try: brew install fzf)"
  exit 1
fi

if [ ! -z "$(git status --porcelain)" ]; then
  echo -e "${RED}Git repo not clean!${RST} Stash or commit your changes first."
  exit 1
fi

# Ensure absolute path to branch2dir script
branch2dir="$(cd "$(dirname "$0")" && pwd)/branch2dir.sh"
pathToRepo="/private/var/tmp/$PROJECT_NAME"
workingBranchName="tmp-import-repo-working-branch"

# Clear existing port if it exists
git rm -rf content/$PROJECT_NAME 2> /dev/null && git commit -m "Make way for re-import of $PROJECT_NAME" 2> /dev/null

# Clone repo to tmp directory
rm -rf "$pathToRepo"
echo -e "${CYN}Cloning $REPO_URL into $pathToRepo...${RST}"
git clone "$REPO_URL" "$pathToRepo/" &> /dev/null
echo -e "Clone done."

pushd "$pathToRepo" > /dev/null
git checkout -b "$workingBranchName" > /dev/null

# List available remote branches
branches=$(git branch -a | grep remotes/origin/ | sed 's|  remotes/origin/||' | sort -u)

# Do you even want to branch2dir?
read -p "Port branches to subdirectories? (y/N): " shouldSelectBranches

# Loop in case user needs to retry this step
while [[ $shouldSelectBranches == [yY] ]]; do

  # Open interative selector
  selected=$(printf "%s\n" "$branches" |\
    fzf --multi --cycle \
        --prompt="Select branches to add as directories (Tab to select, Enter to confirm): ")

  # Get branch -> directory mapping (default is branch name, but might be custom
  # like 'current', 'upcoming', etc.)
  pairs=()
  for branch in $selected; do
    read -e -p "Directory name for branch '$branch'? [$branch]: " dir
    dir=${dir:-$branch}
    pairs+=("$branch,$dir")
  done

  # Ensure this is correct
  echo -e "${CYN}Branch -> directory:${RST}"
  for pair in "${pairs[@]}"; do
    echo "$pair" | awk -F, '{printf "  - \033[1;33m%s\033[0m -> \033[0;36m%s\033[0m\n", $1, $2}'
  done
  echo
  read -p "Looks ok? (y/N): " confirm
  [[ "$confirm" != [yY] ]] && continue

  # Clean root
  echo -e "${YEL}Cleaning repo root...${RST}"
  git ls-files -z | xargs -0 git rm -f > /dev/null
  git commit -m "Clean repo root" > /dev/null

  # Copy branches to subdirectories
  echo -e "${GRN}Copying branches to subdirectories...${RST}"
  for pair in "${pairs[@]}"; do
    IFS=',' read -r branch dir <<< "$pair"
    "$branch2dir" "remotes/origin/$branch" "$dir"
  done
  break
done

# Back to monorepo
popd > /dev/null

# Import repo
remoteName="tmp-import-repo"
git remote rm "$remoteName" 2> /dev/null || true
git remote add -f "$remoteName" "$pathToRepo" &> /dev/null
git subtree add --prefix="content/$PROJECT_NAME" "$remoteName/$workingBranchName"

# Clean up
git remote rm "$remoteName"
rm -rf "$pathToRepo"

echo -e "${GRN}Merged to monorepo.${RST}"
echo -e "${YEL}⚠️  Now be sure to add the netlify.toml to content/$PROJECT_NAME/${RST} by copying and making the appropriate changes from the template.toml"
