echo "Installing cert-manager..."

# Check if cert-manager is already installed
if kubectl get namespace "${CERT_MANAGER_NAMESPACE}" \
  --context "${K8S_CTX}" &>/dev/null \
  && kubectl get deployment cert-manager \
    -n "${CERT_MANAGER_NAMESPACE}" \
    --context "${K8S_CTX}" &>/dev/null; then
  echo "cert-manager is already installed," \
    "skipping installation"
  kubectl rollout status deployment/cert-manager \
    -n "${CERT_MANAGER_NAMESPACE}" \
    --context "${K8S_CTX}" --timeout=60s
  echo "[ok] cert-manager is ready"
else
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml \
    --context "${K8S_CTX}"

  echo "Waiting for cert-manager to be ready..."
  kubectl rollout status deployment/cert-manager \
    -n "${CERT_MANAGER_NAMESPACE}" \
    --context "${K8S_CTX}" --timeout=120s
  kubectl rollout status deployment/cert-manager-webhook \
    -n "${CERT_MANAGER_NAMESPACE}" \
    --context "${K8S_CTX}" --timeout=120s
  kubectl rollout status deployment/cert-manager-cainjector \
    -n "${CERT_MANAGER_NAMESPACE}" \
    --context "${K8S_CTX}" --timeout=120s

  echo "[ok] cert-manager installed and ready"
fi

