#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

prepare_snippets

run ra-01_0005_gcloud_set_current_project.sh
run ra-01_0010_create_gke_cluster_0.sh &
run ra-01_0010_create_gke_cluster_1.sh &
run ra-01_0010_create_gke_cluster_2.sh &
wait

run ra-01_0020_get_gke_credentials.sh
run_for_output ra-01_0030_verify_access_to_clusters.sh

popd
