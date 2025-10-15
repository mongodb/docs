#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source "${script_dir}/../../../scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}"

prepare_snippets

run 02_0045_create_namespaces.sh
run 02_0046_create_image_pull_secrets.sh
run 02_0048_configure_prerelease_image_pullsecret.sh

run_for_output 02_0090_helm_add_mogodb_repo.sh
run_for_output 02_0100_install_operator.sh
run 02_0300_create_ops_manager_resources.sh
run 02_0305_create_mongodb_database_resource.sh
run_for_output 02_0310_wait_for_database_resource.sh
run 02_0315_create_mongodb_users.sh
run 02_0320_create_mongodb_search_resource.sh
run 02_0325_wait_for_search_resource.sh
run 02_0330_wait_for_database_resource.sh
run_for_output 02_0335_show_running_pods.sh

cd -
