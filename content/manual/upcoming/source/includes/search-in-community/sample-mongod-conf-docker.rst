.. code-block:: yaml

   # MongoDB Configuration File

   # Network configuration
   net:
      port: 27017
      bindIpAll: true  # Equivalent to --bind_ip_all

   # Replica set configuration
   replication:
      replSetName: rs0

   # Search configuration parameters
   setParameter:
      # Server parameters to advise mongod of mongot availability for search index management and querying
      searchIndexManagementHostAndPort: mongot-community.search-community:27028
      mongotHost: mongot-community.search-community:27028
      skipAuthenticationToSearchIndexManagementServer: false
      useGrpcForSearch: true

   # Security configuration
   security:
      authorization: enabled  # Equivalent to --auth
      keyFile: /keyfile
