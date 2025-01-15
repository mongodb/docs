.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - defaultReadConcern
     - string
     - :manual:`Default level of acknowledgment requested from MongoDB for read operations </reference/read-concern/>`
       set for this cluster.

       MongoDB 5.0 clusters default to :manual:`available </reference/read-concern-available>`.

       .. MongoDB version 5.0 and later clusters default to :manual:`/reference/read-concern-local`.

   * - defaultWriteConcern
     - string
     - :manual:`Default level of acknowledgment requested from MongoDB for write operations </reference/write-concern/>`
       set for this cluster.

       MongoDB 5.0 clusters default to :manual:`1 </reference/write-concern>`.

       .. MongoDB version 5.0 and later default to :manual:`majority </reference/write-concern>`.

   * - javascriptEnabled
     - boolean
     - Flag that indicates whether the cluster allows execution of
       operations that perform server-side executions of JavaScript.

       - If your cluster runs a MongoDB version less than 5.0, this
         option corresponds to modifying the
         :setting:`security.javascriptEnabled` configuration file
         option for each |mongod| in the cluster.

       - If your cluster runs MongoDB version 5.0 or greater, this
         option corresponds to  modifying the
         :setting:`security.javascriptEnabled` configuration file
         option for each |mongod| and |mongos| in the cluster.

   * - minimumEnabledTlsProtocol
     - string
     - Minimum Transport Layer Security (TLS) version that the cluster
       accepts for incoming connections. Clusters using |tls| 1.0 or
       1.1 should consider setting |tls| 1.2 as the minimum |tls|
       protocol version.

       .. include:: /includes/tls-deprecation.rst
       
       To learn more, see :ref:`faq-tls-1.0-deprecation`.

       This option corresponds to the
       :setting:`net.tls.disabledProtocols` |mongod|
       configuration file option.

   * - noTableScan
     - boolean
     - Flag that indicates whether the cluster disables executing any
       query that requires a collection scan to return results.

       This option corresponds to the
       :parameter:`notablescan <param.notablescan>` |mongod| parameter.

   * - oplogSizeMB
     - integer
     - Storage limit of cluster's oplog expressed in megabytes. A value
       of ``null`` indicates that the cluster uses the default oplog
       size that |service| calculates.

       To check the oplog size:

       1. Connect to your cluster via {+mongosh+}.
       2. Authenticate as a user with the :atlasrole:`Atlas admin` role.
       3. Run the
          :method:`rs.printReplicationInfo() <rs.printReplicationInfo>`
          method to view the current oplog size and time.

       This option corresponds to the
       :setting:`replication.oplogSizeMB <replication.oplogSizeMB>`
       |mongod| configuration file option.

   * - sampleSizeBIConnector
     - integer
     - Number of documents per database to sample when gathering
       schema information.

       This parameter corresponds to the :bic:`sampleSize </reference/mongosqld/#cmdoption-mongosqld-sampleSize>` :bic:`mongosqld </reference/mongosqld>` option.

   * - sampleRefreshIntervalBIConnector
     - integer
     - Interval in seconds at which the
       :bic:`mongosqld process </reference/mongosqld/>` re-samples data
       to create its relational schema.

       This parameter corresponds to the
       :bic:`sampleRefreshIntervalSecs </reference/mongosqld/#cmdoption-mongosqld-sampleRefreshIntervalSecs>`
       :bic:`mongosqld </reference/mongosqld>` option.
