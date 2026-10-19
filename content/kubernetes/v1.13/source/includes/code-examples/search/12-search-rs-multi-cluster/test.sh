#!/usr/bin/env bash
# Test runner script for MongoDB Search with a multi-cluster (MongoDBMultiCluster)
# replica set source + per-cluster managed Envoy LB
#
# This script executes all code snippets in order to test the full deployment flow.
# It can be run manually or as part of automated E2E testing.
#
# Usage:
#   source env_variables.sh
#   source env_variables_internal.sh
#   ./test.sh
#
# For E2E testing, env_variables_e2e_private.sh is sourced automatically
# by the test runner.

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")
project_dir="${script_dir}/../../.."

source "${project_dir}/scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}" || exit 1

prepare_snippets

# ============================================================================
# PREREQUISITES
# ============================================================================

run 12_0040_validate_env.sh
run 12_0045_create_namespaces.sh
run 12_0046_internal_create_image_pull_secrets.sh

run_for_output 12_0100_install_operator.sh

# Ops Manager resources (for the simulated external cluster)
run 12_0300_internal_create_ops_manager_resources.sh

# ============================================================================
# TLS CONFIGURATION
# ============================================================================

run_for_output 12_0301_install_cert_manager.sh
run 12_0302_internal_configure_tls_prerequisites.sh
run 12_0302a_internal_configure_tls_prerequisites_mongod.sh
run 12_0304_internal_generate_tls_certificates.sh

# ============================================================================
# SIMULATED EXTERNAL MULTI-CLUSTER MONGODB REPLICA SET
# ============================================================================

# Create simulated external multi-cluster replica set
run 12_0310_internal_create_mongodb_mc_rs.sh
run_for_output 12_0315_internal_wait_for_rs.sh

# Create users AFTER the cluster is ready (MongoDBUser CRDs reference it)
run 12_0315a_internal_create_mongodb_users.sh
run 12_0316_create_search_sync_secret.sh

# ============================================================================
# MONGODB SEARCH WITH PER-CLUSTER MANAGED ENVOY LB
# ============================================================================

# Create TLS certificates for mongot pods
run 12_0316a_create_mongot_tls_certificates.sh

# Create TLS certificates for the managed load balancer (Envoy)
run 12_0316b_create_lb_tls_certificates.sh

# Replicate the Search Secrets to the member clusters (the operator does not)
run 12_0317_replicate_search_secrets.sh

# Create MongoDBSearch with the external multi-cluster source
run 12_0320_create_mongodb_search_resource.sh
run_for_output 12_0325_wait_for_search_resource.sh

# ============================================================================
# VERIFICATION
# ============================================================================

# Verify the per-cluster mongot StatefulSets and operator-managed Envoys
run_for_output 12_0326_internal_verify_envoy_deployment.sh

# Show all running pods
run_for_output 12_0330_show_running_pods.sh

echo "To clean up, run: ./code_snippets/12_9010_internal_delete_namespace.sh"

cd - || true
