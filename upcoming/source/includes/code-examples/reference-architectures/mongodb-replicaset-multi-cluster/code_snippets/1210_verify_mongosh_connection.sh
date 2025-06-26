external_ip="$(kubectl get --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" svc "${RS_RESOURCE_NAME}-0-0-svc-external" -o=jsonpath="{.status.loadBalancer.ingress[0].ip}")"

mkdir -p certs
kubectl get --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" cm/ca-issuer -o=jsonpath='{.data.ca-pem}' > certs/ca.crt

mongosh --host "${external_ip}" --username rs-user --password password --tls --tlsCAFile certs/ca.crt --tlsAllowInvalidHostnames --eval "db.runCommand({connectionStatus : 1})"
