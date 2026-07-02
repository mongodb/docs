echo "Creating TLS certificates for MongoDB Search" \
  "(mongot) pods..."

# --- Shard 0 mongot certificate (2 replicas) ---
CERT_PFX="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}"
SHARD0_CERT="${CERT_PFX}-search-0-${MDB_EXTERNAL_SHARD_0_NAME}-cert"
echo "  Creating certificate: ${SHARD0_CERT}"
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" \
  -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${SHARD0_CERT}
spec:
  secretName: ${SHARD0_CERT}
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - ${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_0_NAME}-0.${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_0_NAME}-svc.${MDB_NS}.svc.cluster.local
    - ${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_0_NAME}-1.${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_0_NAME}-svc.${MDB_NS}.svc.cluster.local
    - "*.${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_0_NAME}-svc.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  Certificate requested: ${SHARD0_CERT}"

# --- Shard 1 mongot certificate (2 replicas) ---
SHARD1_CERT="${CERT_PFX}-search-0-${MDB_EXTERNAL_SHARD_1_NAME}-cert"
echo "  Creating certificate: ${SHARD1_CERT}"
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" \
  -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${SHARD1_CERT}
spec:
  secretName: ${SHARD1_CERT}
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - ${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_1_NAME}-0.${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_1_NAME}-svc.${MDB_NS}.svc.cluster.local
    - ${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_1_NAME}-1.${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_1_NAME}-svc.${MDB_NS}.svc.cluster.local
    - "*.${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_1_NAME}-svc.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  Certificate requested: ${SHARD1_CERT}"

echo "Waiting for mongot certificates to be ready..."
kubectl wait \
  --for=condition=Ready \
  certificate/"${SHARD0_CERT}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=60s
kubectl wait \
  --for=condition=Ready \
  certificate/"${SHARD1_CERT}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=60s

echo "All MongoDB Search (mongot) TLS certificates" \
  "created"
