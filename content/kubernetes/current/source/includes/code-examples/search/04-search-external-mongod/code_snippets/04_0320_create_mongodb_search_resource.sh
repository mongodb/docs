kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: mdbs
spec:
  source:
    external:
      hostAndPorts:
        - ${MDB_EXTERNAL_HOST_0}
        - ${MDB_EXTERNAL_HOST_1}
        - ${MDB_EXTERNAL_HOST_2}
      keyfileSecretRef:
        name: ${MDB_EXTERNAL_KEYFILE_SECRET_NAME}
        key: keyfile
    username: search-sync-source
    passwordSecretRef:
      name: ${MDB_RESOURCE_NAME}-search-sync-source-password
      key: password
  resourceRequirements:
    limits:
      cpu: "3"
      memory: 5Gi
    requests:
      cpu: "2"
      memory: 3Gi
EOF
