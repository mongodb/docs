kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBOpsManager
metadata:
  name: om
spec:
  topology: MultiCluster
  version: "${OPS_MANAGER_VERSION}"
  adminCredentials: om-admin-user-credentials
  externalConnectivity:
    type: LoadBalancer
  security:
    certsSecretPrefix: cert-prefix
    tls:
      ca: ca-issuer
  clusterSpecList:
    - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
      members: 1
  applicationDatabase:
    version: "${APPDB_VERSION}"
    topology: MultiCluster
    security:
      certsSecretPrefix: cert-prefix
      tls:
        ca: ca-issuer
    clusterSpecList:
      - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
        members: 3
  backup:
    enabled: false
EOF
