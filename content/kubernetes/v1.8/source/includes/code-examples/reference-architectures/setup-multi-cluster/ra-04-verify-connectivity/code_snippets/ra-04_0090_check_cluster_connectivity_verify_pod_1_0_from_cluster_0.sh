source_cluster=${K8S_CLUSTER_0_CONTEXT_NAME}
target_pod="echoserver1-0"
source_pod="echoserver0-0"
target_url="http://${target_pod}.connectivity-test.svc.cluster.local:8080"
echo "Checking cross-cluster DNS resolution and connectivity from ${source_pod} in ${source_cluster} to ${target_pod}"
out=$(kubectl exec --context "${source_cluster}" -n "connectivity-test" "${source_pod}" -- \
  /bin/bash -c "curl -v ${target_url}" 2>&1);

if grep "Hostname: ${target_pod}" &>/dev/null <<< "${out}"
then
  echo "SUCCESS"
else
  echo "ERROR: ${out}"
  return 1
fi
