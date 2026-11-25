ip_address=$(gcloud_retry compute forwarding-rules describe "${OM_FORWARDING_RULE_NAME}" --global --format="get(IPAddress)")

gcloud_retry dns record-sets create "${OPS_MANAGER_EXTERNAL_DOMAIN}" --zone="${DNS_ZONE}" --type="A" --ttl="300" --rrdatas="${ip_address}"
