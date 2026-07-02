kubectl wait --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "connectivity-test" --for=condition=ready pod -l statefulset.kubernetes.io/pod-name=echoserver0-0 --timeout=60s
kubectl wait --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "connectivity-test" --for=condition=ready pod -l statefulset.kubernetes.io/pod-name=echoserver1-0 --timeout=60s
kubectl wait --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "connectivity-test" --for=condition=ready pod -l statefulset.kubernetes.io/pod-name=echoserver2-0 --timeout=60s
