SHARD_COUNT=2
MEMBERS_PER_SHARD=1
TIMEOUT=600
INTERVAL=5

HOSTS_ENTRIES=""

# --- Wait for mongos pod IP ---
MONGOS_POD="${MDB_EXTERNAL_CLUSTER_NAME}-mongos-0"
ELAPSED=0
MONGOS_POD_IP=""

echo "Waiting up to ${TIMEOUT}s for pod ${MONGOS_POD} to get a PodIP..."
while [[ ${ELAPSED} -lt ${TIMEOUT} ]]; do
  MONGOS_POD_IP=$(kubectl get pod "${MONGOS_POD}" \
    -n "${MDB_NS}" \
    --context "${K8S_CTX}" \
    -o jsonpath='{.status.podIP}' 2>/dev/null || true)

  if [[ -n "${MONGOS_POD_IP}" && "${MONGOS_POD_IP}" != "None" ]]; then
    echo "Pod ${MONGOS_POD} has PodIP: ${MONGOS_POD_IP}"
    break
  fi

  echo "  ...pod not ready yet (${ELAPSED}s elapsed)"
  sleep ${INTERVAL}
  ELAPSED=$((ELAPSED + INTERVAL))
done

if [[ -z "${MONGOS_POD_IP}" || "${MONGOS_POD_IP}" == "None" ]]; then
  echo "ERROR: Timed out waiting for PodIP" \
    "on pod ${MONGOS_POD} after ${TIMEOUT}s" >&2
fi

MONGOS_EXTERNAL_HOSTNAME=\
"${MDB_EXTERNAL_CLUSTER_NAME}-mongos-0.${MDB_EXTERNAL_DOMAIN}"
echo "Mapping ${MONGOS_EXTERNAL_HOSTNAME}" \
  "-> ${MONGOS_POD_IP} in CoreDNS"
HOSTS_ENTRIES="           ${MONGOS_POD_IP} ${MONGOS_EXTERNAL_HOSTNAME}"

# --- Wait for shard pod IPs ---
for SHARD_IDX in $(seq 0 $((SHARD_COUNT - 1))); do
  for MEMBER_IDX in $(seq 0 $((MEMBERS_PER_SHARD - 1))); do
    SHARD_POD="${MDB_EXTERNAL_CLUSTER_NAME}-${SHARD_IDX}-${MEMBER_IDX}"
    ELAPSED=0
    POD_IP=""

    echo "Waiting up to ${TIMEOUT}s for pod ${SHARD_POD} to get a PodIP..."
    while [[ ${ELAPSED} -lt ${TIMEOUT} ]]; do
      POD_IP=$(kubectl get pod "${SHARD_POD}" \
        -n "${MDB_NS}" \
        --context "${K8S_CTX}" \
        -o jsonpath='{.status.podIP}' 2>/dev/null || true)

      if [[ -n "${POD_IP}" && "${POD_IP}" != "None" ]]; then
        echo "Pod ${SHARD_POD} has PodIP: ${POD_IP}"
        break
      fi

      echo "  ...pod not ready yet (${ELAPSED}s elapsed)"
      sleep ${INTERVAL}
      ELAPSED=$((ELAPSED + INTERVAL))
    done

    if [[ -z "${POD_IP}" || "${POD_IP}" == "None" ]]; then
      echo "ERROR: Timed out waiting for PodIP" \
        "on pod ${SHARD_POD} after ${TIMEOUT}s" >&2
    fi

    SHARD_EXTERNAL_HOSTNAME="${SHARD_POD}.${MDB_EXTERNAL_DOMAIN}"
    echo "Mapping ${SHARD_EXTERNAL_HOSTNAME}" \
      "-> ${POD_IP}"
    HOSTS_ENTRIES="${HOSTS_ENTRIES}
           ${POD_IP} ${SHARD_EXTERNAL_HOSTNAME}"
  done
done

echo ""
echo "Applying CoreDNS ConfigMap with all host entries..."

kubectl --context "${K8S_CTX}" -n kube-system apply -f - <<YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . /etc/resolv.conf {
           max_concurrent 1000
        }
        cache 30
        loop
        reload
        loadbalance
        hosts {
${HOSTS_ENTRIES}
           fallthrough
        }
    }
YAML

kubectl --context "${K8S_CTX}" -n kube-system rollout restart deployment coredns
kubectl --context "${K8S_CTX}" -n kube-system \
  rollout status deployment coredns --timeout=60s
echo "[ok] CoreDNS updated with mongos and shard host entries"
