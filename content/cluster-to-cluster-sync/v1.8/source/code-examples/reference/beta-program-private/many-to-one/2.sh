./bin/mongosync \
      --cluster0 "mongodb://localhost:27000" \
      --cluster1 "mongodb://localhost:35000" \
      --migrationName "cluster_27000_to_cluster_35000_sync"

./bin/mongosync \
      --cluster0 "mongodb://localhost:27001" \
      --cluster1 "mongodb://localhost:35000" \
      --migrationName "cluster_27001_to_cluster_35000_sync"
