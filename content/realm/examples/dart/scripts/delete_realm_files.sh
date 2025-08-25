#! /bin/bash

# from the dart directory, run ./scripts/delete_realm_files.sh
rm -rf *.realm.lock *.realm *.realm.note *.realm.management mongodb-realm *.realm.fresh.lock
echo 'deleted the realm files'
