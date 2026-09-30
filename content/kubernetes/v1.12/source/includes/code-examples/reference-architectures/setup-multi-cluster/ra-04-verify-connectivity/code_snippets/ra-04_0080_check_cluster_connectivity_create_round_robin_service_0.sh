kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "connectivity-test" -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: echoserver
spec:
  ports:
    - port: 8080
      targetPort: 8080
      protocol: TCP
  selector:
    app: echoserver0
EOF
