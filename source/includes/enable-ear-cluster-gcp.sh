cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasDeployment
      metadata:
        name: my-cluster
      spec:
        name: Test Atlas Operator Cluster
        DeploymentSpec:
          encryptionAtRestProvider: "GCP"
      EOF