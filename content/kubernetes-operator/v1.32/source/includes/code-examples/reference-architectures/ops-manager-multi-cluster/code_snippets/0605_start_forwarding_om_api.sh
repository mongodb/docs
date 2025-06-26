kubectl port-forward --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" svc/om-svc 8443:8443 &
sleep 3
