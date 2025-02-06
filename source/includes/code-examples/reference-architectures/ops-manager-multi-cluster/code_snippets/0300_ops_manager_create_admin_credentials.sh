kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" --namespace "${OM_NAMESPACE}" create secret generic om-admin-user-credentials \
  --from-literal=Username="admin" \
  --from-literal=Password="Passw0rd@" \
  --from-literal=FirstName="Jane" \
  --from-literal=LastName="Doe"
