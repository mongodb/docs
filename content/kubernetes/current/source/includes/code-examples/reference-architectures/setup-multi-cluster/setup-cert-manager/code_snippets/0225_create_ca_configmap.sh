mkdir -p certs

openssl s_client -showcerts -verify 2 \
-connect downloads.mongodb.com:443 -servername downloads.mongodb.com < /dev/null \
| awk '/BEGIN/,/END/{ if(/BEGIN/){a++}; out="certs/cert"a".crt"; print >out}'

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" get secret root-secret -n cert-manager -o jsonpath="{.data['ca\.crt']}" | base64 --decode > certs/ca.crt
cat certs/ca.crt certs/cert2.crt certs/cert3.crt  >> certs/mms-ca.crt

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create cm ca-issuer -n "${MDB_NAMESPACE}" --from-file=ca-pem=certs/mms-ca.crt --from-file=mms-ca.crt=certs/mms-ca.crt
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create cm ca-issuer -n "${OM_NAMESPACE}" --from-file=ca-pem=certs/mms-ca.crt --from-file=mms-ca.crt=certs/mms-ca.crt
