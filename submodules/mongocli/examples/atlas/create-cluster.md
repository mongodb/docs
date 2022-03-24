# Create a Cluster

To create and get the connection string for a cluster you can do:

```bash
mongocli atlas clusters create MyCluster \
  --region EASTERN_US \
  --members 3 \
  --tier M30 \
  --provider GCP \
  --mdbVersion 4.4 \
  --diskSizeGB 30 && \
mongocli atlas clusters watch MyCluster && \
mongocli atlas clusters describe MyCluster -o go-template="{{.SrvAddress}}"
```
