echo "Creating operator-managed multi-cluster MongoDB sharded cluster..."
echo "  Shards: ${MDB_SHARD_COUNT}"
echo "  mongods per shard per cluster: ${MDB_MONGODS_PER_SHARD_PER_CLUSTER}"
echo "  mongos per cluster: ${MDB_MONGOS_PER_CLUSTER}"
echo "  Config servers per cluster: ${MDB_CONFIG_SERVERS_PER_CLUSTER}"

kubectl apply --context "${K8S_CTX_0}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDB
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  shardCount: ${MDB_SHARD_COUNT}
  topology: MultiCluster
  type: ShardedCluster
  version: ${MDB_VERSION}
  opsManager:
    configMapRef:
      name: om-project
  credentials: om-credentials
  persistent: true
  security:
    certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
    tls:
      ca: ${MDB_TLS_CA_CONFIGMAP}
    authentication:
      enabled: true
      modes: ["SCRAM"]
  mongos:
    clusterSpecList:
      - clusterName: ${K8S_CTX_0}
        members: ${MDB_MONGOS_PER_CLUSTER}
      - clusterName: ${K8S_CTX_1}
        members: ${MDB_MONGOS_PER_CLUSTER}
    additionalMongodConfig:
      setParameter:
        searchTLSMode: requireTLS
        useGrpcForSearch: true
        skipAuthenticationToMongot: false
        skipAuthenticationToSearchIndexManagementServer: false
        mongotHost: "${MDB_PROXY_HOST_0}"
        searchIndexManagementHostAndPort: "${MDB_PROXY_HOST_0}"
  configSrv:
    clusterSpecList:
      - clusterName: ${K8S_CTX_0}
        members: ${MDB_CONFIG_SERVERS_PER_CLUSTER}
      - clusterName: ${K8S_CTX_1}
        members: ${MDB_CONFIG_SERVERS_PER_CLUSTER}
  shard:
    clusterSpecList:
      - clusterName: ${K8S_CTX_0}
        members: ${MDB_MONGODS_PER_SHARD_PER_CLUSTER}
      - clusterName: ${K8S_CTX_1}
        members: ${MDB_MONGODS_PER_SHARD_PER_CLUSTER}
    additionalMongodConfig:
      setParameter:
        searchTLSMode: requireTLS
        useGrpcForSearch: true
        skipAuthenticationToMongot: false
        skipAuthenticationToSearchIndexManagementServer: false
  shardOverrides:
    - shardNames: ["${MDB_SHARD_0_NAME}"]
      additionalMongodConfig:
        setParameter:
          searchTLSMode: requireTLS
          useGrpcForSearch: true
          skipAuthenticationToMongot: false
          skipAuthenticationToSearchIndexManagementServer: false
          mongotHost: "${MDB_PROXY_HOST_SHARD_0}"
          searchIndexManagementHostAndPort: "${MDB_PROXY_HOST_SHARD_0}"
    - shardNames: ["${MDB_SHARD_1_NAME}"]
      additionalMongodConfig:
        setParameter:
          searchTLSMode: requireTLS
          useGrpcForSearch: true
          skipAuthenticationToMongot: false
          skipAuthenticationToSearchIndexManagementServer: false
          mongotHost: "${MDB_PROXY_HOST_SHARD_1}"
          searchIndexManagementHostAndPort: "${MDB_PROXY_HOST_SHARD_1}"
    - shardNames: ["${MDB_SHARD_2_NAME}"]
      additionalMongodConfig:
        setParameter:
          searchTLSMode: requireTLS
          useGrpcForSearch: true
          skipAuthenticationToMongot: false
          skipAuthenticationToSearchIndexManagementServer: false
          mongotHost: "${MDB_PROXY_HOST_SHARD_2}"
          searchIndexManagementHostAndPort: "${MDB_PROXY_HOST_SHARD_2}"
EOF

echo "[ok] Multi-cluster MongoDB sharded cluster resource created"
