kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OPERATOR_NAMESPACE}" create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "${OM_NAMESPACE}" create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "${OM_NAMESPACE}" create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson
