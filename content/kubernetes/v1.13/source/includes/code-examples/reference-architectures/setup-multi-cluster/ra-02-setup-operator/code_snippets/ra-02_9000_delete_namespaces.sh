kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete ns "${OM_NAMESPACE}" &
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" delete ns "${OM_NAMESPACE}" &
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" delete ns "${OM_NAMESPACE}" &

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete ns "${OPERATOR_NAMESPACE}" &
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" delete ns "${OPERATOR_NAMESPACE}" &
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" delete ns "${OPERATOR_NAMESPACE}" &

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete ns "${MDB_NAMESPACE}" &
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" delete ns "${MDB_NAMESPACE}" &
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" delete ns "${MDB_NAMESPACE}" &
wait
