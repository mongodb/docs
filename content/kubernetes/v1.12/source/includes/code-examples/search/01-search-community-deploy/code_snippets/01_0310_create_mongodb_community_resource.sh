kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodbcommunity.mongodb.com/v1
kind: MongoDBCommunity
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  version: ${MDB_VERSION}
  type: ReplicaSet
  members: ${MDB_MEMBERS}
  security:
    tls:
      enabled: true
      certificateKeySecretRef:
        name: ${MDB_TLS_SERVER_CERT_SECRET_NAME}
      caConfigMapRef:
        name: ${MDB_TLS_CA_CONFIGMAP}
    authentication:
      ignoreUnknownUsers: true
      modes:
        - SCRAM
  agent:
    logLevel: DEBUG
  statefulSet:
    spec:
      template:
        spec:
          containers:
            - name: mongod
              resources:
                limits:
                  cpu: "2"
                  memory: 2Gi
                requests:
                  cpu: "1"
                  memory: 1Gi
            - name: mongodb-agent
              resources:
                limits:
                  cpu: "1"
                  memory: 2Gi
                requests:
                  cpu: "0.5"
                  memory: 1Gi
  users:
    # admin user with root role
    - name: mdb-admin
      db: admin
      # a reference to the secret containing user password
      passwordSecretRef:
        name: mdb-admin-user-password
      scramCredentialsSecretName: mdb-admin-user
      roles:
        - name: root
          db: admin
    # user performing search queries
    - name: mdb-user
      db: admin
      # a reference to the secret containing user password
      passwordSecretRef:
        name: mdb-user-password
      scramCredentialsSecretName: mdb-user-scram
      roles:
        - name: restore
          db: sample_mflix
        - name: readWrite
          db: sample_mflix
    # user used by MongoDB Search to connect to MongoDB database to
    # synchronize data from.
    # For MongoDB <8.2, the operator will be creating the
    # searchCoordinator custom role automatically.
    # From MongoDB 8.2, searchCoordinator role will be a
    # built-in role.
    - name: search-sync-source
      db: admin
      # a reference to the secret that will be used to generate the user's password
      passwordSecretRef:
        name: ${MDB_RESOURCE_NAME}-search-sync-source-password
      scramCredentialsSecretName: ${MDB_RESOURCE_NAME}-search-sync-source
      roles:
        - name: searchCoordinator
          db: admin
EOF
