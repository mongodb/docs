echo "Creating MongoDBSearch resource (multi-cluster, managed Envoy LB)..."
echo "  Configuring ${MDB_MONGOT_REPLICAS_PER_CLUSTER} mongot replica(s) per member cluster"

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
      hostAndPorts:
        - "${MDB_EXTERNAL_HOST_0_0}"
        - "${MDB_EXTERNAL_HOST_0_1}"
        - "${MDB_EXTERNAL_HOST_1_0}"
        - "${MDB_EXTERNAL_HOST_1_1}"
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
          externalHostname: "${MDB_SEARCH_RESOURCE_NAME}-search-0-proxy-svc.${MDB_NS}.svc.cluster.local"
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
          externalHostname: "${MDB_SEARCH_RESOURCE_NAME}-search-1-proxy-svc.${MDB_NS}.svc.cluster.local"
      resourceRequirements:
        limits:
          cpu: "1"
          memory: 2Gi
        requests:
          cpu: 500m
          memory: 2Gi
EOF

echo "[ok] MongoDBSearch resource '${MDB_SEARCH_RESOURCE_NAME}' created"
