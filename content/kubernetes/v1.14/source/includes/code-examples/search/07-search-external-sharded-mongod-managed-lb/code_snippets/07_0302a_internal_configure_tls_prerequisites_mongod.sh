echo "Configuring CA certificate (ConfigMap) for mongod..."

ca_pem=$(kubectl get secret "${MDB_TLS_CA_SECRET_NAME}" \
  -n "${CERT_MANAGER_NAMESPACE}" \
  --context "${K8S_CTX}" \
  -o jsonpath='{.data.tls\.crt}' | base64 -d)

kubectl create configmap "${MDB_TLS_CA_CONFIGMAP}" \
  --from-literal=ca-pem="${ca_pem}" \
  --from-literal=ca.crt="${ca_pem}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --dry-run=client -o yaml | kubectl apply --context "${K8S_CTX}" -f -

echo "[ok] CA ConfigMap configured for mongod"
