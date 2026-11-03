echo "Waiting for MongoDBSearch resource to reach Running phase..."
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait --for=jsonpath='{.status.phase}'=Running "mdbs/${MDB_RESOURCE_NAME}" --timeout=300s
