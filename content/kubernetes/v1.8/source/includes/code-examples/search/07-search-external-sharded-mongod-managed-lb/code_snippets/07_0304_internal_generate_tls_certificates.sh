echo "Generating TLS certificates for MongoDB..."

# --- Shard 0 ---
echo "Creating certificate for shard ${MDB_EXTERNAL_CLUSTER_NAME}-0..."
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-0-cert
spec:
  secretName: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-0-cert
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - "*.${MDB_EXTERNAL_CLUSTER_NAME}-sh.${MDB_NS}.svc.cluster.local"
    - "*.${MDB_EXTERNAL_DOMAIN}"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  [ok] Certificate requested for shard ${MDB_EXTERNAL_CLUSTER_NAME}-0"

# --- Shard 1 ---
echo "Creating certificate for shard ${MDB_EXTERNAL_CLUSTER_NAME}-1..."
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-1-cert
spec:
  secretName: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-1-cert
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - "*.${MDB_EXTERNAL_CLUSTER_NAME}-sh.${MDB_NS}.svc.cluster.local"
    - "*.${MDB_EXTERNAL_DOMAIN}"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  [ok] Certificate requested for shard ${MDB_EXTERNAL_CLUSTER_NAME}-1"

# --- Config servers ---
echo "Creating config server certificate..."
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-config-cert
spec:
  secretName: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-config-cert
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - "*.${MDB_EXTERNAL_CLUSTER_NAME}-cs.${MDB_NS}.svc.cluster.local"
    - "*.${MDB_EXTERNAL_DOMAIN}"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  [ok] Certificate requested for config servers"

# --- Mongos ---
echo "Creating mongos certificate..."
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-mongos-cert
spec:
  secretName: ${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}-mongos-cert
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - "*.${MDB_EXTERNAL_DOMAIN}"
    - "*.${MDB_EXTERNAL_CLUSTER_NAME}-svc.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
echo "  [ok] Certificate requested for mongos"

# Wait for all certificates
echo ""
echo "Waiting for all certificates to be ready..."
CERT_PFX="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_EXTERNAL_CLUSTER_NAME}"
kubectl wait --for=condition=Ready \
  certificate/"${CERT_PFX}-0-cert" \
  -n "${MDB_NS}" --context "${K8S_CTX}" \
  --timeout=60s
kubectl wait --for=condition=Ready \
  certificate/"${CERT_PFX}-1-cert" \
  -n "${MDB_NS}" --context "${K8S_CTX}" \
  --timeout=60s
kubectl wait --for=condition=Ready \
  certificate/"${CERT_PFX}-config-cert" \
  -n "${MDB_NS}" --context "${K8S_CTX}" \
  --timeout=60s
kubectl wait --for=condition=Ready \
  certificate/"${CERT_PFX}-mongos-cert" \
  -n "${MDB_NS}" --context "${K8S_CTX}" \
  --timeout=60s

echo "[ok] All MongoDB TLS certificates created"
