kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: om-cert
spec:
  dnsNames:
  - ${OPS_MANAGER_EXTERNAL_DOMAIN}
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-om-cert
  usages:
  - server auth
  - client auth
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: om-db-cert
spec:
  dnsNames:
  - "*.${APPDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  - "*.${APPDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  - "*.${APPDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-om-db-cert
  usages:
  - server auth
  - client auth
EOF
