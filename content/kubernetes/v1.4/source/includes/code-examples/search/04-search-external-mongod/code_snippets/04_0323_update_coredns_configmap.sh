SEARCH_IP=$(kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get svc "${MDB_SEARCH_HOSTNAME}" -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
if [ -z "${SEARCH_IP}" ]; then
  SEARCH_IP=$(kubectl --context "${K8S_CTX}" -n "${MDB_NS}" get svc "${MDB_SEARCH_HOSTNAME}" -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
fi

if [ -z "${SEARCH_IP}" ]; then
  echo "Error: Could not get LoadBalancer external IP/hostname for service ${MDB_SEARCH_HOSTNAME}"
  exit 1
fi

echo "Using LoadBalancer external address: ${SEARCH_IP}"

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
           ${SEARCH_IP} ${MDB_SEARCH_HOSTNAME}
           fallthrough
        }
    }
YAML

kubectl --context "${K8S_CTX}" -n kube-system rollout restart deployment coredns
