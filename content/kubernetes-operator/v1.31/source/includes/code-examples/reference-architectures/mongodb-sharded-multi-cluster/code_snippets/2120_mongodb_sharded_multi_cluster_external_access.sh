kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDB
metadata:
  name: ${RESOURCE_NAME}
spec:
  shardCount: 3
  # we don't specify mongodsPerShardCount, mongosCount and configServerCount as they don't make sense for multi-cluster
  topology: MultiCluster
  type: ShardedCluster
  version: 8.0.3
  opsManager:
    configMapRef:
      name: mdb-org-project-config
  credentials: mdb-org-owner-credentials
  persistent: true
  externalAccess: {}
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
  configSrv:
    clusterSpecList:
      - clusterName: ${K8S_CLUSTER_0_CONTEXT_NAME}
        members: 3 # config server will have 3 members in main cluster
      - clusterName: ${K8S_CLUSTER_1_CONTEXT_NAME}
        members: 1 # config server will have additional non-voting, read-only member in this cluster
        memberConfig:
          - votes: 0
            priority: "0"
  shard:
    clusterSpecList:
      - clusterName: ${K8S_CLUSTER_0_CONTEXT_NAME}
        members: 3 # each shard will have 3 members in this cluster
      - clusterName: ${K8S_CLUSTER_1_CONTEXT_NAME}
        members: 1 # each shard will have additional non-voting, read-only member in this cluster
        memberConfig:
          - votes: 0
            priority: "0"
EOF
