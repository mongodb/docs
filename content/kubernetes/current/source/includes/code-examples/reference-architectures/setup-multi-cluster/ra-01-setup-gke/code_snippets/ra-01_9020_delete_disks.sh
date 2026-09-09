# Delete persistent disks in all cluster zones
# Disks may remain after cluster deletion (PVCs with reclaimPolicy: Retain)

ZONES=("${K8S_CLUSTER_0_ZONE}" "${K8S_CLUSTER_1_ZONE}" "${K8S_CLUSTER_2_ZONE}")

for zone in "${ZONES[@]}"; do
  echo "Checking for disks in zone: ${zone}"
  DISKS=$(gcloud compute disks list \
    --project="${MDB_GKE_PROJECT}" \
    --filter="zone:${zone}" \
    --format="csv[no-heading](name)" 2>/dev/null || echo "")

  if [[ -n "${DISKS}" ]]; then
    echo "${DISKS}" | while read -r disk_name; do
      [[ -z "${disk_name}" ]] && continue
      echo "Deleting disk: ${disk_name} in ${zone}"
      gcloud compute disks delete "${disk_name}" \
        --zone="${zone}" \
        --project="${MDB_GKE_PROJECT}" \
        --quiet || echo "Warning: Failed to delete disk ${disk_name}"
    done
  else
    echo "No disks found in ${zone}"
  fi
done
