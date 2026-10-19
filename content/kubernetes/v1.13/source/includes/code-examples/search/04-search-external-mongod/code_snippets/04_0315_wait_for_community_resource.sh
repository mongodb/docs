echo "Waiting for MongoDBCommunity resource to reach Running phase..."

kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait --for=jsonpath='{.status.phase}'=Running mdbc/"${MDB_RESOURCE_NAME}" --timeout=400s

echo; echo "MongoDBCommunity resource"
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get mdbc/"${MDB_RESOURCE_NAME}"

echo; echo "Pods running in cluster ${K8S_CTX}"
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get pods
