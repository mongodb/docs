echo "Creating operator-managed multi-cluster MongoDB replica set..."
echo "  Members per cluster: ${MDB_MEMBERS_PER_CLUSTER}"

kubectl apply --context "${K8S_CTX_0}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBMultiCluster
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  type: ReplicaSet
  version: ${MDB_VERSION}
  duplicateServiceObjects: false
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
  additionalMongodConfig:
    setParameter:
      searchTLSMode: requireTLS
      useGrpcForSearch: true
      skipAuthenticationToMongot: false
      skipAuthenticationToSearchIndexManagementServer: false
      mongotHost: "${MDB_PROXY_HOST_0}"
      searchIndexManagementHostAndPort: "${MDB_PROXY_HOST_0}"
  clusterSpecList:
    - clusterName: ${K8S_CTX_0}
      members: ${MDB_MEMBERS_PER_CLUSTER}
    - clusterName: ${K8S_CTX_1}
      members: ${MDB_MEMBERS_PER_CLUSTER}
EOF

echo "[ok] MongoDBMultiCluster replica set resource created"
