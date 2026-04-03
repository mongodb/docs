# 1. Self-signed bootstrap issuer
kubectl apply --context "${K8S_CTX}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: ${MDB_TLS_SELF_SIGNED_ISSUER}
spec:
  selfSigned: {}
EOF
kubectl --context "${K8S_CTX}" wait --for=condition=Ready clusterissuer "${MDB_TLS_SELF_SIGNED_ISSUER}" --timeout=120s

# 2. CA certificate
kubectl apply --context "${K8S_CTX}" -n "${CERT_MANAGER_NAMESPACE}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${MDB_TLS_CA_CERT_NAME}
  namespace: ${CERT_MANAGER_NAMESPACE}
spec:
  isCA: true
  commonName: ${MDB_TLS_CA_CERT_NAME}
  secretName: ${MDB_TLS_CA_SECRET_NAME}
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: ${MDB_TLS_SELF_SIGNED_ISSUER}
    kind: ClusterIssuer
EOF
kubectl --context "${K8S_CTX}" wait --for=condition=Ready -n "${CERT_MANAGER_NAMESPACE}" certificate "${MDB_TLS_CA_CERT_NAME}" --timeout=300s

# 3. CA issuer referencing CA secret
kubectl apply --context "${K8S_CTX}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: ${MDB_TLS_CA_ISSUER}
spec:
  ca:
    secretName: ${MDB_TLS_CA_SECRET_NAME}
EOF
kubectl --context "${K8S_CTX}" wait --for=condition=Ready clusterissuer "${MDB_TLS_CA_ISSUER}" --timeout=120s

# 4. Extract CA cert (only ca.crt) and publish to ConfigMap & Secret
TMP_CA_CERT="$(mktemp)"; trap 'rm -f "${TMP_CA_CERT}"' EXIT
ca_b64="$(kubectl --context "${K8S_CTX}" get secret "${MDB_TLS_CA_SECRET_NAME}" -n "${CERT_MANAGER_NAMESPACE}" -o jsonpath="{.data['ca\\.crt']}")"
[[ -n "${ca_b64}" ]] || { echo "CA certificate key ca.crt missing in secret ${MDB_TLS_CA_SECRET_NAME}" >&2; exit 1; }
printf '%s' "${ca_b64}" | base64 --decode > "${TMP_CA_CERT}"

# Create ConfigMap (MongoDBCommunity) and Secret (external search source) containing CA
kubectl --context "${K8S_CTX}" create configmap "${MDB_TLS_CA_CONFIGMAP}" -n "${MDB_NS}" \
  --from-file=ca-pem="${TMP_CA_CERT}" --from-file=mms-ca.crt="${TMP_CA_CERT}" --from-file=ca.crt="${TMP_CA_CERT}" \
  --dry-run=client -o yaml | kubectl --context "${K8S_CTX}" apply -f -

kubectl --context "${K8S_CTX}" create secret generic "${MDB_TLS_CA_SECRET_NAME}" -n "${MDB_NS}" \
  --from-file=ca.crt="${TMP_CA_CERT}" \
  --dry-run=client -o yaml | kubectl --context "${K8S_CTX}" apply -f -

echo "CA issuer and artifacts prepared (ConfigMap: ${MDB_TLS_CA_CONFIGMAP}, Secret: ${MDB_TLS_CA_SECRET_NAME})."
