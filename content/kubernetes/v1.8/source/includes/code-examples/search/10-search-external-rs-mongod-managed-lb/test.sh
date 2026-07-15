#!/usr/bin/env bash
# Test runner script for MongoDB Search with External RS MongoDB + Managed Envoy LB
#
# This script executes all code snippets in order to test the full deployment flow.
# It can be run manually or as part of automated E2E testing.
#
# Usage:
#   ./test.sh                    # Run with env_variables.sh
#   ./test.sh env_variables.sh   # Explicit env file
#
# For E2E testing, env_variables_e2e_private.sh is sourced automatically
# when PROJECT_DIR and CLUSTER_NAME environment variables are set.

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")
project_dir="${script_dir}/../../.."

source "${project_dir}/scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}"

prepare_snippets

# ============================================================================
# PREREQUISITES
# ============================================================================

run 10_0040_validate_env.sh
run 10_0045_create_namespaces.sh
run 10_0046_internal_create_image_pull_secrets.sh

run_for_output 10_0100_install_operator.sh

# Ops Manager resources (for simulated external cluster)
run 10_0300_internal_create_ops_manager_resources.sh

# ============================================================================
# TLS CONFIGURATION
# ============================================================================

run_for_output 10_0301_install_cert_manager.sh
run 10_0302_configure_tls_prerequisites.sh
run 10_0304_internal_generate_tls_certificates.sh

# ============================================================================
# SIMULATED EXTERNAL MONGODB REPLICA SET
# ============================================================================

# Create simulated external MongoDB replica set (using Enterprise operator)
# Note: MongoDB is created WITH search config from the start (pointing to Envoy proxy endpoint)
run 10_0310_internal_create_external_mongodb_rs.sh
run_for_output 10_0315_internal_wait_for_external_cluster.sh

# Create users AFTER cluster is ready (MongoDBUser CRDs reference the cluster)
run 10_0316_internal_create_external_mongodb_users.sh

# ============================================================================
# MONGODB SEARCH WITH MANAGED ENVOY LB
# ============================================================================

# Create TLS certificates for mongot pods
run 10_0316a_create_mongot_tls_certificates.sh

# Create TLS certificates for managed load balancer (Envoy)
run 10_0316b_create_lb_tls_certificates.sh

# Create MongoDBSearch with loadBalancer.managed
# NOTE: No Envoy deployment script - the operator handles this automatically!
run 10_0320_create_mongodb_search_resource.sh
run_for_output 10_0325_wait_for_search_resource.sh

# ============================================================================
# VERIFICATION
# ============================================================================

# Verify operator-managed Envoy is deployed
run_for_output 10_0326_internal_verify_envoy_deployment.sh

# Show all running pods
run_for_output 10_0330_show_running_pods.sh

# ============================================================================
# DONE
# ============================================================================

echo ""
echo "============================================"
echo "MongoDB Search deployment complete!"
echo "============================================"
echo ""
echo "MongoDB Search is now running with:"
echo "  - External RS MongoDB source (simulated)"
echo "  - Managed Envoy L7 load balancer (operator-deployed)"
echo "  - ${MDB_MONGOT_REPLICAS:-1} mongot replicas"
echo ""
echo "To clean up, run: ./code_snippets/10_9010_internal_delete_namespace.sh"

cd -
