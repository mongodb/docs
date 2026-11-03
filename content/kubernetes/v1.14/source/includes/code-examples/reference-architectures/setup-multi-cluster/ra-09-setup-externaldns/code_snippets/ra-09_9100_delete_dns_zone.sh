# Delete all records except NS and SOA (which are system-managed)
gcloud dns record-sets list --zone="${DNS_ZONE}" --format=json 2>/dev/null | jq -c '.[]' | while read -r record; do
  NAME=$(echo "${record}" | jq -r '.name')
  TYPE=$(echo "${record}" | jq -r '.type')

  # Skip NS and SOA records - they are managed by Cloud DNS and cannot be deleted
  if [[ "${TYPE}" != "NS" && "${TYPE}" != "SOA" ]]; then
    gcloud dns record-sets delete "${NAME}" --zone="${DNS_ZONE}" --type="${TYPE}" -q || true
  fi
done

gcloud dns managed-zones delete "${DNS_ZONE}" -q || true
