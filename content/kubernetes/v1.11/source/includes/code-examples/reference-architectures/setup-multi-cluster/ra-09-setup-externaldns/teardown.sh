#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

prepare_snippets

cleanup_failed=0
run ra-09_9000_delete_sa.sh || cleanup_failed=1
run ra-09_9050_delete_namespace.sh || cleanup_failed=1
run ra-09_9100_delete_dns_zone.sh || cleanup_failed=1

popd

exit ${cleanup_failed}
