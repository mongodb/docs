echo "Creating TLS certificates for managed load balancer (Envoy)..."

cert_pfx="${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_RESOURCE_NAME}"
lb_server_cert="${cert_pfx}-search-lb-0-cert"
lb_client_cert="${cert_pfx}-search-lb-0-client-cert"

echo "Creating LB server certificate..."
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${lb_server_cert}
spec:
  secretName: ${lb_server_cert}
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
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

echo "Creating LB client certificate..."
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${lb_client_cert}
spec:
  secretName: ${lb_client_cert}
  duration: 8760h    # 1 year
  renewBefore: 720h  # 30 days
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

echo "Waiting for LB certificates to be ready..."
kubectl wait --for=condition=Ready certificate/"${lb_server_cert}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=60s
kubectl wait --for=condition=Ready certificate/"${lb_client_cert}" \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=60s

echo "[ok] All managed load balancer (Envoy) TLS certificates created"
