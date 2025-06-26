kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBMultiCluster
metadata:
  name: ${RESOURCE_NAME}
spec:
  type: ReplicaSet
  version: ${MONGODB_VERSION}
  opsManager:
    configMapRef:
      name: mdb-org-project-config
  credentials: mdb-org-owner-credentials
  duplicateServiceObjects: false
  persistent: true
  externalAccess: {}
  security:
    certsSecretPrefix: cert-prefix
    tls:
      ca: ca-issuer
    authentication:
      enabled: true
      modes: ["SCRAM"]
  clusterSpecList:
    - clusterName: ${K8S_CLUSTER_0_CONTEXT_NAME}
      members: 2
    - clusterName: ${K8S_CLUSTER_1_CONTEXT_NAME}
      members: 1
    - clusterName: ${K8S_CLUSTER_2_CONTEXT_NAME}
      members: 2
EOF
