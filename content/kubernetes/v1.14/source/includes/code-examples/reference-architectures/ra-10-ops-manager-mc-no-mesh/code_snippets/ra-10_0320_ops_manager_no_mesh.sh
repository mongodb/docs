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
    type: ClusterIP
    annotations:
      cloud.google.com/neg: '{"exposed_ports": {"8443":{}}}'
  opsManagerURL: "https://${OPS_MANAGER_EXTERNAL_DOMAIN}"
  security:
    certsSecretPrefix: cert-prefix
    tls:
      ca: ca-issuer
  clusterSpecList:
    - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
      members: 1
    - clusterName: "${K8S_CLUSTER_1_CONTEXT_NAME}"
      members: 2
  applicationDatabase:
    version: "${APPDB_VERSION}"
    topology: MultiCluster
    security:
      certsSecretPrefix: cert-prefix
      tls:
        ca: ca-issuer
    clusterSpecList:
      - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
        members: 2
        externalAccess:
          externalDomain: "${APPDB_CLUSTER_0_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${APPDB_CLUSTER_0_EXTERNAL_DOMAIN}"
      - clusterName: "${K8S_CLUSTER_1_CONTEXT_NAME}"
        members: 2
        externalAccess:
          externalDomain: "${APPDB_CLUSTER_1_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${APPDB_CLUSTER_1_EXTERNAL_DOMAIN}"
      - clusterName: "${K8S_CLUSTER_2_CONTEXT_NAME}"
        members: 1
        externalAccess:
          externalDomain: "${APPDB_CLUSTER_2_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${APPDB_CLUSTER_2_EXTERNAL_DOMAIN}"
  backup:
    enabled: false
EOF
