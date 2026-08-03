set -o pipefail
gcloud dns record-sets list --zone="${DNS_ZONE}" --format=json | jq -c '.[]' | while read -r record; do
  NAME=$(echo "${record}" | jq -r '.name')
  TYPE=$(echo "${record}" | jq -r '.type')

  if [[ "${TYPE}" != "NS" && "${TYPE}" != "SOA" ]]; then
    gcloud dns record-sets delete "${NAME}" --zone="${DNS_ZONE}" --type="${TYPE}"
  fi
done

gcloud dns managed-zones delete "${DNS_ZONE}" -q
