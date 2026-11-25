echo "Creating MongoDBSearch resource (multi-cluster sharded, managed Envoy LB)..."
echo "  Configuring ${MDB_MONGOT_REPLICAS_PER_CLUSTER} mongot replica(s) per (cluster, shard)"

kubectl apply --context "${K8S_CTX_0}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_SEARCH_RESOURCE_NAME}
spec:
  source:
    username: search-sync-source
    passwordSecretRef:
      name: ${MDB_SEARCH_RESOURCE_NAME}-search-sync-source-password
      key: password
    external:
      shardedCluster:
        router:
          hosts:
            - "${MDB_EXTERNAL_MONGOS_HOST_0}"
            - "${MDB_EXTERNAL_MONGOS_HOST_1}"
        shards:
          - shardName: ${MDB_EXTERNAL_SHARD_0_NAME}
            hosts:
              - "${MDB_EXTERNAL_SHARD_0_HOST_CL0}"
              - "${MDB_EXTERNAL_SHARD_0_HOST_CL1}"
          - shardName: ${MDB_EXTERNAL_SHARD_1_NAME}
            hosts:
              - "${MDB_EXTERNAL_SHARD_1_HOST_CL0}"
              - "${MDB_EXTERNAL_SHARD_1_HOST_CL1}"
          - shardName: ${MDB_EXTERNAL_SHARD_2_NAME}
            hosts:
              - "${MDB_EXTERNAL_SHARD_2_HOST_CL0}"
              - "${MDB_EXTERNAL_SHARD_2_HOST_CL1}"
      tls:
        ca:
          name: ${MDB_TLS_CA_CONFIGMAP}
  security:
    tls:
      certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
  clusters:
    - name: ${K8S_CTX_0}
      index: 0
      replicas: ${MDB_MONGOT_REPLICAS_PER_CLUSTER}
      loadBalancer:
        managed:
          externalHostname: "${MDB_SEARCH_RESOURCE_NAME}-search-0-{shardName}-proxy-svc.${MDB_NS}.svc.cluster.local"
          routerHostname: "${MDB_SEARCH_RESOURCE_NAME}-search-0-proxy-svc.${MDB_NS}.svc.cluster.local"
      resourceRequirements:
        limits:
          cpu: "1"
          memory: 2Gi
        requests:
          cpu: 500m
          memory: 2Gi
    - name: ${K8S_CTX_1}
      index: 1
      replicas: ${MDB_MONGOT_REPLICAS_PER_CLUSTER}
      loadBalancer:
        managed:
          externalHostname: "${MDB_SEARCH_RESOURCE_NAME}-search-1-{shardName}-proxy-svc.${MDB_NS}.svc.cluster.local"
          routerHostname: "${MDB_SEARCH_RESOURCE_NAME}-search-1-proxy-svc.${MDB_NS}.svc.cluster.local"
      resourceRequirements:
        limits:
          cpu: "1"
          memory: 2Gi
        requests:
          cpu: 500m
          memory: 2Gi
EOF

echo "[ok] MongoDBSearch resource '${MDB_SEARCH_RESOURCE_NAME}' created"
