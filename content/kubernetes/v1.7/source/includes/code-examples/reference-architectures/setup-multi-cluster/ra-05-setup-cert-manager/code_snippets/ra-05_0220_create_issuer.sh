kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-cluster-issuer
spec:
  selfSigned: {}
EOF

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" wait --for=condition=Ready clusterissuer selfsigned-cluster-issuer

kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: my-selfsigned-ca
  namespace: cert-manager
spec:
  isCA: true
  commonName: my-selfsigned-ca
  secretName: root-secret
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: selfsigned-cluster-issuer
    kind: ClusterIssuer
EOF

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" wait --for=condition=Ready -n cert-manager certificate my-selfsigned-ca

kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: my-ca-issuer
spec:
  ca:
    secretName: root-secret
EOF

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" wait --for=condition=Ready clusterissuer my-ca-issuer
