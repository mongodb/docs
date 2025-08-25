#! /bin/bash
dart run test --concurrency=1

# clean up
DIR=$( dirname -- "$0"; )
sh ./$DIR/delete_realm_files.sh
