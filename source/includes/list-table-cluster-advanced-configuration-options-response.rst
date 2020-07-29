.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``javascriptEnabled``
     - boolean
     - When ``true``, the cluster allows execution of operations that
       perform server-side executions of JavaScript. When ``false``,
       the cluster disables execution of those operations.

       - If your cluster runs a MongoDB version less than 4.4, this
         option corresponds to modifying the
         :setting:`security.javascriptEnabled` configuration file option
         for each :binary:`~bin.mongod` in the cluster.
         
       - If your cluster runs MongoDB version 4.4 or greater, this
         option corresponds to  modifying the
         :setting:`security.javascriptEnabled` configuration file option
         for each :binary:`~bin.mongod` and :binary:`~bin.mongos` in the
         cluster.

   * - ``minimumEnabledTlsProtocol``
     - string
     - The minimum Transport Layer Security (TLS) version the 
       cluster accepts for incoming connections. 

       Clusters using TLS 1.0 or 1.1 should consider setting |tls| 1.2 
       as the minimum |tls| protocol version. To learn more, see 
       :ref:`faq-tls-1.0-deprecation`.

       This option corresponds to the
       :setting:`net.ssl.disabledProtocols` :binary:`~bin.mongod`
       configuration file option.

   * - ``noTableScan``
     - boolean
     - When ``true``, the cluster disables the execution of any query 
       that requires a collection scan to return results. When 
       ``false``, the cluster allows the execution of those operations.

       This option corresponds to the
       :parameter:`notablescan <param.notablescan>` 
       :binary:`~bin.mongod` parameter.

   * - ``oplogSizeMB``
     - integer
     - The custom oplog size of the cluster. A value of ``null``
       indicates that the cluster uses the default oplog size calculated
       by |service|. 

       You can check the oplog size by connecting to your cluster
       via the :binary:`~bin.mongo` shell and authenticating as a user
       with the :authrole:`Atlas admin` role. Run the
       :method:`rs.printReplicationInfo() <rs.printReplicationInfo>` 
       method to view the current oplog size and time.

       This option corresponds to the 
       :setting:`replication.oplogSizeMB <replication.oplogSizeMB>`
       :binary:`~bin.mongod` configuration file option.

   * - ``sampleSizeBIConnector``
     - integer
     - Number of documents per database to sample when gathering
       schema information.

       This element corresponds to the :bic:`sampleSize
       </reference/mongosqld/#cmdoption-mongosqld-sampleSize>`
       :bic:`mongosqld </reference/mongosqld>` option.

   * - ``sampleRefreshIntervalBIConnector``
     - integer
     - Interval in seconds at which the :bic:`mongosqld process
       </reference/mongosqld/>` re-samples data to create its relational
       schema.

       This element corresponds to the :bic:`sampleRefreshIntervalSecs
       </reference/mongosqld/#cmdoption-mongosqld-sampleRefreshIntervalSecs>`
       ``mongosqld`` option.
