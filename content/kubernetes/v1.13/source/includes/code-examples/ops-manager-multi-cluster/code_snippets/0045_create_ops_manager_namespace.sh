kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create namespace "${NAMESPACE}"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" label namespace "${NAMESPACE}" istio-injection=enabled --overwrite

kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" create namespace "${NAMESPACE}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" label namespace "${NAMESPACE}" istio-injection=enabled --overwrite

kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" create namespace "${NAMESPACE}"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" label namespace "${NAMESPACE}" istio-injection=enabled --overwrite
