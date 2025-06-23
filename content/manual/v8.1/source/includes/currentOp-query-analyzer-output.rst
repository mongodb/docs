.. tabs::

   .. tab:: Replica Set
      :tabid: currentOp-query-analyzer-rs

      When run on a ``mongod`` that is part of a replica set:

      .. code-block:: javascript
         :copyable:false

         {
            "desc" : "query analyzer",
            "ns" : "testDb.testColl",
            "collUuid" : UUID("ed9dfb1d-5b7c-4c6b-82e9-b0f537335795"),
            "samplesPerSecond" : 5,
            "startTime" : ISODate("2023-08-08T16:23:22.846Z"),
            "sampledReadsCount" : Long(2),
            "sampledReadsBytes" : Long(346),
            "sampledWritesCount" : Long(3),
            "sampledWritesBytes" : Long(904)
         }

   .. tab:: Sharded Cluster: mongos
      :tabid: currentOp-query-analyzer-mongos

      When run on a ``mongos`` that is part of a sharded cluster:

      .. code-block:: javascript
         :copyable:false

         {
            "desc" : "query analyzer",
            "ns" : "testDb.testColl",
            "collUuid" : UUID("5130b4df-5966-434f-85f0-f8956b5ca74e"),
            "samplesPerSecond" : 5,
            "startTime" : ISODate("2023-08-08T16:15:07.427Z"),
            "sampledReadsCount" : Long(2),
            "sampledWritesCount" : Long(3)
         }


   .. tab:: Sharded Cluster: mongod --shardsvr
      :tabid: currentOp-query-analyzer-mongod-shardsvr
      
      When run on a ``mongod --shardsvr`` that is part of a sharded 
      cluster:

      .. code-block:: javascript
         :copyable:false

         {
            "desc" : "query analyzer",
            "ns" : "testDb.testColl",
            "collUuid" : UUID("5130b4df-5966-434f-85f0-f8956b5ca74e"),
            "startTime" : ISODate("2023-08-08T16:15:07.427Z"),
            "sampledReadsCount" : Long(2),
            "sampledReadsBytes" : Long(346),
            "sampledWritesCount" : Long(3),
            "sampledWritesBytes" : Long(904)
         }    
