# Namespace in which Ops Manager and AppDB will be deployed
export OM_NAMESPACE="mongodb-om"
# Namespace in which the operator will be installed
export OPERATOR_NAMESPACE="mongodb-operator"
# Namespace in which MongoDB resources will be deployed
export MDB_NAMESPACE="mongodb"

# comma-separated key=value pairs for additional parameters passed to the helm-chart installing the operator
export OPERATOR_ADDITIONAL_HELM_VALUES="${OPERATOR_ADDITIONAL_HELM_VALUES:-""}"

export OFFICIAL_OPERATOR_HELM_CHART="mongodb/enterprise-operator"
export OPERATOR_HELM_CHART="${OPERATOR_HELM_CHART:-${OFFICIAL_OPERATOR_HELM_CHART}}"
