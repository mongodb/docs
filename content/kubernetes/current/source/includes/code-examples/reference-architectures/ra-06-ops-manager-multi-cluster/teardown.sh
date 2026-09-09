#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

set +u
source env_variables.sh
set -u

prepare_snippets

run ra-06_9100_delete_backup_namespaces.sh &
run ra-06_9200_delete_om.sh &
wait

popd
