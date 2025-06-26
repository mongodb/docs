mkdir -p certs

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" get secret root-secret -n cert-manager -o jsonpath="{.data['ca\.crt']}" | base64 --decode > certs/ca.crt
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create cm ca-issuer -n "${MDB_NAMESPACE}" --from-file=ca-pem=certs/ca.crt --from-file=mms-ca.crt=certs/ca.crt
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create cm ca-issuer -n "${OM_NAMESPACE}" --from-file=ca-pem=certs/ca.crt --from-file=mms-ca.crt=certs/ca.crt
