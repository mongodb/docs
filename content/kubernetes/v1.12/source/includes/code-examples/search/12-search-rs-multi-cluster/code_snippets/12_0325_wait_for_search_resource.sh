echo "Waiting for MongoDBSearch to be ready..."
echo "This may take several minutes while mongot syncs data..."

kubectl wait --for=jsonpath='{.status.phase}'=Running \
  mongodbsearch/"${MDB_SEARCH_RESOURCE_NAME}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX_0}" \
  --timeout=900s

echo "[ok] MongoDBSearch '${MDB_SEARCH_RESOURCE_NAME}' is Running"

echo ""
echo "MongoDBSearch pods per member cluster:"
ci=0
for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
  echo "== ${ctx} =="
  kubectl get pods -n "${MDB_NS}" --context "${ctx}" \
    -l "app=${MDB_SEARCH_RESOURCE_NAME}-search-${ci}-svc"
  ci=$((ci + 1))
done
