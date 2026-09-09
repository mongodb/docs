kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: test-selfsigned-cert
  namespace: cert-manager
spec:
  dnsNames:
    - example.com
  secretName: test-selfsigned-cert-tls
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
EOF

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" wait -n cert-manager --for=condition=Ready certificate test-selfsigned-cert

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete -n cert-manager certificate test-selfsigned-cert
