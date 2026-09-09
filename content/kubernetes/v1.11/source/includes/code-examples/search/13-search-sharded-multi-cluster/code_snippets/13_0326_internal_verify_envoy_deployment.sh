echo "Verifying operator-managed per-cluster mongot and Envoy resources..."

has_error=false
ci=0
for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
  envoy_deployment="${MDB_SEARCH_RESOURCE_NAME}-search-lb-${ci}"

  echo "== cluster ${ci} (${ctx}) =="

  echo "Checking per-shard mongot StatefulSets..."
  for shard_name in "${MDB_SHARD_0_NAME}" "${MDB_SHARD_1_NAME}" "${MDB_SHARD_2_NAME}"; do
    mongot_sts="${MDB_SEARCH_RESOURCE_NAME}-search-${ci}-${shard_name}"
    if kubectl get statefulset "${mongot_sts}" -n "${MDB_NS}" --context "${ctx}" &>/dev/null; then
      echo "  [ok] StatefulSet '${mongot_sts}' exists"
    else
      echo "  [FAIL] StatefulSet '${mongot_sts}' NOT FOUND" >&2
      has_error=true
    fi
  done

  echo "Checking Envoy Deployment..."
  if kubectl get deployment "${envoy_deployment}" -n "${MDB_NS}" --context "${ctx}" &>/dev/null; then
    if kubectl rollout status deployment/"${envoy_deployment}" -n "${MDB_NS}" --context "${ctx}" --timeout=120s; then
      echo "  [ok] Deployment '${envoy_deployment}' is ready"
    else
      echo "  [FAIL] Deployment '${envoy_deployment}' is not ready" >&2
      has_error=true
    fi
  else
    echo "  [FAIL] Deployment '${envoy_deployment}' NOT FOUND" >&2
    has_error=true
  fi

  echo "Checking router proxy Service..."
  router_proxy_service="${MDB_SEARCH_RESOURCE_NAME}-search-${ci}-proxy-svc"
  if kubectl get service "${router_proxy_service}" -n "${MDB_NS}" --context "${ctx}" &>/dev/null; then
    echo "  [ok] Service '${router_proxy_service}' exists"
  else
    echo "  [FAIL] Service '${router_proxy_service}' NOT FOUND" >&2
    has_error=true
  fi

  echo "Checking per-shard proxy Services..."
  for shard_name in "${MDB_SHARD_0_NAME}" "${MDB_SHARD_1_NAME}" "${MDB_SHARD_2_NAME}"; do
    proxy_service="${MDB_SEARCH_RESOURCE_NAME}-search-${ci}-${shard_name}-proxy-svc"
    if kubectl get service "${proxy_service}" -n "${MDB_NS}" --context "${ctx}" &>/dev/null; then
      echo "  [ok] Service '${proxy_service}' exists"
    else
      echo "  [FAIL] Service '${proxy_service}' NOT FOUND" >&2
      has_error=true
    fi
  done

  ci=$((ci + 1))
done

if [[ "${has_error}" == "true" ]]; then
  false
else
  echo ""
  echo "[ok] Operator-managed per-cluster Envoy proxies are deployed and healthy"
fi
