kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mdb-cert
spec:
  dnsNames:
  - "*.${MDB_NAMESPACE}.svc.cluster.local"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-mdb-cert
  usages:
  - server auth
  - client auth
EOF
