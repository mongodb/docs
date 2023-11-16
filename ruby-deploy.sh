#!/bin/sh

# version branch names in descending order
VERSIONS=(master v2.19 v2.18 v2.17 v2.16 v2.15 v2.14 v2.13 v2.12 v2.11 v2.10 v2.9 v2.8 v2.7 v2.6 v2.5 v2.4 v2.3 v2.2 v2.0 v1.x)

# clean
git checkout master

TODEPLOY=()
for i in "${VERSIONS[@]}"
do
    read -p "add branch [$i]? [y/n] " REPLY
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        TODEPLOY+=($i)
    fi
done

# build each version in order
for i in "${TODEPLOY[@]}"; do
    echo "Branch [$i]: Generating HTML and local directories"
    git checkout $i && git pull && make html publish
done

# Prompt in case errors encountered
read -p "Proceed with deploy? " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1
fi

# deploy
for i in "${TODEPLOY[@]}"; do
    echo "Deploying [$i]"
    git checkout $i && yes | make deploy
done

echo "Deployment complete!"