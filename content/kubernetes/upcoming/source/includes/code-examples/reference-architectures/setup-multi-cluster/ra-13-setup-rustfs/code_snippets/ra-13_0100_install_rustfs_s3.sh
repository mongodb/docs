kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" create namespace "${RUSTFS_NAMESPACE}" --dry-run=client -o yaml | \
  kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" apply -f -

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${RUSTFS_NAMESPACE}" delete job rustfs-create-buckets --ignore-not-found=true || true

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${RUSTFS_NAMESPACE}" apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: rustfs-cert
spec:
  dnsNames:
  - rustfs.${RUSTFS_NAMESPACE}.svc.cluster.local
  duration: 240h0m0s
  issuerRef:
    name: my-ca-issuer
    kind: ClusterIssuer
  renewBefore: 120h0m0s
  secretName: rustfs-tls
  usages:
  - server auth
---
apiVersion: v1
kind: Service
metadata:
  name: rustfs
  labels:
    app: rustfs
spec:
  selector:
    app: rustfs
  ports:
    - name: s3-https
      port: 443
      targetPort: 9000
    - name: s3
      port: 9000
      targetPort: 9000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rustfs
  labels:
    app: rustfs
spec:
  replicas: 1
  selector:
    matchLabels:
      app: rustfs
  template:
    metadata:
      labels:
        app: rustfs
      annotations:
        # RustFS needs no mesh sidecar; keep behavior identical with and
        # without Istio.
        sidecar.istio.io/inject: "false"
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        runAsGroup: 10001
        fsGroup: 10001
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: rustfs
          image: quay.io/rustfs/rustfs:1.0.0
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
            runAsNonRoot: true
          env:
            - name: RUSTFS_ACCESS_KEY
              value: "${S3_ACCESS_KEY}"
            - name: RUSTFS_SECRET_KEY
              value: "${S3_SECRET_KEY}"
            - name: RUSTFS_VOLUMES
              value: /data
            - name: RUSTFS_ADDRESS
              value: 0.0.0.0:9000
            - name: RUSTFS_CONSOLE_ENABLE
              value: "false"
            - name: RUSTFS_TLS_PATH
              value: /opt/tls
          ports:
            - name: s3
              containerPort: 9000
          readinessProbe:
            httpGet:
              scheme: HTTPS
              path: /health
              port: 9000
            initialDelaySeconds: 5
            periodSeconds: 3
          volumeMounts:
            - name: data
              mountPath: /data
            - name: tls
              mountPath: /opt/tls
              readOnly: true
      volumes:
        - name: data
          emptyDir: {}
        - name: tls
          secret:
            secretName: rustfs-tls
            items:
              - key: tls.crt
                path: rustfs_cert.pem
              - key: tls.key
                path: rustfs_key.pem
---
apiVersion: batch/v1
kind: Job
metadata:
  name: rustfs-create-buckets
spec:
  backoffLimit: 1
  template:
    metadata:
      annotations:
        # istio-proxy keeps running after the aws-cli container exits, so an
        # injected Job never reaches Complete.
        sidecar.istio.io/inject: "false"
    spec:
      restartPolicy: Never
      containers:
        - name: aws-cli
          image: public.ecr.aws/aws-cli/aws-cli:latest
          env:
            - name: AWS_ACCESS_KEY_ID
              value: "${S3_ACCESS_KEY}"
            - name: AWS_SECRET_ACCESS_KEY
              value: "${S3_SECRET_KEY}"
            - name: AWS_DEFAULT_REGION
              value: us-east-1
            - name: S3_ENDPOINT
              value: "https://${S3_ENDPOINT}"
            - name: S3_OPLOG_BUCKET_NAME
              value: "${S3_OPLOG_BUCKET_NAME}"
            - name: S3_SNAPSHOT_BUCKET_NAME
              value: "${S3_SNAPSHOT_BUCKET_NAME}"
          command: ["sh", "-ec"]
          args:
            - |
              aws_opts="--endpoint-url \$S3_ENDPOINT --no-verify-ssl --cli-connect-timeout 5 --cli-read-timeout 10"
              attempt=0
              until aws \$aws_opts s3api list-buckets; do
                attempt=\$((attempt + 1))
                if [ "\$attempt" -ge 24 ]; then
                  echo "RustFS endpoint \$S3_ENDPOINT not reachable after \$attempt attempts" >&2
                  exit 1
                fi
                sleep 5
              done
              aws \$aws_opts s3api create-bucket --bucket "\$S3_OPLOG_BUCKET_NAME"
              aws \$aws_opts s3api create-bucket --bucket "\$S3_SNAPSHOT_BUCKET_NAME"
EOF

kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${RUSTFS_NAMESPACE}" wait --for=condition=available deployment/rustfs --timeout=300s
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${RUSTFS_NAMESPACE}" wait --for=condition=complete job/rustfs-create-buckets --timeout=240s
