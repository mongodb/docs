echo "Creating MongoDBSearch resource with managed Envoy LB..."
echo "  Configuring ${MDB_MONGOT_REPLICAS} mongot replicas per shard"

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_SEARCH_RESOURCE_NAME}
spec:
  logLevel: DEBUG
  replicas: ${MDB_MONGOT_REPLICAS}
  source:
    username: search-sync-source
    passwordSecretRef:
      name: ${MDB_SEARCH_RESOURCE_NAME}-search-sync-source-password
      key: password
    external:
      shardedCluster:
        router:
          hosts:
            - ${MDB_EXTERNAL_MONGOS_HOST}
        shards:
          # --- Shard 0 ---
          - shardName: ${MDB_EXTERNAL_SHARD_0_NAME}
            hosts:
              - ${MDB_EXTERNAL_SHARD_0_HOST}
          # --- Shard 1 ---
          - shardName: ${MDB_EXTERNAL_SHARD_1_NAME}
            hosts:
              - ${MDB_EXTERNAL_SHARD_1_HOST}
      tls:
        ca:
          name: ${MDB_TLS_CA_SECRET_NAME}
  security:
    tls:
      certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
  # loadBalancer.managed -- operator auto-deploys
  # and configures Envoy proxy
  loadBalancer:
    managed:
      externalHostname: ${MDB_SEARCH_RESOURCE_NAME}-search-0-{shardName}-proxy-svc.${MDB_NS}.svc.cluster.local
  resourceRequirements:
    limits:
      cpu: "2"
      memory: 3Gi
    requests:
      cpu: "1"
      memory: 2Gi
EOF

echo "[ok] MongoDBSearch resource '${MDB_SEARCH_RESOURCE_NAME}' created"
