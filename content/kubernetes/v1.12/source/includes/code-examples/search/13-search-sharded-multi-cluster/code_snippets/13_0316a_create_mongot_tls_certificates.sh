echo "Creating TLS certificates for MongoDB Search (mongot) pods..."

for ci in 0 1; do
  for shard_name in "${MDB_EXTERNAL_SHARD_0_NAME}" "${MDB_EXTERNAL_SHARD_1_NAME}" "${MDB_EXTERNAL_SHARD_2_NAME}"; do
    cert_name="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-${ci}-${shard_name}-cert"
    echo "  Creating certificate: ${cert_name}"
    kubectl apply --context "${K8S_CTX_0}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${cert_name}
spec:
  secretName: ${cert_name}
  duration: 8760h
  renewBefore: 720h
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
    - client auth
  dnsNames:
    - "*.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
    echo "  [ok] Certificate requested: ${cert_name}"
  done
done

echo "Waiting for mongot certificates to be ready..."
for ci in 0 1; do
  for shard_name in "${MDB_EXTERNAL_SHARD_0_NAME}" "${MDB_EXTERNAL_SHARD_1_NAME}" "${MDB_EXTERNAL_SHARD_2_NAME}"; do
    kubectl wait --for=condition=Ready \
      certificate/"${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-${ci}-${shard_name}-cert" \
      -n "${MDB_NS}" \
      --context "${K8S_CTX_0}" \
      --timeout=60s
  done
done

echo "[ok] All MongoDB Search (mongot) TLS certificates created"
