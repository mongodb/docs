
.. code-block:: yaml

   # mongot.conf
   syncSource:
      replicaSet:
         hostAndPort: "mongod.search-community:27017"
         scramAuth:
            username: "mongotUser"
            passwordFile: "/passwordFile"
            authSource: "admin"
            tls:
               enabled: false
      replicationReader:
         readPreference: "secondaryPreferred"

   storage:
      dataPath: "/data/mongot"

   server:
      grpc:
         address: "mongot-community.search-community:27028"
         tls:
            mode: "disabled"

   metrics:
      enabled: true
      address: "mongot-community.search-community:9946"

   healthCheck:
      address: "mongot-community.search-community:8080"

   logging:
      verbosity: INFO

