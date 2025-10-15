export K8S_CTX="${CLUSTER_NAME}"

source "${PROJECT_DIR}/scripts/funcs/operator_deployment"
source "${PROJECT_DIR}/scripts/dev/contexts/e2e_mdb_kind_ubi_cloudqa"
OPERATOR_ADDITIONAL_HELM_VALUES="$(get_operator_helm_values | tr ' ' ',')"
export OPERATOR_ADDITIONAL_HELM_VALUES
export OPERATOR_HELM_CHART="${PROJECT_DIR}/helm_chart"

# we need project name with a timestamp (NAMESPACE in evg is randomized) to allow for cloud-qa cleanups
export OPS_MANAGER_PROJECT_NAME="${NAMESPACE}-${MDB_RESOURCE_NAME}"
export OPS_MANAGER_API_URL="${OM_BASE_URL}"
export OPS_MANAGER_API_USER="${OM_USER}"
export OPS_MANAGER_API_KEY="${OM_API_KEY}"
export OPS_MANAGER_ORG_ID="${OM_ORGID}"
