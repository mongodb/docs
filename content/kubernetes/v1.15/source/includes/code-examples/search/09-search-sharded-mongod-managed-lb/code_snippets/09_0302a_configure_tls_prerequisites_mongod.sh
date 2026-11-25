echo "Configuring CA certificate (ConfigMap) for mongod..."

mkdir -p certs

kubectl get secret "${MDB_TLS_CA_SECRET_NAME}" \
  -n "${CERT_MANAGER_NAMESPACE}" \
  --context "${K8S_CTX}" \
  -o jsonpath='{.data.tls\.crt}' | base64 -d > certs/ca-pem

kubectl create configmap "${MDB_TLS_CA_CONFIGMAP}" \
  --from-file=ca-pem=certs/ca-pem \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --dry-run=client -o yaml | kubectl apply --context "${K8S_CTX}" -f -

echo "[ok] CA ConfigMap configured for mongod"
