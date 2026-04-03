kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mdb-sh-cert
spec:
  dnsNames:
  - "*.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-mdb-sh-cert
  usages:
  - server auth
  - client auth
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mdb-sh-0-cert
spec:
  dnsNames:
  - "*.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-mdb-sh-0-cert
  usages:
  - server auth
  - client auth
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mdb-sh-1-cert
spec:
  dnsNames:
  - "*.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-mdb-sh-1-cert
  usages:
  - server auth
  - client auth
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mdb-sh-2-cert
spec:
  dnsNames:
  - "*.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-mdb-sh-2-cert
  usages:
  - server auth
  - client auth
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mdb-sh-config-cert
spec:
  dnsNames:
  - "*.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-mdb-sh-config-cert
  usages:
  - server auth
  - client auth
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mdb-sh-mongos-cert
spec:
  dnsNames:
  - "*.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  - "*.${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: cert-prefix-mdb-sh-mongos-cert
  usages:
  - server auth
  - client auth
EOF
