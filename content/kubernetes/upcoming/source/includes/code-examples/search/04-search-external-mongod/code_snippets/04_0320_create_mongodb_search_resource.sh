kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_SEARCH_RESOURCE_NAME:-mdbs}
spec:
  source:
    external:
      hostAndPorts:
        - ${MDB_EXTERNAL_HOST_0}
        - ${MDB_EXTERNAL_HOST_1}
        - ${MDB_EXTERNAL_HOST_2}
      tls:
        ca:
          name: ${MDB_TLS_CA_SECRET_NAME}
    username: search-sync-source
    passwordSecretRef:
      name: ${MDB_RESOURCE_NAME}-search-sync-source-password
      key: password
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
