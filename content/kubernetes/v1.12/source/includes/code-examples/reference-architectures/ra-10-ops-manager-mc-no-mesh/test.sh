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

# Pre-clean any global GCP LB resources left by a retried execution of this same
# run. The resource names are run-scoped (KUBE-268), so this only affects
# resources from the current run suffix, not concurrent runs.
bash code_snippets/ra-10_9000_cleanup_gke_lb.sh || true

run ra-10_0100_generate_certs.sh
sleep 10 # wait for cert-manager to generate secrets

run ra-10_0110_add_cert_to_gcp.sh

run_for_output ra-10_0150_om_load_balancer.sh

run ra-10_0160_add_dns_record.sh

run ra-10_0300_ops_manager_create_admin_credentials.sh

run ra-10_0320_ops_manager_no_mesh.sh

run_for_output ra-10_0321_ops_manager_wait_for_pending_state.sh

run ra-10_0325_set_up_lb_services.sh
run ra-10_0326_set_up_lb_services.sh

run_for_output ra-10_0330_ops_manager_wait_for_running_state.sh

run ra-10_0400_install_minio_s3.sh
run ra-10_0500_ops_manager_prepare_s3_backup_secrets.sh
run ra-10_0510_ops_manager_enable_s3_backup.sh
run_for_output ra-10_0522_ops_manager_wait_for_running_state.sh

run ra-10_0610_create_mdb_org_and_get_credentials.sh

popd
