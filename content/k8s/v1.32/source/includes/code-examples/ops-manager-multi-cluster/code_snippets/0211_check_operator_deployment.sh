kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OPERATOR_NAMESPACE}" rollout status deployment/mongodb-enterprise-operator-multi-cluster
echo "Operator deployment in ${OPERATOR_NAMESPACE} namespace"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OPERATOR_NAMESPACE}" get deployments
echo; echo "Operator pod in ${OPERATOR_NAMESPACE} namespace"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OPERATOR_NAMESPACE}" get pods
