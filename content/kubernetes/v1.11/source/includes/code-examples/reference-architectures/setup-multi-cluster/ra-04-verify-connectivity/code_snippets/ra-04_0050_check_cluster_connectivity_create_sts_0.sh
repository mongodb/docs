kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "connectivity-test" -f - <<EOF
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: echoserver0
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: echoserver0
    template:
      metadata:
        labels:
          app: echoserver0
      spec:
        containers:
          - image: k8s.gcr.io/echoserver:1.10
            imagePullPolicy: Always
            name: echoserver0
            ports:
              - containerPort: 8080
EOF
