kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" create secret generic s3-access-secret \
  --from-literal=accessKey="${S3_ACCESS_KEY}" \
  --from-literal=secretKey="${S3_SECRET_KEY}"

# minio TLS secrets are signed with the default k8s root CA
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" create secret generic s3-ca-cert \
  --from-literal=ca.crt="$(kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n kube-system get configmap kube-root-ca.crt -o jsonpath="{.data.ca\.crt}")"
