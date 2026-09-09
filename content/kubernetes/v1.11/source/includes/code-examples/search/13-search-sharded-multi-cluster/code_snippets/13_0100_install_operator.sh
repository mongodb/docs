echo "Configuring multi-cluster service accounts and roles..."

kubectl mongodb multicluster setup \
  --central-cluster="${K8S_CTX_0}" \
  --member-clusters="${K8S_CTX_0},${K8S_CTX_1}" \
  --member-cluster-namespace="${MDB_NS}" \
  --central-cluster-namespace="${MDB_NS}" \
  --create-service-account-secrets \
  --install-database-roles=true \
  ${IMAGE_PULL_SECRET_NAME:+--image-pull-secrets="${IMAGE_PULL_SECRET_NAME}"}

echo "[ok] Multi-cluster service accounts and roles configured"

echo "Installing the operator in multi-cluster mode..."

helm upgrade --install --debug --kube-context "${K8S_CTX_0}" \
  --create-namespace --namespace="${MDB_NS}" \
  mongodb-kubernetes-operator-multi-cluster \
  --set namespace="${MDB_NS}" \
  --set operator.namespace="${MDB_NS}" \
  --set operator.watchNamespace="${MDB_NS}" \
  --set operator.name=mongodb-kubernetes-operator-multi-cluster \
  --set operator.createOperatorServiceAccount=false \
  --set operator.createResourcesServiceAccountsAndRoles=false \
  --set "multiCluster.clusters={${K8S_CTX_0},${K8S_CTX_1}}" \
  ${OPERATOR_ADDITIONAL_HELM_VALUES:+--set ${OPERATOR_ADDITIONAL_HELM_VALUES}} \
  "${OPERATOR_HELM_CHART}"

kubectl --context "${K8S_CTX_0}" -n "${MDB_NS}" rollout status \
  --timeout=2m deployment/mongodb-kubernetes-operator-multi-cluster

echo "[ok] Operator installed in multi-cluster mode"
