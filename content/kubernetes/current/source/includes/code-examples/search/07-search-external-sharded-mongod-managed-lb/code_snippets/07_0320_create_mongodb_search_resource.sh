echo "Creating MongoDBSearch resource with managed Envoy LB..."
echo "  Configuring ${MDB_MONGOT_REPLICAS} mongot replicas per shard"

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_SEARCH_RESOURCE_NAME}
spec:
  logLevel: DEBUG
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
          name: ${MDB_TLS_CA_CONFIGMAP}
  security:
    tls:
      certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
  clusters:
    - replicas: ${MDB_MONGOT_REPLICAS}
      # loadBalancer.managed -- operator auto-deploys
      # and configures Envoy proxy
      loadBalancer:
        managed:
          # Hostnames only (no port); Envoy matches them as the TLS SNI
          externalHostname: "${MDB_SEARCH_EXTERNAL_HOSTNAME}"
          # Shard-agnostic hostname the mongos routers use to reach mongot
          routerHostname: "${MDB_SEARCH_ROUTER_HOSTNAME}"
      resourceRequirements:
        limits:
          cpu: "2"
          memory: 3Gi
        requests:
          cpu: "1"
          memory: 2Gi
EOF

echo "[ok] MongoDBSearch resource '${MDB_SEARCH_RESOURCE_NAME}' created"
