kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete ns "external-dns" &
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" delete ns "external-dns" &
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" delete ns "external-dns" &
wait
