if [[ -z "${IMAGE_PULL_SECRET_NAME:-}" ]]; then
  echo "No IMAGE_PULL_SECRET_NAME configured, skipping image pull secret creation"
elif [[ -z "${IMAGE_PULL_SECRET_DATA:-}" ]]; then
  echo "No IMAGE_PULL_SECRET_DATA configured, skipping image pull secret creation"
else
  kubectl create secret docker-registry "${IMAGE_PULL_SECRET_NAME}" \
    --docker-server="${DOCKER_REGISTRY:-quay.io}" \
    --docker-username="${DOCKER_USERNAME:-}" \
    --docker-password="${DOCKER_PASSWORD:-}" \
    --namespace="${MDB_NS}" \
    --context "${K8S_CTX}" \
    --dry-run=client -o yaml | kubectl apply --context "${K8S_CTX}" -f -

  echo "[ok] Image pull secret '${IMAGE_PULL_SECRET_NAME}' created"
fi
