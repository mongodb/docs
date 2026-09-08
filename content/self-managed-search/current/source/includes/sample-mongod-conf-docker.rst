.. :snippet-start: sample-mongod-conf-docker
.. :snippet-output: /content/search/source/includes/tutorial/procedures/sample-mongod-conf-docker.rst, /content/vector-search/source/includes/quick-start/procedures/sample-mongod-conf-docker.rst

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
         searchTLSMode: disabled

.. :snippet-end: