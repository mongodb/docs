echo "Creating TLS certificates for managed load balancer (Envoy)..."

for ci in 0 1; do
  lb_server_cert="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-lb-${ci}-cert"
  lb_client_cert="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-lb-${ci}-client-cert"

  echo "Creating LB server certificate for cluster ${ci}..."
  kubectl apply --context "${K8S_CTX_0}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${lb_server_cert}
spec:
  secretName: ${lb_server_cert}
  duration: 8760h
  renewBefore: 720h
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - server auth
  dnsNames:
    - "*.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
  echo "  [ok] LB server certificate requested: ${lb_server_cert}"

  echo "Creating LB client certificate for cluster ${ci}..."
  kubectl apply --context "${K8S_CTX_0}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${lb_client_cert}
spec:
  secretName: ${lb_client_cert}
  duration: 8760h
  renewBefore: 720h
  privateKey:
    algorithm: RSA
    size: 2048
  usages:
    - client auth
  dnsNames:
    - "*.${MDB_NS}.svc.cluster.local"
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
EOF
  echo "  [ok] LB client certificate requested: ${lb_client_cert}"
done

echo "Waiting for LB certificates to be ready..."
for ci in 0 1; do
  lb_server_cert="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-lb-${ci}-cert"
  lb_client_cert="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-lb-${ci}-client-cert"
  kubectl wait --for=condition=Ready certificate/"${lb_server_cert}" \
    -n "${MDB_NS}" \
    --context "${K8S_CTX_0}" \
    --timeout=60s
  kubectl wait --for=condition=Ready certificate/"${lb_client_cert}" \
    -n "${MDB_NS}" \
    --context "${K8S_CTX_0}" \
    --timeout=60s
done

echo "[ok] All managed load balancer (Envoy) TLS certificates created"
