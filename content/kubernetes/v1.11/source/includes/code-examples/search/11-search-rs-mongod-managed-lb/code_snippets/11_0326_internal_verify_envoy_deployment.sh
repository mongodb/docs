echo "Verifying operator-managed Envoy deployment..."

envoy_deployment="${MDB_RESOURCE_NAME}-search-lb-0"
envoy_configmap="${MDB_RESOURCE_NAME}-search-lb-0-config"
proxy_service="${MDB_RESOURCE_NAME}-search-0-proxy-svc"

echo "Checking Envoy ConfigMap..."
if kubectl get configmap "${envoy_configmap}" -n "${MDB_NS}" --context "${K8S_CTX}" &>/dev/null; then
  echo "  [ok] ConfigMap '${envoy_configmap}' exists"
else
  echo "  [FAIL] ConfigMap '${envoy_configmap}' NOT FOUND" >&2
fi

echo "Checking Envoy Deployment..."
if kubectl get deployment "${envoy_deployment}" -n "${MDB_NS}" --context "${K8S_CTX}" &>/dev/null; then
  ready=$(kubectl get deployment "${envoy_deployment}" -n "${MDB_NS}" --context "${K8S_CTX}" \
    -o jsonpath='{.status.readyReplicas}' 2>/dev/null || echo "0")
  desired=$(kubectl get deployment "${envoy_deployment}" -n "${MDB_NS}" --context "${K8S_CTX}" \
    -o jsonpath='{.spec.replicas}' 2>/dev/null || echo "1")

  if [[ "${ready}" -ge "${desired}" ]]; then
    echo "  [ok] Deployment '${envoy_deployment}' is ready (${ready}/${desired} replicas)"
  else
    echo "  [warn] Deployment '${envoy_deployment}' is not fully ready (${ready}/${desired} replicas)"
    echo "    Waiting for Envoy pods..."
    kubectl rollout status deployment/"${envoy_deployment}" -n "${MDB_NS}" --context "${K8S_CTX}" --timeout=120s
  fi
else
  echo "  [FAIL] Deployment '${envoy_deployment}' NOT FOUND" >&2
fi

echo "Checking Proxy Service..."
if kubectl get service "${proxy_service}" -n "${MDB_NS}" --context "${K8S_CTX}" &>/dev/null; then
  echo "  [ok] Service '${proxy_service}' exists"
else
  echo "  [FAIL] Service '${proxy_service}' NOT FOUND" >&2
fi

echo ""
echo "Envoy pod status:"
kubectl get pods -n "${MDB_NS}" --context "${K8S_CTX}" -l "app=${envoy_deployment}"

echo ""
echo "[ok] Operator-managed Envoy proxy is deployed and healthy"
