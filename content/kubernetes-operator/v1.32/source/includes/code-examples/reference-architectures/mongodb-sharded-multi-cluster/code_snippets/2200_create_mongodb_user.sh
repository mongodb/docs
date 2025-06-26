kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: sc-user-password
type: Opaque
stringData:
  password: password
---
apiVersion: mongodb.com/v1
kind: MongoDBUser
metadata:
  name: sc-user
spec:
  passwordSecretKeyRef:
    name: sc-user-password
    key: password
  username: "sc-user"
  db: "admin"
  mongodbResourceRef:
    name: ${RESOURCE_NAME}
  roles:
  - db: "admin"
    name: "root"
EOF

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" wait --for=jsonpath='{.status.phase}'=Updated -n "${MDB_NAMESPACE}" mdbu/sc-user
