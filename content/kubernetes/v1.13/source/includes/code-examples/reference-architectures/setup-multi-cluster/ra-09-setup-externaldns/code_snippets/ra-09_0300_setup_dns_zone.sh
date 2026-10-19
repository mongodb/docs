FQ_CLUSTER_0="projects/${MDB_GKE_PROJECT}/locations/${K8S_CLUSTER_0_ZONE}/clusters/${K8S_CLUSTER_0}"
FQ_CLUSTER_1="projects/${MDB_GKE_PROJECT}/locations/${K8S_CLUSTER_1_ZONE}/clusters/${K8S_CLUSTER_1}"
FQ_CLUSTER_2="projects/${MDB_GKE_PROJECT}/locations/${K8S_CLUSTER_2_ZONE}/clusters/${K8S_CLUSTER_2}"

gcloud dns managed-zones create "${DNS_ZONE}" \
  --description="" \
  --dns-name="${CUSTOM_DOMAIN}" \
  --visibility="private" \
  --gkeclusters="${FQ_CLUSTER_0}","${FQ_CLUSTER_1}","${FQ_CLUSTER_2}"
