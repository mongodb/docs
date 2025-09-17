.. code-block:: yaml

   # mongot.conf
   syncSource:
      replicaSet:
         hostAndPort: "mongod.search-community:27017"
         username: "mongotUser"
         passwordFile: "/passwordFile"
         authSource: "admin"
         tls: false
   storage:
      dataPath: "/data/mongot"
   server:
      grpc:
         address: "mongot-community.search-community:27028"
   metrics:
      enabled: true
      address: "mongot-community.search-community:9946"
   healthCheck:
      address: "mongot-community.search-community:8080"
   logging:
      verbosity: INFO