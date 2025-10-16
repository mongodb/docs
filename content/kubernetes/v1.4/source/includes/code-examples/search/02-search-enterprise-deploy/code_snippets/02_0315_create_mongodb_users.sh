# admin user with root role
kubectl --context "${K8S_CTX}" --namespace "${MDB_NS}" \
  create secret generic mdb-admin-user-password \
  --from-literal=password="${MDB_ADMIN_USER_PASSWORD}"

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBUser
metadata:
  name: mdb-admin
spec:
  username: mdb-admin
  db: admin
  mongodbResourceRef:
    name: ${MDB_RESOURCE_NAME}
  passwordSecretKeyRef:
    name: mdb-admin-user-password
    key: password
  roles:
  - name: root
    db: admin
EOF

# user used by MongoDB Search to connect to MongoDB database to synchronize data from
# For MongoDB <8.2, the operator will be creating the searchCoordinator custom role automatically
# From MongoDB 8.2, searchCoordinator role will be a built-in role.
kubectl --context "${K8S_CTX}" --namespace "${MDB_NS}" \
  create secret generic mdb-rs-search-sync-source-password \
  --from-literal=password="${MDB_SEARCH_SYNC_USER_PASSWORD}"
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBUser
metadata:
  name: search-sync-source-user
spec:
  username: search-sync-source
  db: admin
  mongodbResourceRef:
    name: ${MDB_RESOURCE_NAME}
  passwordSecretKeyRef:
    name: mdb-rs-search-sync-source-password
    key: password
  roles:
  - name: searchCoordinator
    db: admin
EOF

# user performing search queries
kubectl --context "${K8S_CTX}" --namespace "${MDB_NS}" \
  create secret generic mdb-user-password \
  --from-literal=password="${MDB_USER_PASSWORD}"
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBUser
metadata:
  name: mdb-user
spec:
  username: mdb-user
  db: admin
  mongodbResourceRef:
    name: ${MDB_RESOURCE_NAME}
  passwordSecretKeyRef:
    name: mdb-user-password
    key: password
  roles:
  - name: readWrite
    db: sample_mflix
EOF

