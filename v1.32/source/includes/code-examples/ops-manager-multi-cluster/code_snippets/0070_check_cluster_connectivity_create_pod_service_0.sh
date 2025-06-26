kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${NAMESPACE}" -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: echoserver0-0
spec:
  ports:
    - port: 8080
      targetPort: 8080
      protocol: TCP
  selector:
    statefulset.kubernetes.io/pod-name: "echoserver0-0"
EOF
