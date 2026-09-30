#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source scripts/code_snippets/sample_test_runner.sh

pushd "${script_dir}"

set +u
source env_variables.sh
set -u

prepare_snippets

run ra-08_9000_delete_resources.sh

popd
