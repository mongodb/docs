kubectl apply --context "${K8S_CLUSTER_2_CONTEXT_NAME}" -n "connectivity-test" -f - <<EOF
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: echoserver2
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: echoserver2
    template:
      metadata:
        labels:
          app: echoserver2
      spec:
        containers:
          - image: k8s.gcr.io/echoserver:1.10
            imagePullPolicy: Always
            name: echoserver2
            ports:
              - containerPort: 8080
EOF
