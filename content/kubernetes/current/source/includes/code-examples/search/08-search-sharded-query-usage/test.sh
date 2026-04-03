#!/usr/bin/env bash
# Test runner script for sharded MongoDB Search query snippets
#
# This module is reusable across different sharded search scenarios.
# It deploys a tools pod, imports sample data, shards collections,
# creates search indexes, and runs search queries.
#
# Required env vars (set by the calling infrastructure module):
#   MDB_ADMIN_CONNECTION_STRING or MDB_CONNECTION_STRING
#   MDB_USER_CONNECTION_STRING or MDB_CONNECTION_STRING
#   K8S_CTX, MDB_NS, MDB_VERSION, MDB_TLS_CA_CONFIGMAP

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")
project_dir="${script_dir}/../../.."

source "${project_dir}/scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}" || exit 1

prepare_snippets

# Deploy tools pod for MongoDB commands
run 08_0410_run_mongodb_tools_pod.sh

# Import sample data and shard collections
run_for_output 08_0420_import_sample_data.sh

# Create search indexes
run 08_0430_create_search_index.sh
run 08_0435_create_vector_search_index.sh
run_for_output 08_0440_internal_wait_for_search_indexes.sh

# Execute search queries
run_for_output 08_0450_execute_search_query.sh
run_for_output 08_0455_execute_vector_search_query.sh

cd - || true
