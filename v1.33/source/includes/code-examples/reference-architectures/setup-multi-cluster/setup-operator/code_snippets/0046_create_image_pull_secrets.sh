mkdir -p secrets

kubectl create secret generic "image-registries-secret" \
        --from-file=.dockerconfigjson="${HOME}/.docker/config.json" --type=kubernetes.io/dockerconfigjson \
        --dry-run=client -o yaml > secrets/image-registries-secret.yaml

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OPERATOR_NAMESPACE}" apply -f secrets/image-registries-secret.yaml

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" apply -f secrets/image-registries-secret.yaml
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "${OM_NAMESPACE}" apply -f secrets/image-registries-secret.yaml
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "${OM_NAMESPACE}" apply -f secrets/image-registries-secret.yaml

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" apply -f secrets/image-registries-secret.yaml
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" apply -f secrets/image-registries-secret.yaml
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" apply -f secrets/image-registries-secret.yaml
