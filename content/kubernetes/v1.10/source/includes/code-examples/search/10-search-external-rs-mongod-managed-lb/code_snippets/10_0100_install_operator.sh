echo "Installing MongoDB Kubernetes Operator..."

helm upgrade --install mongodb-kubernetes-operator "${OPERATOR_HELM_CHART}" \
  --namespace "${MDB_NS}" \
  --kube-context "${K8S_CTX}" \
  --wait \
  --timeout 5m \
  ${OPERATOR_ADDITIONAL_HELM_VALUES:+--set ${OPERATOR_ADDITIONAL_HELM_VALUES}}

kubectl rollout status deployment/mongodb-kubernetes-operator \
  --namespace "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=120s

echo "[ok] MongoDB Kubernetes Operator installed and ready"
