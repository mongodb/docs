cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasDeployment
      metadata:
        name: my-cluster
        labels:
          app.kubernetes.io/version: 1.6.0
      spec:
        name: Test Atlas Operator Cluster
        DeploymentSpec:
          encryptionAtRestProvider: "GCP"
      EOF