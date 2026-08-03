for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
  kubectl create namespace "${MDB_NS}" --context "${ctx}" --dry-run=client -o yaml | \
    kubectl apply --context "${ctx}" -f -
  kubectl label namespace "${MDB_NS}" istio-injection=enabled --overwrite --context "${ctx}"
done

echo "[ok] Namespace '${MDB_NS}' ready in every member cluster"
