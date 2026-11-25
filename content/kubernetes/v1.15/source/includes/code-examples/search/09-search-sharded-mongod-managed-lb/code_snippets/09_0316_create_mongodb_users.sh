echo "Creating password secrets for MongoDB users..."

# Create password secrets for users
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: mdb-admin-user-password
type: Opaque
stringData:
  password: ${MDB_ADMIN_USER_PASSWORD}
---
apiVersion: v1
kind: Secret
metadata:
  name: mdb-user-password
type: Opaque
stringData:
  password: ${MDB_USER_PASSWORD}
---
apiVersion: v1
kind: Secret
metadata:
  name: ${MDB_RESOURCE_NAME}-search-sync-source-password
type: Opaque
stringData:
  password: ${MDB_SEARCH_SYNC_USER_PASSWORD}
EOF

echo "  [ok] Password secrets created"

# Create admin user
echo "Creating MongoDBUser CRDs..."

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBUser
metadata:
  name: mdb-admin-user
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
echo "  [ok] Admin user CRD created"

# Create regular user for queries
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
echo "  [ok] Application user CRD created"

# Create search sync user with searchCoordinator role
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBUser
metadata:
  name: ${MDB_RESOURCE_NAME}-search-sync-source
spec:
  username: search-sync-source
  db: admin
  mongodbResourceRef:
    name: ${MDB_RESOURCE_NAME}
  passwordSecretKeyRef:
    name: ${MDB_RESOURCE_NAME}-search-sync-source-password
    key: password
  roles:
  - name: searchCoordinator
    db: admin
EOF
echo "  [ok] Search sync source user CRD created"

# Wait for users to be ready
echo "Waiting for admin user to be ready..."
kubectl wait --context "${K8S_CTX}" -n "${MDB_NS}" \
  --for=jsonpath='{.status.phase}'=Updated \
  mongodbuser/mdb-admin-user \
  --timeout=300s

echo "Waiting for regular user to be ready..."
kubectl wait --context "${K8S_CTX}" -n "${MDB_NS}" \
  --for=jsonpath='{.status.phase}'=Updated \
  mongodbuser/mdb-user \
  --timeout=300s

echo "Waiting for search sync user to be ready..."
kubectl wait --context "${K8S_CTX}" -n "${MDB_NS}" \
  --for=jsonpath='{.status.phase}'=Updated \
  "mongodbuser/${MDB_RESOURCE_NAME}-search-sync-source" \
  --timeout=300s

echo "[ok] All MongoDB users created successfully"
