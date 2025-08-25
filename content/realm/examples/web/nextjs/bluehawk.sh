#! /bin/bash

bluehawk snip . -o $(git rev-parse --show-toplevel)/source/examples/generated/web

# get ssr specific examples
bluehawk snip pages/_app.js -o $(git rev-parse --show-toplevel)/source/examples/generated/web/ssr --state ssr
