echo "Nodes in cluster ${K8S_CLUSTER_0_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" get nodes
echo; echo "Nodes in cluster ${K8S_CLUSTER_1_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" get nodes
echo; echo "Nodes in cluster ${K8S_CLUSTER_2_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" get nodes
