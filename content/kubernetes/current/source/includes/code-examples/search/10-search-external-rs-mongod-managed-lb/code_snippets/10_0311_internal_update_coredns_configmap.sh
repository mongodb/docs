# Simulates customer DNS: in-cluster mongod resolves the external Envoy
# hostname to the proxy Service. A name rewrite survives Service IP changes.
PROXY_SVC_FQDN="${MDB_SEARCH_RESOURCE_NAME}-search-0-proxy-svc.${MDB_NS}.svc.cluster.local"

echo "Mapping ${MDB_SEARCH_EXTERNAL_HOSTNAME} -> ${PROXY_SVC_FQDN} in CoreDNS"

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
        rewrite name exact ${MDB_SEARCH_EXTERNAL_HOSTNAME} ${PROXY_SVC_FQDN}
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
    }
YAML

kubectl --context "${K8S_CTX}" -n kube-system rollout restart deployment coredns
kubectl --context "${K8S_CTX}" -n kube-system \
  rollout status deployment coredns --timeout=60s
echo "[ok] CoreDNS resolves ${MDB_SEARCH_EXTERNAL_HOSTNAME}"
