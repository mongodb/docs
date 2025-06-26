helm upgrade --install \
  --debug \
  --kube-context "${K8S_CLUSTER_0_CONTEXT_NAME}" \
  mongodb-enterprise-operator-multi-cluster \
  "${OPERATOR_HELM_CHART}" \
  --namespace="${OPERATOR_NAMESPACE}" \
  --set namespace="${OPERATOR_NAMESPACE}" \
  --set operator.namespace="${OPERATOR_NAMESPACE}" \
  --set operator.watchNamespace="${OM_NAMESPACE}\,${MDB_NAMESPACE}" \
  --set operator.name=mongodb-enterprise-operator-multi-cluster \
  --set operator.createOperatorServiceAccount=false \
  --set operator.createResourcesServiceAccountsAndRoles=false \
  --set "multiCluster.clusters={${K8S_CLUSTER_0_CONTEXT_NAME},${K8S_CLUSTER_1_CONTEXT_NAME},${K8S_CLUSTER_2_CONTEXT_NAME}}" \
  --set "${OPERATOR_ADDITIONAL_HELM_VALUES:-"dummy=value"}" \
  --set operator.env=dev
