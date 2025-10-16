echo "Waiting for MongoDBSearch resource to reach Running phase..."
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait \
  --for=jsonpath='{.status.phase}'=Running mdbs/mdbs --timeout=300s
