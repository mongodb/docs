kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create namespace "${OPERATOR_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" label namespace "${OPERATOR_NAMESPACE}" istio-injection=enabled --overwrite

kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" create namespace "${OPERATOR_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" label namespace "${OPERATOR_NAMESPACE}" istio-injection=enabled --overwrite

kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" create namespace "${OPERATOR_NAMESPACE}"
kubectl --context "${K8S_CLUSTER_3_CONTEXT_NAME}" label namespace "${OPERATOR_NAMESPACE}" istio-injection=enabled --overwrite
