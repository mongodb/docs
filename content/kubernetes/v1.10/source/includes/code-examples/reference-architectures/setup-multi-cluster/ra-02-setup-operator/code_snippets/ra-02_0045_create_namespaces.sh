kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create namespace "${OPERATOR_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" create namespace "${OPERATOR_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" create namespace "${OPERATOR_NAMESPACE}"

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create namespace "${OM_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" create namespace "${OM_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" create namespace "${OM_NAMESPACE}"

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create namespace "${MDB_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" create namespace "${MDB_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" create namespace "${MDB_NAMESPACE}"
