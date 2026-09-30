echo "WARNING: This will delete namespace '${MDB_NS}' and all its resources."
echo ""

read -rp "Are you sure you want to continue? (yes/no): " confirm

if [[ "${confirm}" != "yes" ]]; then
  echo "Cleanup cancelled."
else
  echo "Deleting namespace '${MDB_NS}'..."

  kubectl delete namespace "${MDB_NS}" --context "${K8S_CTX}" --wait=false

  echo ""
  echo "Namespace deletion initiated."
  echo "Resources may take a few minutes to fully terminate."
  echo ""
  echo "To monitor cleanup progress:"
  echo "  kubectl get pods -n ${MDB_NS} --context ${K8S_CTX} --watch"
fi
