delete_failed=0

gcloud container clusters delete "${K8S_CLUSTER_0}" --zone="${K8S_CLUSTER_0_ZONE}" -q &
pid0=$!
gcloud container clusters delete "${K8S_CLUSTER_1}" --zone="${K8S_CLUSTER_1_ZONE}" -q &
pid1=$!
gcloud container clusters delete "${K8S_CLUSTER_2}" --zone="${K8S_CLUSTER_2_ZONE}" -q &
pid2=$!

wait "${pid0}" || delete_failed=1
wait "${pid1}" || delete_failed=1
wait "${pid2}" || delete_failed=1

if (( delete_failed )); then
  echo "WARNING: failed to delete one or more GKE clusters (see errors above). Clusters still present:"
  gcloud container clusters list || true
fi

exit "${delete_failed}"
