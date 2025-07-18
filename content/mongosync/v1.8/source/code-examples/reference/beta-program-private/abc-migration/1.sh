./bin/mongosync \
      --cluster0 <cluster-A-connection-string> \
      --cluster1 <cluster-B-connection-string> \
      --migrationName <string>

./bin/mongosync \
      --cluster0 <cluster-B-connection-string> \
      --cluster1 <cluster-C-connection-string> \
      --migrationName <string>
