echo "Generating TLS certificates for the MongoDB sharded cluster..."

for component in "${MDB_SHARD_0_NAME}" "${MDB_SHARD_1_NAME}" "${MDB_SHARD_2_NAME}" \
  "${MDB_RESOURCE_NAME}-config" "${MDB_RESOURCE_NAME}-mongos"; do
  cert_name="${MDB_TLS_CERT_SECRET_PREFIX}-${component}-cert"
  echo "Creating certificate ${cert_name}..."
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

echo ""
echo "Waiting for certificates to be ready..."
for component in "${MDB_SHARD_0_NAME}" "${MDB_SHARD_1_NAME}" "${MDB_SHARD_2_NAME}" \
  "${MDB_RESOURCE_NAME}-config" "${MDB_RESOURCE_NAME}-mongos"; do
  kubectl wait --for=condition=Ready certificate/"${MDB_TLS_CERT_SECRET_PREFIX}-${component}-cert" \
    -n "${MDB_NS}" \
    --context "${K8S_CTX_0}" \
    --timeout=60s
done

echo "[ok] MongoDB sharded cluster TLS certificates created"
