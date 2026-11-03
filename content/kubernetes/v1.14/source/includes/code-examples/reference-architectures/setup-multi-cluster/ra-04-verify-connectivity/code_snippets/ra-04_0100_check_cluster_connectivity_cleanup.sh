kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "connectivity-test" delete statefulset echoserver0
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "connectivity-test" delete statefulset echoserver1
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "connectivity-test" delete statefulset echoserver2
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "connectivity-test" delete service echoserver
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "connectivity-test" delete service echoserver
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "connectivity-test" delete service echoserver
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "connectivity-test" delete service echoserver0-0
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "connectivity-test" delete service echoserver1-0
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "connectivity-test" delete service echoserver2-0
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" delete ns "connectivity-test"
kubectl --context "${K8S_CLUSTER_1_CONTEXT_NAME}" delete ns "connectivity-test"
kubectl --context "${K8S_CLUSTER_2_CONTEXT_NAME}" delete ns "connectivity-test"
