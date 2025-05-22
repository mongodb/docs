.. tabs::

   .. tab:: Replica Set
      :tabid: repl
            
      The following replica set connection string includes these
      elements:
      
      - The :urioption:`replicaSet` option
      - The hostname(s) of the :binary:`~bin.mongod` instance(s) as
        listed in the replica set configuration
      - It authenticates as user ``myDatabaseUser`` with the password
        ``D1fficultP%40ssw0rd`` to :ref:`enforce access control 
        <enable-access-control>`

      .. include:: /includes/connection-examples-by-language-onprem-srv-rs.rst

      .. include:: /includes/fact-pct-encode-uri.rst

   .. tab:: Sharded Cluster
      :tabid: sharded

      The following sharded cluster connection string includes the
      these elements:

      - The :binary:`~bin.mongos` hosts in the connection string
      - It authenticates as user ``myDatabaseUser`` with the password
        ``D1fficultP%40ssw0rd`` to :ref:`enforce access control 
        <enable-access-control>`

      .. include:: /includes/connection-examples-by-language-onprem-srv-sharded.rst

      .. include:: /includes/fact-pct-encode-uri.rst

   .. tab:: Standalone
      :tabid: standalone

      The following standalone connection string authenticates as user ``myDatabaseUser`` with the password ``D1fficultP%40ssw0rd`` to :ref:`enforce access control <enable-access-control>`:

      .. include:: /includes/connection-examples-by-language-onprem-srv-standalone.rst

      .. include:: /includes/fact-pct-encode-uri.rst