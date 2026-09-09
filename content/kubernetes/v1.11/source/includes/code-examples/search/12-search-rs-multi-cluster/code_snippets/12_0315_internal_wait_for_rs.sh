echo "Waiting for the multi-cluster MongoDB replica set to be ready..."
echo "This may take several minutes..."

kubectl wait --for=jsonpath='{.status.phase}'=Running \
  mdbmc/"${MDB_RESOURCE_NAME}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX_0}" \
  --timeout=1500s

echo "[ok] MongoDBMultiCluster replica set is Running"

echo ""
echo "Replica set StatefulSets per member cluster:"
for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
  echo "== ${ctx} =="
  kubectl get statefulsets -n "${MDB_NS}" --context "${ctx}"
done
