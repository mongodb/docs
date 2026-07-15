echo "Creating MongoDBSearch resource with managed Envoy LB..."
echo "  Configuring ${MDB_MONGOT_REPLICAS} mongot replicas"

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  logLevel: DEBUG
  replicas: ${MDB_MONGOT_REPLICAS}
  source:
    mongodbResourceRef:
      name: ${MDB_RESOURCE_NAME}
  security:
    tls:
      certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
  # loadBalancer.managed -- operator automatically deploys and configures Envoy proxy
  loadBalancer:
    managed: {}
  resourceRequirements:
    limits:
      cpu: "2"
      memory: 3Gi
    requests:
      cpu: "1"
      memory: 2Gi
EOF

echo "[ok] MongoDBSearch resource '${MDB_RESOURCE_NAME}' created"
