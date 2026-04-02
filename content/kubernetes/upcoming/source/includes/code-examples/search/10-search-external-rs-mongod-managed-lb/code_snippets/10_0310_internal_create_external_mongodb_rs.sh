echo "Creating external MongoDB replica set..."
echo "  Members: ${MDB_RS_MEMBERS}"
echo "  mongotHost proxy: ${MDB_PROXY_HOST}"

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDB
metadata:
  name: ${MDB_EXTERNAL_CLUSTER_NAME}
spec:
  type: ReplicaSet
  members: ${MDB_RS_MEMBERS}
  version: ${MDB_VERSION}
  opsManager:
    configMapRef:
      name: om-project
  credentials: om-credentials
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
  additionalMongodConfig:
    setParameter:
      mongotHost: ${MDB_PROXY_HOST}
      searchIndexManagementHostAndPort: ${MDB_PROXY_HOST}
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

echo "[ok] MongoDB replica set resource created"
