kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: rs-user-password
type: Opaque
stringData:
  password: password
---
apiVersion: mongodb.com/v1
kind: MongoDBUser
metadata:
  name: rs-user
spec:
  passwordSecretKeyRef:
    name: rs-user-password
    key: password
  username: "rs-user"
  db: "admin"
  mongodbResourceRef:
    name: ${RESOURCE_NAME}
  roles:
  - db: "admin"
    name: "root"
EOF

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" wait --for=jsonpath='{.status.phase}'=Updated -n "${MDB_NAMESPACE}" mdbu/rs-user
