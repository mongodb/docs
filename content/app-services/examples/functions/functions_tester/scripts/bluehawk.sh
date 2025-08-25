#! /bin/bash

BASE_DIR=$(git rev-parse --show-toplevel)
DIR_IN=${BASE_DIR}/examples/functions/functions_tester
DIR_OUT=${BASE_DIR}/source/examples/generated/functions

bluehawk snip $DIR_IN -o $DIR_OUT

bluehawk copy ${DIR_IN}/triggers/retryOperation.json -o $DIR_OUT
