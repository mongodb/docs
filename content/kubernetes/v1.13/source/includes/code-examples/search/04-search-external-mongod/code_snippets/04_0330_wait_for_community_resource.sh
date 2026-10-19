echo "Waiting for MongoDBCommunity resource to reach Running phase..."
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait \
  --for=jsonpath='{.status.phase}'=Running mdbc/"${MDB_RESOURCE_NAME}" --timeout=400s

kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait --for=jsonpath='{.status.phase}'=Running mdbc/"${MDB_RESOURCE_NAME}" --timeout=400s
