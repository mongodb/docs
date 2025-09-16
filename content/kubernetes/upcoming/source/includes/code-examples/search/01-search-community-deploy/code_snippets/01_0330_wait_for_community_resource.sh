echo "Waiting for MongoDBCommunity resource to reach Running phase..."
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait \
  --for=jsonpath='{.status.phase}'=Running mdbc/mdbc-rs --timeout=400s
