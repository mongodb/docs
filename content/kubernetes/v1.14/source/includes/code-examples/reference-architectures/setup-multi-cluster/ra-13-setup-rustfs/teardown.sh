#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")
repo_root=$(cd "${script_dir}/../../../.." && pwd)

source "${repo_root}/scripts/code_snippets/sample_test_runner.sh"

pushd "${script_dir}"

set +u
source env_variables.sh
set -u

prepare_snippets

run ra-13_9100_delete_rustfs_namespace.sh

popd
