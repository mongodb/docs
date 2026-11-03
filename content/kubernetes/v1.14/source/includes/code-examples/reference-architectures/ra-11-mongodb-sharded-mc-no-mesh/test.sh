#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

# Source env_variables.sh so gcloud_retry() is available in this process.
# The parent test runner also sources this, but functions aren't inherited
# by subprocesses — only exported variables are.
source env_variables.sh

prepare_snippets

run ra-11_2050_generate_certs.sh
run ra-11_2100_mongodb_sharded_multi_cluster.sh
run ra-11_2110_mongodb_sharded_multi_cluster_wait_for_running_state.sh

run ra-11_2200_create_mongodb_user.sh
sleep 10
run_for_output ra-11_2210_verify_mongosh_connection.sh

popd
