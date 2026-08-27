#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

prepare_snippets

cleanup_failed=0
run ra-10_9000_cleanup_gke_lb.sh &
pid_lb=$!
run ra-10_9100_delete_backup_namespaces.sh &
pid_ns=$!
run ra-10_9200_delete_om.sh &
pid_om=$!

wait "${pid_lb}" || cleanup_failed=1
wait "${pid_ns}" || cleanup_failed=1
wait "${pid_om}" || cleanup_failed=1

popd

exit ${cleanup_failed}
