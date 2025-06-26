echo "Waiting for Application Database to reach Pending phase..."
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" wait --for=jsonpath='{.status.applicationDatabase.phase}'=Pending opsmanager/om --timeout=30s
