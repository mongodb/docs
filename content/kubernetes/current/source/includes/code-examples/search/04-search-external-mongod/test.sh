#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source "${script_dir}/../../../scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}"

prepare_snippets

run 04_0045_create_namespaces.sh
run 04_0046_create_image_pull_secrets.sh
run 04_0048_configure_prerelease_image_pullsecret.sh
run_for_output 04_0090_helm_add_mogodb_repo.sh
run_for_output 04_0100_install_operator.sh
run 04_0305_create_mongodb_community_user_secrets.sh
run 04_0310_create_mongodb_community_resource.sh
run_for_output 04_0315_wait_for_community_resource.sh
run 04_0320_create_mongodb_search_resource.sh
run 04_0322_create_search_loadbalancer_service.sh
run 04_0323_update_coredns_configmap.sh
run 04_0325_wait_for_search_resource.sh
run_for_output 04_0330_wait_for_community_resource.sh
run_for_output 04_0335_show_running_pods.sh

cd -
