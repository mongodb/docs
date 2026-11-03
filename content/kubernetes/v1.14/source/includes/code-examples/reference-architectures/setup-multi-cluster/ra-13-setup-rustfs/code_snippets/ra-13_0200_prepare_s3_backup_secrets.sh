kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" create secret generic s3-access-secret \
  --from-literal=accessKey="${S3_ACCESS_KEY}" \
  --from-literal=secretKey="${S3_SECRET_KEY}"

# RustFS serves a cert-manager certificate; OM must trust the CA that signed it.
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" create secret generic s3-ca-cert \
  --from-literal=ca.crt="$(kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${RUSTFS_NAMESPACE}" get secret rustfs-tls -o jsonpath="{.data['ca\.crt']}" | base64 --decode)"
