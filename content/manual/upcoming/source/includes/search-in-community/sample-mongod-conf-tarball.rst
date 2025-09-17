.. code-block:: yaml

   # MongoDB Configuration File

   # Network configuration
   net:
      port: 27017
      bindIpAll: true  # Equivalent to --bind_ip_all

   # Replica set configuration
   replication:
      replSetName: rs0

   # Security configuration
   #security:
   #   authorization: enabled  # Equivalent to --auth
   #   keyFile: </path/to/keyfile>

   # Search configuration parameters
   setParameter:
      mongotHost: localhost:27027
      searchIndexManagementHostAndPort: localhost:27027

   # Process management configuration
   processManagement:
      fork: true

   # Logging configuration
   systemLog:
      destination: file
      path: /var/log/mongodb/mongod.log
      logAppend: true
