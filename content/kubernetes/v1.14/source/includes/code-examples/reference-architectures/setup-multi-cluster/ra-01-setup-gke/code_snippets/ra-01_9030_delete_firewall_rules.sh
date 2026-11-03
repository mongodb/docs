# GKE auto-deletes its own managed firewall rules (gke-<cluster>-<hash>-*) when a
# cluster is deleted, but the LoadBalancer Service firewall rules (k8s-fw-*,
# k8s-*-hc) are left behind. Delete this run's leftovers so they don't pile up
# and exhaust the project FIREWALLS quota across CI runs. The LB rules carry the
# node network tag gke-<cluster>-<hash>-node, so match on that. Best-effort.

if [[ -z "${MDB_GKE_PROJECT:-}" ]]; then
  echo "MDB_GKE_PROJECT not set; skipping firewall-rule cleanup"
else
  for cluster in "${K8S_CLUSTER_0:-}" "${K8S_CLUSTER_1:-}" "${K8S_CLUSTER_2:-}"; do
    [[ -z "${cluster}" ]] && continue
    leaked=$(gcloud compute firewall-rules list \
      --project="${MDB_GKE_PROJECT}" \
      --filter="targetTags.list()~gke-${cluster}-" \
      --format="value(name)" || true)
    if [[ -n "${leaked}" ]]; then
      echo "Deleting leaked firewall rules for ${cluster}: ${leaked}"
      # shellcheck disable=SC2086 # intentional word-split: pass each rule as an arg
      gcloud compute firewall-rules delete ${leaked} \
        --project="${MDB_GKE_PROJECT}" --quiet || true
    else
      echo "No leaked firewall rules found for ${cluster}"
    fi
  done
fi
