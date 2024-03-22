kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${NAMESPACE}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBOpsManager
metadata:
  name: om
spec:
  topology: MultiCluster
  version: 7.0.1
  adminCredentials: om-admin-user-credentials
  security:
    certsSecretPrefix: cert-prefix
    tls:
      ca: om-cert-ca
  clusterSpecList:
    - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
      members: 1
  applicationDatabase:
    version: "6.0.5-ubi8"
    topology: MultiCluster
    security:
      certsSecretPrefix: cert-prefix
      tls:
        ca: appdb-cert-ca
    clusterSpecList:
      - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
        members: 3
  backup:
    enabled: false
EOF
