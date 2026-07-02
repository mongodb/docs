#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

prepare_snippets

run ra-12_1050_generate_certs.sh
run ra-12_1100_mongodb_replicaset_multi_cluster.sh
run ra-12_1110_mongodb_replicaset_multi_cluster_wait_for_running_state.sh

run ra-12_1200_create_mongodb_user.sh
sleep 10
run_for_output ra-12_1210_verify_mongosh_connection.sh

popd
