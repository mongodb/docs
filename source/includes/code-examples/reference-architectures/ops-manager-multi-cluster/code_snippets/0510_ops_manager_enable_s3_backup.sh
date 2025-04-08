kubectl apply --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${OM_NAMESPACE}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBOpsManager
metadata:
  name: om
spec:
  topology: MultiCluster
  version: "${OPS_MANAGER_VERSION}"
  adminCredentials: om-admin-user-credentials
  externalConnectivity:
    type: LoadBalancer
  security:
    certsSecretPrefix: cert-prefix
    tls:
      ca: ca-issuer
  clusterSpecList:
    - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
      members: 1
      backup:
        members: 0
    - clusterName: "${K8S_CLUSTER_1_CONTEXT_NAME}"
      members: 1
      backup:
        members: 0
    - clusterName: "${K8S_CLUSTER_2_CONTEXT_NAME}"
      members: 0
      backup:
        members: 1
  applicationDatabase:
    version: "${APPDB_VERSION}"
    topology: MultiCluster
    security:
      certsSecretPrefix: cert-prefix
      tls:
        ca: ca-issuer
    clusterSpecList:
      - clusterName: "${K8S_CLUSTER_0_CONTEXT_NAME}"
        members: 3
      - clusterName: "${K8S_CLUSTER_1_CONTEXT_NAME}"
        members: 2
  backup:
    enabled: true
    s3Stores:
      - name: my-s3-block-store
        s3SecretRef:
          name: "s3-access-secret"
        pathStyleAccessEnabled: true
        s3BucketEndpoint: "${S3_ENDPOINT}"
        s3BucketName: "${S3_SNAPSHOT_BUCKET_NAME}"
        customCertificateSecretRefs:
          - name: s3-ca-cert
            key: ca.crt
    s3OpLogStores:
      - name: my-s3-oplog-store
        s3SecretRef:
          name: "s3-access-secret"
        s3BucketEndpoint: "${S3_ENDPOINT}"
        s3BucketName: "${S3_OPLOG_BUCKET_NAME}"
        pathStyleAccessEnabled: true
        customCertificateSecretRefs:
          - name: s3-ca-cert
            key: ca.crt
EOF
