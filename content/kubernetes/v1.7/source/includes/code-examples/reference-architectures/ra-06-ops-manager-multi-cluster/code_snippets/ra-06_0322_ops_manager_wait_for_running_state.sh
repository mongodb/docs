echo "Waiting for Application Database to reach Running phase..."
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" wait --for=jsonpath='{.status.applicationDatabase.phase}'=Running opsmanager/om --timeout=600s
echo; echo "Waiting for Ops Manager to reach Running phase..."
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" wait --for=jsonpath='{.status.opsManager.phase}'=Running opsmanager/om --timeout=600s
echo; echo "MongoDBOpsManager resource"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" get opsmanager/om
echo; echo "Pods running in cluster ${K8S_CLUSTER_0_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" get pods
echo; echo "Pods running in cluster ${K8S_CLUSTER_1_CONTEXT_NAME}"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "${OM_NAMESPACE}" get pods
