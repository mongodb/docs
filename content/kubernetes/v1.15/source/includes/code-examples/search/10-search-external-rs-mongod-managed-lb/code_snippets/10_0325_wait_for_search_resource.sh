echo "Waiting for MongoDBSearch to be ready..."
echo "This may take several minutes while mongot syncs data..."

kubectl wait --for=jsonpath='{.status.phase}'=Running \
  mongodbsearch/"${MDB_SEARCH_RESOURCE_NAME}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=600s

echo "[ok] MongoDBSearch '${MDB_SEARCH_RESOURCE_NAME}' is Running"

echo ""
echo "MongoDBSearch pods:"
kubectl get pods -n "${MDB_NS}" --context "${K8S_CTX}" \
  -l "app.kubernetes.io/component=mongot"
