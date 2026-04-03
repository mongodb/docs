# Issue server and search certificates
server_certificate="${MDB_RESOURCE_NAME}-server-tls"
search_certificate="${MDB_RESOURCE_NAME}-search-tls"

# DNS names for MongoDB server certificate
mongo_dns_names=()
[[ -n "${MDB_EXTERNAL_HOST_0:-}" ]] && mongo_dns_names+=("${MDB_EXTERNAL_HOST_0%%:*}")
[[ -n "${MDB_EXTERNAL_HOST_1:-}" ]] && mongo_dns_names+=("${MDB_EXTERNAL_HOST_1%%:*}")
[[ -n "${MDB_EXTERNAL_HOST_2:-}" ]] && mongo_dns_names+=("${MDB_EXTERNAL_HOST_2%%:*}")
mongo_dns_names+=("${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local" "*.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local")
[[ ${#mongo_dns_names[@]} -gt 0 ]] || { echo "No MongoDB DNS names generated; set MDB_EXTERNAL_HOST_* vars" >&2; exit 1; }

# DNS names for MongoDB Search certificate
search_dns_names=(
  "${MDB_SEARCH_SERVICE_NAME}"
  "${MDB_SEARCH_SERVICE_NAME}.${MDB_NS}.svc.cluster.local"
  "${MDB_SEARCH_SERVICE_NAME}-search-svc.${MDB_NS}.svc.cluster.local"
  "*.${MDB_SEARCH_SERVICE_NAME}-search-svc.${MDB_NS}.svc.cluster.local"
)
[[ -n "${MDB_SEARCH_HOSTNAME}" ]] && search_dns_names+=("${MDB_SEARCH_HOSTNAME}")

mongo_dns_block="$(printf '      - "%s"\n' "${mongo_dns_names[@]}")"
search_dns_block="$(printf '      - "%s"\n' "${search_dns_names[@]}")"

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${server_certificate}
  namespace: ${MDB_NS}
spec:
  secretName: ${MDB_TLS_SERVER_CERT_SECRET_NAME}
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
  duration: 240h0m0s
  renewBefore: 120h0m0s
  usages:
    - digital signature
    - key encipherment
    - server auth
    - client auth
  dnsNames:
${mongo_dns_block}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${search_certificate}
  namespace: ${MDB_NS}
spec:
  secretName: ${MDB_SEARCH_TLS_SECRET_NAME}
  issuerRef:
    name: ${MDB_TLS_CA_ISSUER}
    kind: ClusterIssuer
  duration: 240h0m0s
  renewBefore: 120h0m0s
  usages:
    - digital signature
    - key encipherment
    - server auth
    - client auth
  dnsNames:
${search_dns_block}
EOF

kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait --for=condition=Ready certificate "${server_certificate}" --timeout=300s
kubectl --context "${K8S_CTX}" -n "${MDB_NS}" wait --for=condition=Ready certificate "${search_certificate}" --timeout=300s

echo "Server and Search TLS certificates issued (Secrets: ${MDB_TLS_SERVER_CERT_SECRET_NAME}, ${MDB_SEARCH_TLS_SECRET_NAME})."
