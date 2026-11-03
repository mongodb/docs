mkdir -p certs

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" get secret cert-prefix-om-cert -o jsonpath="{.data['tls\.crt']}" | base64 --decode > certs/tls.crt
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" get secret cert-prefix-om-cert -o jsonpath="{.data['tls\.key']}" | base64 --decode > certs/tls.key

gcloud_retry compute ssl-certificates create "${OM_CERTIFICATE_NAME}" --certificate=certs/tls.crt --private-key=certs/tls.key
