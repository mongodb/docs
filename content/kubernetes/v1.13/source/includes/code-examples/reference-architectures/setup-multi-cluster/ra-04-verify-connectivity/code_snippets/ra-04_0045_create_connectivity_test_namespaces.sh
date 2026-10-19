kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create namespace "connectivity-test"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" label namespace "connectivity-test" istio-injection=enabled --overwrite

kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" create namespace "connectivity-test"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" label namespace "connectivity-test" istio-injection=enabled --overwrite

kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" create namespace "connectivity-test"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" label namespace "connectivity-test" istio-injection=enabled --overwrite
