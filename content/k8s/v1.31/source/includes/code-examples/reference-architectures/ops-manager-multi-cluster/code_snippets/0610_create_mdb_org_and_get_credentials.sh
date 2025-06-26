om_private_key=$(kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" get secret "${OM_NAMESPACE}-om-admin-key" -n "${OPERATOR_NAMESPACE}" -o jsonpath="{.data.privateKey}" | base64 --decode)
test -n "${om_private_key}" || (echo "Error getting private key"; exit 1;)

om_public_key=$(kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" get secret "${OM_NAMESPACE}-om-admin-key" -n "${OPERATOR_NAMESPACE}" -o jsonpath="{.data.publicKey}" | base64 --decode)
test -n "${om_public_key}" || (echo "Error getting private key"; exit 1;)
om_creds="${om_public_key}:${om_private_key}"

om_url=$(kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" get om "om" -n "${OM_NAMESPACE}" -o jsonpath="{.status.opsManager.url}")
test -n "${om_url}" || (echo "Error getting OM's url from resource status"; exit 1;)

om_ca_cert=$(kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" get configmap ca-issuer -n "${OM_NAMESPACE}" -o jsonpath="{.data['mms-ca\.crt']}")
test -n "${om_ca_cert}" || (echo "Error getting OM's CA certificate"; exit 1;)

# we're using kubectl port-forward to port 8443, hence we need to use --insecure
# normally, OM should be accessed from inside the cluster or properly exposed externally

mdb_org_id=$(curl -v --insecure --user "${om_creds}" --digest \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --cacert <(echo -n "${om_ca_cert}") \
  "https://localhost:8443/api/public/v1.0/orgs?name=mdb" | jq -r '.results[]? | select(.isDeleted==false) | .id')

if [ -z "${mdb_org_id}" ]; then
  echo "creating new mdb org"
  curl -v --insecure --user "${om_creds}" --digest \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --cacert <(echo -n "${om_ca_cert}")\
    --data '{ "name" : "mdb" }' \
    "https://localhost:8443/api/public/v1.0/orgs"

  mdb_org_id=$(curl -v --insecure --user "${om_creds}" --digest \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --cacert <(echo -n "${om_ca_cert}") \
    "https://localhost:8443/api/public/v1.0/orgs?name=mdb" | jq -r '.results[0].id')
  test -n "${mdb_org_id}" || (echo "Error getting org id"; exit 1;)
fi

api_keys_response=$(curl -v --insecure --user "${om_creds}" --digest \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --cacert <(echo -n "${om_ca_cert}") \
  --data '{
      "desc" : "API key to manage the org",
      "roles": ["ORG_OWNER"]
    }' \
  "https://localhost:8443/api/public/v1.0/orgs/${mdb_org_id}/apiKeys")

mdb_org_api_key_id=$(jq -r '.id' <(echo "${api_keys_response}"))
test -n "${mdb_org_api_key_id}" || (echo "Error getting mdb org key id"; exit 1;)
mdb_org_private_key=$(jq -r '.privateKey' <(echo "${api_keys_response}"))
test -n "${mdb_org_private_key}" || (echo "Error getting mdb org private key"; exit 1;)
mdb_org_public_key=$(jq -r '.publicKey' <(echo "${api_keys_response}"))
test -n "${mdb_org_public_key}" || (echo "Error getting mdb org public key"; exit 1;)


curl -v --insecure --user "${om_creds}" --digest \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --cacert <(echo -n "${om_ca_cert}") \
  --data '
  [
    { "cidrBlock" : "127.0.0.1/24" }
  ]' \
  --request POST \
  "https://localhost:8443/api/public/v1.0/orgs/${mdb_org_id}/apiKeys/${mdb_org_api_key_id}/accessList"

kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: mdb-org-owner-credentials
stringData:
  publicKey: ${mdb_org_public_key}
  privateKey: ${mdb_org_private_key}
EOF

kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: mdb-org-project-config
data:
  baseUrl: ${om_url}
  orgId: ${mdb_org_id}
  sslMMSCAConfigMap: ca-issuer
  sslRequireValidMMSServerCertificates: "true"
EOF
