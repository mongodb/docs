#!/bin/bash -ex

npm i -g bluehawk bluehawk-plugin-git

git config --global user.email "$INPUT_EMAIL"
git config --global user.name "$INPUT_NAME"

if [ -z "$INPUT_COMMITMESSAGE" ]; then
  COMMITMESSAGE="Update"
else
  COMMITMESSAGE="$INPUT_COMMITMESSAGE"
fi

for state in $INPUT_STATES; do
  bluehawk \
    --plugin "`bluehawk-plugin-git`" \
    git copy \
    --to-repo "$INPUT_TOREPO" \
    --state $state \
    --branch $state \
    --delete-everything \
    --commit-message "$COMMITMESSAGE" \
    "$INPUT_SOURCE"
done
