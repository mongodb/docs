#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

prepare_snippets

run ra-09_0100_create_gke_sa.sh
# need to wait as the SA is not immediately available
sleep 10
run ra-09_0120_add_role_to_sa.sh
run ra-09_0130_create_sa_key.sh
run ra-09_0140_create_namespaces.sh
run ra-09_0150_create_sa_secrets.sh
run ra-09_0200_install_externaldns.sh
run ra-09_0300_setup_dns_zone.sh

popd
