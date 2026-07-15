kubectl --context "${K8S_CTX}" -n "${MDB_NS}" rollout status --timeout=2m deployment/mongodb-kubernetes-operator
echo "Operator deployment in ${MDB_NS} namespace"
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get deployments
echo; echo "Operator pod in ${MDB_NS} namespace"
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get pods
