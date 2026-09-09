echo "Waiting for MongoDB replica set to be ready..."
echo "This may take several minutes..."

kubectl wait --for=jsonpath='{.status.phase}'=Running \
  mongodb/"${MDB_RESOURCE_NAME}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=900s

echo "[ok] MongoDB replica set is Running"

echo ""
echo "Replica set pods:"
kubectl get pods -n "${MDB_NS}" --context "${K8S_CTX}" \
  -l "app=${MDB_RESOURCE_NAME}-svc" --no-headers
