# Render the manifest once so ${DNS_ZONE}/${CUSTOM_DOMAIN} are substituted.
rendered_manifest=$(eval "cat <<EOF
$(cat yamls/externaldns.yaml)
EOF")

echo "${rendered_manifest}" | kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n external-dns apply -f -
echo "${rendered_manifest}" | kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n external-dns apply -f -
echo "${rendered_manifest}" | kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n external-dns apply -f -
