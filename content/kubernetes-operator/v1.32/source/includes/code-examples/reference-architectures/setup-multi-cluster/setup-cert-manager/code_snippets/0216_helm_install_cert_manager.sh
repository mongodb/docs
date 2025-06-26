helm install \
  cert-manager jetstack/cert-manager \
  --kube-context "${K8S_CLUSTER_0_CONTEXT_NAME}" \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true
