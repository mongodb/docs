if [[ -z "${IMAGE_PULL_SECRET_NAME:-}" ]]; then
  echo "No IMAGE_PULL_SECRET_NAME configured, skipping image pull secret creation"
elif [[ -z "${IMAGE_PULL_SECRET_DATA:-}" ]]; then
  echo "No IMAGE_PULL_SECRET_DATA configured, skipping image pull secret creation"
else
  for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
    kubectl create secret docker-registry "${IMAGE_PULL_SECRET_NAME}" \
      --docker-server="${DOCKER_REGISTRY:-quay.io}" \
      --docker-username="${DOCKER_USERNAME:-}" \
      --docker-password="${DOCKER_PASSWORD:-}" \
      --namespace="${MDB_NS}" \
      --context "${ctx}" \
      --dry-run=client -o yaml | kubectl apply --context "${ctx}" -f -
  done

  echo "[ok] Image pull secret '${IMAGE_PULL_SECRET_NAME}' created in every member cluster"
fi
