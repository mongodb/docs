echo "Configuring CA certificate (Secret) for mongot..."

mkdir -p certs

kubectl get secret "${MDB_TLS_CA_SECRET_NAME}" \
  -n "${CERT_MANAGER_NAMESPACE}" \
  --context "${K8S_CTX_0}" \
  -o jsonpath='{.data.tls\.crt}' | base64 -d > certs/ca.crt

# The CA Secret must exist in every member cluster so the mongot pods deployed
# there can verify the source replica set's TLS certificate
# (spec.source.external.tls.ca of the MongoDBSearch resource).
for ctx in "${K8S_CTX_0}" "${K8S_CTX_1}"; do
  kubectl create secret generic "${MDB_TLS_CA_SECRET_NAME}" \
    --from-file=ca.crt=certs/ca.crt \
    -n "${MDB_NS}" \
    --context "${ctx}" \
    --dry-run=client -o yaml | kubectl apply --context "${ctx}" -f -
done

echo "[ok] CA Secret configured for mongot in every member cluster"
