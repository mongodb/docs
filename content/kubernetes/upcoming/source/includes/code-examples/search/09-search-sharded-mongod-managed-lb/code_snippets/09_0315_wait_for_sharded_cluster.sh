echo "Waiting for MongoDB sharded cluster to be ready..."
echo "This may take several minutes..."

kubectl wait --for=jsonpath='{.status.phase}'=Running \
  mongodb/"${MDB_RESOURCE_NAME}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=900s

echo "[ok] MongoDB sharded cluster is Running"

echo ""
echo "Cluster pods:"
kubectl get pods -n "${MDB_NS}" --context "${K8S_CTX}" \
  -l "app=${MDB_RESOURCE_NAME}-shard" --no-headers
kubectl get pods -n "${MDB_NS}" --context "${K8S_CTX}" \
  -l "app=${MDB_RESOURCE_NAME}-config" --no-headers
kubectl get pods -n "${MDB_NS}" --context "${K8S_CTX}" \
  -l "app=${MDB_RESOURCE_NAME}-mongos" --no-headers
