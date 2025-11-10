kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF_MANIFEST
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_RESOURCE_NAME}-server-tls
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
  - "${MDB_RESOURCE_NAME}-0"
  - "${MDB_RESOURCE_NAME}-1"
  - "${MDB_RESOURCE_NAME}-2"
  - "${MDB_RESOURCE_NAME}-0.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local"
  - "${MDB_RESOURCE_NAME}-1.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local"
  - "${MDB_RESOURCE_NAME}-2.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local"
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_RESOURCE_NAME}-search-tls
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
  - "${MDB_RESOURCE_NAME}-search-svc.${MDB_NS}.svc.cluster.local"
EOF_MANIFEST

kubectl --context "${K8S_CTX}" wait --for=condition=Ready -n "${MDB_NS}" certificate "${MDB_RESOURCE_NAME}-server-tls"
kubectl --context "${K8S_CTX}" wait --for=condition=Ready -n "${MDB_NS}" certificate "${MDB_RESOURCE_NAME}-search-tls"
