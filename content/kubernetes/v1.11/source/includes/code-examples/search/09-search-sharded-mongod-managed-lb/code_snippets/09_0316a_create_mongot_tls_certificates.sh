echo "Creating TLS certificates for MongoDB Search (mongot) pods..."

# --- Shard 0 mongot certificate (2 replicas) ---
echo "  Creating certificate: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_0_NAME}-cert"
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_0_NAME}-cert
spec:
  secretName: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_0_NAME}-cert
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - "*.${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_0_NAME}-svc.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  [ok] Certificate requested: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_0_NAME}-cert"

# --- Shard 1 mongot certificate (2 replicas) ---
echo "  Creating certificate: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_1_NAME}-cert"
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_1_NAME}-cert
spec:
  secretName: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_1_NAME}-cert
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - "*.${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_1_NAME}-svc.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  [ok] Certificate requested: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_1_NAME}-cert"

echo "Waiting for mongot certificates to be ready..."
kubectl wait --for=condition=Ready certificate/"${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_0_NAME}-cert" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=60s
kubectl wait --for=condition=Ready certificate/"${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_1_NAME}-cert" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=60s

echo "[ok] All MongoDB Search (mongot) TLS certificates created"
