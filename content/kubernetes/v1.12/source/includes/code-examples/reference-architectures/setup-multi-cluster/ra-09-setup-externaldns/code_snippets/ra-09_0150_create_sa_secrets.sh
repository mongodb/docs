# create secret with service account key
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n external-dns create secret generic external-dns-sa-secret --from-file credentials.json=secrets/external-dns-sa-key.json
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n external-dns create secret generic external-dns-sa-secret --from-file credentials.json=secrets/external-dns-sa-key.json
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n external-dns create secret generic external-dns-sa-secret --from-file credentials.json=secrets/external-dns-sa-key.json
