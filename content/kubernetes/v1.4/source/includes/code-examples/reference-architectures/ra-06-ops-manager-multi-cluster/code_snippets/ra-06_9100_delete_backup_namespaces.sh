kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete ns "minio-operator" &
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete ns "tenant-tiny" &
wait
