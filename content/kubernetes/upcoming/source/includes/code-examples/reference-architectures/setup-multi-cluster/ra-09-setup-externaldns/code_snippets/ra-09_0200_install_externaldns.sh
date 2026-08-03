if [[ -z "${DNS_ZONE:-}" ]]; then
  echo "ERROR: DNS_ZONE is not set or empty; refusing to render externaldns.yaml (empty zone-id-filter would match all zones)" >&2
  exit 1
fi
sed "s|\${DNS_ZONE}|${DNS_ZONE}|g" yamls/externaldns.yaml | kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n external-dns apply -f -
sed "s|\${DNS_ZONE}|${DNS_ZONE}|g" yamls/externaldns.yaml | kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n external-dns apply -f -
sed "s|\${DNS_ZONE}|${DNS_ZONE}|g" yamls/externaldns.yaml | kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n external-dns apply -f -
