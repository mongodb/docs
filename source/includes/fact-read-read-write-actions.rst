The following table describes the |service| specific privileges, the
database it applies to, and the :manual:`privilege actions
</reference/privilege-actions>` they represent.

.. list-table::
   :header-rows: 1

   * - |service| Specific Privilege
     - Database
     - Privilege Actions

   * - ``backup``
     - ``admin``
     - 
       - :authaction:`listDatabases`
       - :authaction:`listCollections`
       - :authaction:`listIndexes`
       - :authaction:`appendOplogNote`
       - :authaction:`getParameter`
       - :authaction:`serverStatus`

   * - ``clusterMonitor``
     - ``admin``
     - 
       - :authaction:`checkFreeMonitoringStatus`
       - :authaction:`connPoolStats`
       - :authaction:`getCmdLineOpts`
       - :authaction:`getDefaultRWConcern`
       - :authaction:`getLog`
       - :authaction:`getParameter`
       - :authaction:`getShardMap`
       - :authaction:`hostInfo`
       - :authaction:`inprog`
       - :authaction:`listDatabases`
       - :authaction:`listSessions`
       - :authaction:`listShards`
       - :authaction:`netstat`
       - :authaction:`replSetGetConfig`
       - :authaction:`replSetGetStatus`
       - :authaction:`serverStatus`
       - :authaction:`setFreeMonitoring`
       - :authaction:`shardingState`
       - :authaction:`top`

   * - ``dbAdmin``
     - User configured
     - 
       - :authaction:`bypassDocumentValidation`
       - :authaction:`changeStream`
       - :authaction:`collMod`
       - :authaction:`collStats`
       - :authaction:`compact`
       - :authaction:`convertToCapped`
       - :authaction:`createCollection`
       - :authaction:`createIndex`
       - :authaction:`dbHash`
       - :authaction:`dbStats`
       - :authaction:`dropCollection`
       - :authaction:`dropDatabase`
       - :authaction:`dropIndex`
       - :authaction:`enableProfiler`
       - :authaction:`find`
       - :authaction:`killCursors`
       - :authaction:`listCollections`
       - :authaction:`listIndexes`
       - :authaction:`planCacheIndexFilter`
       - :authaction:`planCacheRead`
       - :authaction:`planCacheWrite`
       - :authaction:`reIndex`
       - :authaction:`renameCollectionSameDB`
       - :authaction:`storageDetails`
       - :authaction:`validate`

   * - ``dbAdminAnyDatabase``
     - User configured except ``local`` and ``config``
     - 
       - :authrole:`dbAdminAnyDatabase`

   * - ``enableSharding``
     - 
     - 
       - :authaction:`enableSharding`

   * - ``read``
     - User configured
     - 
       - :authaction:`changeStream`
       - :authaction:`collStats`
       - :authaction:`dbHash`
       - :authaction:`dbStats`
       - :authaction:`find`
       - :authaction:`killCursors`
       - :authaction:`listIndexes`
       - :authaction:`listCollections`

   * - ``readWrite``
     - User configured
     - 
       - :authaction:`changeStream`
       - :authaction:`collStats`
       - :authaction:`convertToCapped`
       - :authaction:`createCollection`
       - :authaction:`dbHash`
       - :authaction:`dbStats`
       - :authaction:`dropCollection`
       - :authaction:`createIndex`
       - :authaction:`dropIndex`
       - :authaction:`find`
       - :authaction:`insert`
       - :authaction:`killCursors`
       - :authaction:`listIndexes`
       - :authaction:`listCollections`
       - :authaction:`remove`
       - :authaction:`renameCollectionSameDB`
       - :authaction:`update`

   * - ``killOpSession``
     - User configured
     - 
       - :authaction:`inprog`
       - :authaction:`killop`
       - :authaction:`killAnySession`
       - :authaction:`listSessions`

   * - ``readWriteAnyDatabase``
     - User configured except ``local`` and ``config``
     - 
       - :authrole:`readWriteAnyDatabase`
       - :authaction:`changeStream`
       - :authaction:`collStats`
       - :authaction:`convertToCapped`
       - :authaction:`createCollection`
       - :authaction:`dbHash`
       - :authaction:`dbStats`
       - :authaction:`dropCollection`
       - :authaction:`createIndex`
       - :authaction:`dropIndex`
       - :authaction:`find`
       - :authaction:`insert`
       - :authaction:`killCursors`
       - :authaction:`listIndexes`
       - :authaction:`listCollections`
       - :authaction:`listDatabases`
       - :authaction:`remove`
       - :authaction:`renameCollectionSameDB`
       - :authaction:`update`

   * - ``readAnyDatabase``
     - User configured except ``local`` and ``config``
     - 
       - :authrole:`readAnyDatabase`
       - :authaction:`changeStream`
       - :authaction:`collStats`
       - :authaction:`dbHash`
       - :authaction:`dbStats`
       - :authaction:`find`
       - :authaction:`killCursors`
       - :authaction:`listIndexes`
       - :authaction:`listCollections`
       - :authaction:`listDatabases`
