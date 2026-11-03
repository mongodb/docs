helm upgrade --install --debug --kube-context "${K8S_CTX}" \
  --create-namespace \
  --namespace="${MDB_NS}" \
  mongodb-kubernetes \
  ${OPERATOR_ADDITIONAL_HELM_VALUES:+--set ${OPERATOR_ADDITIONAL_HELM_VALUES}} \
  "${OPERATOR_HELM_CHART}"
