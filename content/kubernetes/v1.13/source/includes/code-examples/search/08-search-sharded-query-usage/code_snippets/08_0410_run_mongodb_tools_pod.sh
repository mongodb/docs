echo "Deploying mongodb-tools pod..."

TOOLS_IMAGE="mongodb/mongodb-community-server:${MDB_VERSION%-ent}-ubi8"

echo "  Image: ${TOOLS_IMAGE}"
kubectl apply --context "${K8S_CTX}" -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: mongodb-tools
  namespace: ${MDB_NS}
spec:
  restartPolicy: Never
  containers:
    - name: mongodb-tools
      image: ${TOOLS_IMAGE}
      command: ["sleep", "infinity"]
      volumeMounts:
        - name: tls
          mountPath: /tls
          readOnly: true
  volumes:
    - name: tls
      configMap:
        # CA certificate is mounted at /tls/ca-pem
        name: ${MDB_TLS_CA_CONFIGMAP}
EOF

# Wait for pod to be ready
echo "Waiting for mongodb-tools pod to be ready..."
kubectl wait --for=condition=Ready pod/mongodb-tools \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  --timeout=120s

conn_str="${MDB_USER_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"
echo "mongodb-tools pod is ready"
echo ""
echo "You can now run MongoDB commands using:"
echo "  kubectl exec -it mongodb-tools -n ${MDB_NS} -- mongosh \"${conn_str}\""
