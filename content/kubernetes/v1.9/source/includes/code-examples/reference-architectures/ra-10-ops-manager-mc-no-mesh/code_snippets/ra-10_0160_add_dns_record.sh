ip_address=$(gcloud compute forwarding-rules describe om-forwarding-rule --global --format="get(IPAddress)")

gcloud dns record-sets create "${OPS_MANAGER_EXTERNAL_DOMAIN}" --zone="${DNS_ZONE}" --type="A" --ttl="300" --rrdatas="${ip_address}"
