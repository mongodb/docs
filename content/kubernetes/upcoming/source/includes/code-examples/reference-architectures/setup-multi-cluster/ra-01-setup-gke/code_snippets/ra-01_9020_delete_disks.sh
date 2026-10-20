# Delete persistent disks left behind by this run's GKE clusters.
# Disks can remain after cluster deletion (PVCs with reclaimPolicy: Retain).
# GKE records the owning cluster in the disk's labels.goog-k8s-cluster-name,
# so each cluster is cleaned up without touching disks of concurrent runs in
# the same project. Best-effort: failures only warn, they never fail teardown.

if [[ -z "${MDB_GKE_PROJECT:-}" ]]; then
  echo "MDB_GKE_PROJECT not set; skipping disk cleanup"
else
  delete_disks() {
    local cluster="${1}" zone="${2}" disks

    # An empty or unexpected cluster name would broaden (or invalidate) the
    # label filter, so refuse to delete anything for it.
    if [[ -z "${cluster}" ]] || ! [[ "${cluster}" =~ ^k8s-mdb-[0-2](-[a-z0-9]+)*$ ]]; then
      echo "Skipping disk cleanup in ${zone}: invalid or missing cluster owner"
      return 0
    fi

    echo "Checking for disks owned by ${cluster} in zone: ${zone}"
    disks=$(gcloud compute disks list \
      --project="${MDB_GKE_PROJECT}" \
      --filter="zone:${zone} AND labels.goog-k8s-cluster-name=${cluster} AND name~^pvc-" \
      --format="value(name)" 2>/dev/null || true)

    if [[ -z "${disks}" ]]; then
      echo "No disks found for ${cluster} in ${zone}"
      return 0
    fi

    echo "Deleting disks for ${cluster} in ${zone}: ${disks}"
    # shellcheck disable=SC2086 # intentional word-split: pass each disk as an arg
    gcloud compute disks delete ${disks} \
      --zone="${zone}" \
      --project="${MDB_GKE_PROJECT}" \
      --quiet || echo "Warning: Failed to delete one or more disks in ${zone}"
  }

  delete_disks "${K8S_CLUSTER_0}" "${K8S_CLUSTER_0_ZONE}"
  delete_disks "${K8S_CLUSTER_1}" "${K8S_CLUSTER_1_ZONE}"
  delete_disks "${K8S_CLUSTER_2}" "${K8S_CLUSTER_2_ZONE}"
fi
