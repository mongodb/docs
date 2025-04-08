svcneg0=$(kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" get svcneg -o=jsonpath='{.items[0].metadata.name}')

gcloud compute backend-services add-backend om-backend-service \
    --global \
    --network-endpoint-group="${svcneg0}" \
    --network-endpoint-group-zone="${K8S_CLUSTER_0_ZONE}" \
    --balancing-mode RATE --max-rate-per-endpoint 5
