echo "WARNING: This will delete namespace '${MDB_NS}' and all its resources in every member cluster."
echo ""

for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
  echo "Deleting namespace '${MDB_NS}' in ${ctx}..."
  kubectl delete namespace "${MDB_NS}" --context "${ctx}" --wait=false
done

echo ""
echo "Namespace deletion initiated."
echo "Resources may take a few minutes to fully terminate."
echo ""
echo "To monitor cleanup progress:"
echo "  kubectl get pods -n ${MDB_NS} --context ${K8S_CTX_0} --watch"
