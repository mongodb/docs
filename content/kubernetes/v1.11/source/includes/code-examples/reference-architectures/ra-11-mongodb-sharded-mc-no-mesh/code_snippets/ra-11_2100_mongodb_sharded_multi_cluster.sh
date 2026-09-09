kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDB
metadata:
  name: ${SC_RESOURCE_NAME}
spec:
  shardCount: 3
  topology: MultiCluster
  type: ShardedCluster
  version: ${MONGODB_VERSION}
  opsManager:
    configMapRef:
      name: mdb-org-project-config
  credentials: mdb-org-owner-credentials
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
  mongos:
    clusterSpecList:
      - clusterName: ${K8S_CLUSTER_0_CONTEXT_NAME}
        members: 2
        externalAccess:
          externalDomain: "${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
  configSrv:
    clusterSpecList:
      - clusterName: ${K8S_CLUSTER_0_CONTEXT_NAME}
        members: 3 # config server will have 3 members in main cluster
        externalAccess:
          externalDomain: "${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
      - clusterName: ${K8S_CLUSTER_1_CONTEXT_NAME}
        members: 1 # config server will have additional non-voting, read-only member in this cluster
        memberConfig:
          - votes: 0
            priority: "0"
        externalAccess:
          externalDomain: "${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
  shard:
    clusterSpecList:
      - clusterName: ${K8S_CLUSTER_0_CONTEXT_NAME}
        members: 3 # each shard will have 3 members in this cluster
        externalAccess:
          externalDomain: "${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_0_EXTERNAL_DOMAIN}"
      - clusterName: ${K8S_CLUSTER_1_CONTEXT_NAME}
        members: 1 # each shard will have additional non-voting, read-only member in this cluster
        memberConfig:
          - votes: 0
            priority: "0"
        externalAccess:
          externalDomain: "${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
          externalService:
            annotations:
               external-dns.alpha.kubernetes.io/hostname: "{podName}.${MDB_CLUSTER_1_EXTERNAL_DOMAIN}"
EOF
