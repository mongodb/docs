kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBMultiCluster
metadata:
  name: ${RS_RESOURCE_NAME}
spec:
  type: ReplicaSet
  version: ${MONGODB_VERSION}
  opsManager:
    configMapRef:
      name: mdb-org-project-config
  credentials: mdb-org-owner-credentials
  duplicateServiceObjects: false
  persistent: true
  backup:
    mode: enabled
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
      externalAccess:
        externalDomain: "${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
        externalService:
          annotations:
             external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
    - clusterName: ${K8S_CLUSTER_1_CONTEXT_NAME}
      members: 1
      externalAccess:
        externalDomain: "${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
        externalService:
          annotations:
             external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
    - clusterName: ${K8S_CLUSTER_2_CONTEXT_NAME}
      members: 2
      externalAccess:
        externalDomain: "${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
        externalService:
          annotations:
             external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_2_EXTERNAL_DOMAIN}"
EOF
