echo "Creating Ops Manager connection resources..."

# Create the credentials secret with API key
kubectl create secret generic om-credentials \
  --from-literal="user=${OPS_MANAGER_API_USER}" \
  --from-literal="publicApiKey=${OPS_MANAGER_API_KEY}" \
  --namespace="${MDB_NS}" \
  --context "${K8S_CTX}" \
  --dry-run=client -o yaml | kubectl apply --context "${K8S_CTX}" -f -

# Create the project ConfigMap
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: om-project
data:
  baseUrl: "${OPS_MANAGER_API_URL}"
  orgId: "${OPS_MANAGER_ORG_ID}"
  projectName: "${OPS_MANAGER_PROJECT_NAME}"
EOF

echo "[ok] Ops Manager resources created"
echo "  - Secret: om-credentials"
echo "  - ConfigMap: om-project"
