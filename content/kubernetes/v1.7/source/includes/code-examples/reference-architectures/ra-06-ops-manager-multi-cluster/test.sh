#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

prepare_snippets

run ra-06_0250_generate_certs.sh

run ra-06_0300_ops_manager_create_admin_credentials.sh
run ra-06_0310_ops_manager_deploy_on_single_member_cluster.sh
run_for_output ra-06_0311_ops_manager_wait_for_pending_state.sh
run_for_output ra-06_0312_ops_manager_wait_for_running_state.sh
run ra-06_0320_ops_manager_add_second_cluster.sh
run_for_output ra-06_0321_ops_manager_wait_for_pending_state.sh
run_for_output ra-06_0322_ops_manager_wait_for_running_state.sh

run ra-06_0400_install_minio_s3.sh
run ra-06_0500_ops_manager_prepare_s3_backup_secrets.sh
run ra-06_0510_ops_manager_enable_s3_backup.sh
run_for_output ra-06_0522_ops_manager_wait_for_running_state.sh

run ra-06_0610_create_mdb_org_and_get_credentials.sh

popd
