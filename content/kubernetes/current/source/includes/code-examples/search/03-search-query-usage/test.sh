#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")

source "${script_dir}/../../../scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}"

prepare_snippets

run 03_0410_run_mongodb_tools_pod.sh
run_for_output 03_0420_import_movies_mflix_database.sh
run 03_0430_create_search_index.sh
run 03_0435_create_vector_search_index.sh
run_for_output 03_0440_wait_for_search_index_ready.sh
run_for_output 03_0444_list_search_indexes.sh
run_for_output 03_0445_list_vector_search_indexes.sh
run_for_output 03_0450_execute_search_query.sh
run_for_output 03_0455_execute_vector_search_query.sh

cd -
