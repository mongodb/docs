for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
  echo "== ${ctx} =="
  echo "Pods in namespace '${MDB_NS}':"
  echo ""

  kubectl get pods -n "${MDB_NS}" --context "${ctx}" -o wide

  echo ""
  echo "Services in namespace '${MDB_NS}':"
  kubectl get services -n "${MDB_NS}" --context "${ctx}"
  echo ""
done

echo "MongoDBSearch resources:"
kubectl get mongodbsearch -n "${MDB_NS}" --context "${K8S_CTX_0}"
