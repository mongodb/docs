kubectl mongodb multicluster setup \
  --central-cluster="${K8S_CLUSTER_0_CONTEXT_NAME}" \
  --member-clusters="${K8S_CLUSTER_0_CONTEXT_NAME},${K8S_CLUSTER_1_CONTEXT_NAME},${K8S_CLUSTER_2_CONTEXT_NAME}" \
  --member-cluster-namespace="${OM_NAMESPACE}" \
  --central-cluster-namespace="${OPERATOR_NAMESPACE}" \
  --create-service-account-secrets \
  --install-database-roles=true \
  --image-pull-secrets=image-registries-secret

kubectl mongodb multicluster setup \
  --central-cluster="${K8S_CLUSTER_0_CONTEXT_NAME}" \
  --member-clusters="${K8S_CLUSTER_0_CONTEXT_NAME},${K8S_CLUSTER_1_CONTEXT_NAME},${K8S_CLUSTER_2_CONTEXT_NAME}" \
  --member-cluster-namespace="${MDB_NAMESPACE}" \
  --central-cluster-namespace="${OPERATOR_NAMESPACE}" \
  --create-service-account-secrets \
  --install-database-roles=true \
  --image-pull-secrets=image-registries-secret

