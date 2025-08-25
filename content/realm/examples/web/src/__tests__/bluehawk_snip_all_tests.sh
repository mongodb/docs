#! /bin/bash

REPO=$(git rev-parse --show-toplevel)
bluehawk snip $(echo $REPO)/examples/web/src/__tests__ \
-d $(echo $REPO)/source/examples/generated/web

echo 'deposited the snippets to `/source/examples/generated/web`'
