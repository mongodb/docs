echo "Waiting for MongoDBSearch to be ready..."
echo "This may take several minutes while mongot syncs data..."

kubectl wait --for=jsonpath='{.status.phase}'=Running \
  mongodbsearch/"${MDB_RESOURCE_NAME}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=600s

echo "[ok] MongoDBSearch '${MDB_RESOURCE_NAME}' is Running"

echo ""
echo "MongoDBSearch pods:"
for shard_name in "${MDB_SHARD_0_NAME}" "${MDB_SHARD_1_NAME}"; do
  kubectl get pods -n "${MDB_NS}" --context "${K8S_CTX}" \
    -l "app=${MDB_RESOURCE_NAME}-search-0-${shard_name}"
done
