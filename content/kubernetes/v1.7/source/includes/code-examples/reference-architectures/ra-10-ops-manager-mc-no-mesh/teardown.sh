#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

prepare_snippets

run ra-10_9000_cleanup_gke_lb.sh &
run ra-10_9100_delete_backup_namespaces.sh &
run ra-10_9200_delete_om.sh &
wait

popd
