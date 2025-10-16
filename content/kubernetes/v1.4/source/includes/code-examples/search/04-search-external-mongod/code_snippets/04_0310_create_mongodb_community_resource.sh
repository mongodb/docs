kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodbcommunity.mongodb.com/v1
kind: MongoDBCommunity
metadata:
  name: mdbc-rs
spec:
  version: ${MDB_VERSION}
  type: ReplicaSet
  members: 3
  security:
    authentication:
      ignoreUnknownUsers: true
      modes:
        - SCRAM
    roles:
      - role: searchCoordinator
        db: admin
        roles:
          - name: clusterMonitor
            db: admin
          - name: directShardOperations
            db: admin
          - name: readAnyDatabase
            db: admin
        privileges:
          - resource:
              db: "__mdb_internal_search"
              collection: ""
            actions:
              - "changeStream"
              - "collStats"
              - "dbHash"
              - "dbStats"
              - "find"
              - "killCursors"
              - "listCollections"
              - "listIndexes"
              - "listSearchIndexes"
              - "planCacheRead"
              - "cleanupStructuredEncryptionData"
              - "compactStructuredEncryptionData"
              - "convertToCapped"
              - "createCollection"
              - "createIndex"
              - "createSearchIndexes"
              - "dropCollection"
              - "dropIndex"
              - "dropSearchIndex"
              - "insert"
              - "remove"
              - "renameCollectionSameDB"
              - "update"
              - "updateSearchIndex"
          - resource:
              cluster: true
            actions:
              - "bypassDefaultMaxTimeMS"
  additionalMongodConfig:
    setParameter:
      mongotHost: ${MDB_SEARCH_HOSTNAME}:27027
      searchIndexManagementHostAndPort: ${MDB_SEARCH_HOSTNAME}:27027
      skipAuthenticationToSearchIndexManagementServer: false
      searchTLSMode: disabled
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
    - name: search-sync-source
      db: admin
      # a reference to the secret that will be used to generate the user's password
      passwordSecretRef:
        name: mdbc-rs-search-sync-source-password
      scramCredentialsSecretName: mdbc-rs-search-sync-source
      roles:
        - name: searchCoordinator
          db: admin
EOF
