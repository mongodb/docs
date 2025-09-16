kubectl apply --context "${K8S_CLUSTER_1_CONTEXT_NAME}" -n "connectivity-test" -f - <<EOF
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: echoserver1
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: echoserver1
    template:
      metadata:
        labels:
          app: echoserver1
      spec:
        containers:
          - image: k8s.gcr.io/echoserver:1.10
            imagePullPolicy: Always
            name: echoserver1
            ports:
              - containerPort: 8080
EOF
