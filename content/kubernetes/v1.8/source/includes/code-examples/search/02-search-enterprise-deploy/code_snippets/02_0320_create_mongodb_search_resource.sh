kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  # no need to specify source.mongodbResourceRef if MongoDBSearch CR has the same name as MongoDB CR
  # the operator infer it automatically
  security:
    tls:
      certificateKeySecretRef:
        name: ${MDB_SEARCH_TLS_SECRET_NAME}
  resourceRequirements:
    limits:
      cpu: "3"
      memory: 5Gi
    requests:
      cpu: "2"
      memory: 3Gi
EOF
