echo "Creating simulated external MongoDB sharded cluster..."
echo "  Shards: 2"
echo "  Members per shard: 1"
echo "  mongos count: 1"
echo "  Config servers: 2"

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDB
metadata:
  name: ${MDB_EXTERNAL_CLUSTER_NAME}
spec:
  type: ShardedCluster
  shardCount: 2
  mongodsPerShardCount: 1
  mongosCount: 1
  configServerCount: 2
  version: ${MDB_VERSION}
  opsManager:
    configMapRef:
      name: om-project
  credentials: om-credentials
  externalAccess:
    externalDomain: ${MDB_EXTERNAL_DOMAIN}
  security:
    certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
    tls:
      enabled: true
      ca: ${MDB_TLS_CA_CONFIGMAP}
    authentication:
      enabled: true
      ignoreUnknownUsers: true
      modes:
        - SCRAM
  agent:
    logLevel: DEBUG
  persistent: true
  shardOverrides:
    # --- Shard 0 ---
    - shardNames:
        - ${MDB_EXTERNAL_SHARD_0_NAME}
      additionalMongodConfig:
        setParameter:
          mongotHost: ${MDB_PROXY_HOST_SHARD_0}
          searchIndexManagementHostAndPort: ${MDB_PROXY_HOST_SHARD_0}
          skipAuthenticationToSearchIndexManagementServer: false
          skipAuthenticationToMongot: false
          searchTLSMode: requireTLS
          useGrpcForSearch: true
    # --- Shard 1 ---
    - shardNames:
        - ${MDB_EXTERNAL_SHARD_1_NAME}
      additionalMongodConfig:
        setParameter:
          mongotHost: ${MDB_PROXY_HOST_SHARD_1}
          searchIndexManagementHostAndPort: ${MDB_PROXY_HOST_SHARD_1}
          skipAuthenticationToSearchIndexManagementServer: false
          skipAuthenticationToMongot: false
          searchTLSMode: requireTLS
          useGrpcForSearch: true
  mongos:
    additionalMongodConfig:
      setParameter:
        mongotHost: ${MDB_PROXY_HOST_SHARD_0}
        searchIndexManagementHostAndPort: ${MDB_PROXY_HOST_SHARD_0}
        skipAuthenticationToSearchIndexManagementServer: false
        skipAuthenticationToMongot: false
        searchTLSMode: requireTLS
        useGrpcForSearch: true
  podSpec:
    podTemplate:
      spec:
        containers:
          - name: mongodb-enterprise-database
            resources:
              limits:
                cpu: "1"
                memory: 1Gi
              requests:
                cpu: "0.5"
                memory: 512Mi
EOF

echo "[ok] MongoDB sharded cluster resource created"
