#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source "${script_dir}/../../../scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}"

prepare_snippets

run 01_0040_validate_env.sh
run 01_0045_create_namespaces.sh
run 01_0046_create_image_pull_secrets.sh
run 01_0048_configure_prerelease_image_pullsecret.sh
run_for_output 01_0090_helm_add_mogodb_repo.sh
run_for_output 01_0100_install_operator.sh
run_for_output 01_0110_wait_for_operator_deployment.sh
run 01_0305_create_mongodb_community_user_secrets.sh

run 01_0306_install_cert_manager.sh
run 01_0307_prepare_cert_manager_issuer.sh
run 01_0308_issue_tls_certificates.sh

run 01_0310_create_mongodb_community_resource.sh
run_for_output 01_0315_wait_for_community_resource.sh
run 01_0320_create_mongodb_search_resource.sh
run 01_0325_wait_for_search_resource.sh
run_for_output 01_0330_wait_for_community_resource.sh
run_for_output 01_0335_show_running_pods.sh

cd -
