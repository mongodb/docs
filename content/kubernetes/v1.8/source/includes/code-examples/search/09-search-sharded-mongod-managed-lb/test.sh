#!/usr/bin/env bash
# Test runner script for MongoDB Search with Operator-Managed Sharded MongoDB + Managed Envoy LB
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

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")
project_dir="${script_dir}/../../.."

source "${project_dir}/scripts/code_snippets/sample_test_runner.sh"

cd "${script_dir}" || exit 1

prepare_snippets

# ============================================================================
# PREREQUISITES
# ============================================================================

run 09_0040_validate_env.sh
run 09_0045_create_namespaces.sh
run 09_0046_create_image_pull_secrets.sh

run_for_output 09_0100_install_operator.sh

# Ops Manager resources (for operator-managed cluster)
run 09_0300_create_ops_manager_resources.sh

# ============================================================================
# TLS CONFIGURATION
# ============================================================================

run_for_output 09_0301_install_cert_manager.sh
run 09_0302_configure_tls_prerequisites.sh
run 09_0302a_configure_tls_prerequisites_mongod.sh
run 09_0302b_configure_tls_prerequisites_mongot.sh
run 09_0304_generate_tls_certificates.sh

# ============================================================================
# OPERATOR-MANAGED MONGODB SHARDED CLUSTER
# ============================================================================

# Create operator-managed MongoDB sharded cluster (no search params needed)
run 09_0310_create_mongodb_sharded_cluster.sh
run_for_output 09_0315_wait_for_sharded_cluster.sh

# Create users AFTER cluster is ready (MongoDBUser CRDs reference the cluster)
run 09_0316_create_mongodb_users.sh

# ============================================================================
# MONGODB SEARCH WITH MANAGED ENVOY LB
# ============================================================================

# Create TLS certificates for mongot pods
run 09_0316a_create_mongot_tls_certificates.sh

# Create TLS certificates for managed load balancer (Envoy)
run 09_0316b_create_lb_tls_certificates.sh

# Create MongoDBSearch with loadBalancer.managed
# NOTE: No Envoy deployment script - the operator handles this automatically!
run 09_0320_create_mongodb_search_resource.sh
run_for_output 09_0325_wait_for_search_resource.sh

# ============================================================================
# VERIFICATION
# ============================================================================

# Verify operator-managed Envoy is deployed
run_for_output 09_0326_internal_verify_envoy_deployment.sh

# Show all running pods
run_for_output 09_0330_show_running_pods.sh

cd - || true
