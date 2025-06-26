echo; echo "Waiting for MongoDB to reach Running phase..."
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" wait --for=jsonpath='{.status.phase}'=Running "mdb/${RESOURCE_NAME}" --timeout=900s
echo; echo "Pods running in cluster ${K8S_CLUSTER_0_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" get pods
echo; echo "Pods running in cluster ${K8S_CLUSTER_1_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" get pods
echo; echo "Pods running in cluster ${K8S_CLUSTER_2_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" get pods
