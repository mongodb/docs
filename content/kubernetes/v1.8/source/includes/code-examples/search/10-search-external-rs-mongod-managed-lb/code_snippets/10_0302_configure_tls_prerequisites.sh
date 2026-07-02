echo "Configuring TLS prerequisites..."

kubectl apply --context "${K8S_CTX}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: ${MDB_TLS_SELF_SIGNED_ISSUER}
spec:
  selfSigned: {}
EOF

echo "  [ok] Self-signed ClusterIssuer created"

kubectl apply --context "${K8S_CTX}" -n "${CERT_MANAGER_NAMESPACE}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CA_CERT_NAME}
spec:
  isCA: true
  commonName: mongodb-ca
  secretName: ${MDB_TLS_CA_SECRET_NAME}
  duration: 87600h  # 10 years
  renewBefore: 8760h  # 1 year
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: ${MDB_TLS_SELF_SIGNED_ISSUER}
    kind: ClusterIssuer
EOF

echo "  [ok] CA Certificate requested"

echo "  Waiting for CA certificate..."
kubectl wait --for=condition=Ready certificate/"${MDB_TLS_CA_CERT_NAME}" \
  -n "${CERT_MANAGER_NAMESPACE}" \
  --context "${K8S_CTX}" \
  --timeout=60s

kubectl apply --context "${K8S_CTX}" -n "${CERT_MANAGER_NAMESPACE}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: ${MDB_TLS_CA_ISSUER}
spec:
  ca:
    secretName: ${MDB_TLS_CA_SECRET_NAME}
EOF

echo "  [ok] CA Issuer created"

echo "  Distributing CA certificate to namespace '${MDB_NS}'..."

ca_tmp="/tmp/ca-cert.pem"

kubectl get secret "${MDB_TLS_CA_SECRET_NAME}" \
  -n "${CERT_MANAGER_NAMESPACE}" \
  --context "${K8S_CTX}" \
  -o jsonpath='{.data.tls\.crt}' | base64 -d > "${ca_tmp}"

kubectl create configmap "${MDB_TLS_CA_CONFIGMAP}" \
  --from-file=ca-pem="${ca_tmp}" \
  --from-file=mms-ca.crt="${ca_tmp}" \
  --from-file=ca.crt="${ca_tmp}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --dry-run=client -o yaml | kubectl apply --context "${K8S_CTX}" -f -

kubectl create secret generic "${MDB_TLS_CA_SECRET_NAME}" \
  --from-file=ca.crt="${ca_tmp}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --dry-run=client -o yaml | kubectl apply --context "${K8S_CTX}" -f -

rm -f "${ca_tmp}"

echo "[ok] TLS prerequisites configured"
