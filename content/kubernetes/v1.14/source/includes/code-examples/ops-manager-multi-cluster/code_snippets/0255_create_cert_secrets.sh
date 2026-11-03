kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${NAMESPACE}" create secret tls cert-prefix-om-cert \
  --cert=certs/om.crt \
  --key=certs/om.key

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${NAMESPACE}" create secret tls cert-prefix-om-db-cert \
  --cert=certs/appdb.crt \
  --key=certs/appdb.key

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${NAMESPACE}" create configmap om-cert-ca --from-file="mms-ca.crt=certs/ca.crt"
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${NAMESPACE}" create configmap appdb-cert-ca --from-file="ca-pem=certs/ca.crt"
