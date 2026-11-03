# E2E Test Environment Overrides (Enterprise with Ops Manager)
#
# This file is sourced by the test runner to override environment variables
# for automated E2E testing. Do not use this file for manual testing.
# NOTE: This uses the enterprise context with cloud-qa Ops Manager.

source "${PROJECT_DIR}/scripts/funcs/operator_deployment"
source "${PROJECT_DIR}/scripts/dev/contexts/e2e_mdb_kind_ubi_cloudqa"

# K8S_CTX must be set after sourcing e2e_mdb_kind_ubi_cloudqa which sets CLUSTER_NAME
export K8S_CTX="${CLUSTER_NAME}"

OPERATOR_ADDITIONAL_HELM_VALUES="$(get_operator_helm_values | tr ' ' ',')"
export OPERATOR_ADDITIONAL_HELM_VALUES
export OPERATOR_HELM_CHART="${PROJECT_DIR}/helm_chart"

# we need project name with a timestamp (NAMESPACE in evg is randomized) to allow for cloud-qa cleanups
# NOTE: This snippet uses MDB_EXTERNAL_CLUSTER_NAME instead of MDB_RESOURCE_NAME
export OPS_MANAGER_PROJECT_NAME="${NAMESPACE}-${MDB_EXTERNAL_CLUSTER_NAME}"
export OPS_MANAGER_API_URL="${OM_BASE_URL}"
export OPS_MANAGER_API_USER="${OM_USER}"
export OPS_MANAGER_API_KEY="${OM_API_KEY}"
export OPS_MANAGER_ORG_ID="${OM_ORGID}"
