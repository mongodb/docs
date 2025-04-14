.. tabs::

   .. tab:: Replica Set
      :tabid: repl
            
      The following replica set connection string includes these
      elements:
      
      - The :urioption:`replicaSet` option
      - The hostname(s) of the :binary:`~bin.mongod` instance(s) as
        listed in the replica set configuration
      - A username and password to :doc:`enforce access control 
        </tutorial/enable-authentication>`:

      .. include:: /includes/connection-examples-by-language-onprem-standard-rs.rst

      .. include:: /includes/fact-pct-encode-uri.rst

   .. tab:: Sharded Cluster
      :tabid: sharded

      The following sharded cluster connection string includes the
      these elements:

      - The :binary:`~bin.mongos` hosts in the connection string
      - A username and password to :doc:`enforce access control 
        </tutorial/enable-authentication>`

      .. include:: /includes/connection-examples-by-language-onprem-standard-sharded.rst

      .. include:: /includes/fact-pct-encode-uri.rst

   .. tab:: Standalone
      :tabid: standalone

      The following standalone connection string :doc:`enforces access
      control </tutorial/enable-authentication>`:

      .. include:: /includes/connection-examples-by-language-onprem-standard-standalone.rst

      .. include:: /includes/fact-pct-encode-uri.rst