echo; echo "MongoDBSearch resource"
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get mdbs/mdbs
echo; echo "Search pods running in cluster ${K8S_CTX}"
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get pods -l app=mdbs-search-svc
echo; echo "All pods in namespace ${MDB_NS}"
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get pods
