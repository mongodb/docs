echo "Creating Ops Manager connection resources..."


kubectl create secret generic om-credentials \
  --from-literal="user=${OPS_MANAGER_API_USER}" \
  --from-literal="publicApiKey=${OPS_MANAGER_API_KEY}" \
  --namespace="${MDB_NS}" \
  --context "${K8S_CTX_0}" \
  --dry-run=client -o yaml | kubectl apply --context "${K8S_CTX_0}" -f -

kubectl apply --context "${K8S_CTX_0}" -n "${MDB_NS}" -f - <<EOF
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
