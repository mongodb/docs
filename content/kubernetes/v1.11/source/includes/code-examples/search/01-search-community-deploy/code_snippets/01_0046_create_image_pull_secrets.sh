kubectl --context "${K8S_CTX}" -n "${MDB_NS}" \
    create secret generic "image-registries-secret" \
      --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson
