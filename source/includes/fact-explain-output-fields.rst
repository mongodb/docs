.. explain-output-non-sharded-collection

.. code-block:: javascript

   {
     "cursor" : "BtreeCursor type_1",
     "isMultiKey" : false,
     "n" : 5,
     "nscannedObjects" : 5,
     "nscanned" : 5,
     "nscannedObjectsAllPlans" : 5,
     "nscannedAllPlans" : 5,
     "scanAndOrder" : false,
     "indexOnly" : false,
     "nYields" : 0,
     "nChunkSkips" : 0,
     "millis" : 0,
     "indexBounds" : { "type" : [ [ "food", "food" ] ] },
     "allPlans" : [
                    { "cursor" : "BtreeCursor type_1",
                      "n" : 5,
                      "nscannedObjects" : 5,
                      "nscanned" : 5,
                      "indexBounds" : { "type" : [ [ "food", "food" ] ] } 
                    } 
                  ], 
      "oldPlan" : {
                     "cursor" : "BtreeCursor type_1", 
                     "indexBounds" : { "type" : [ [ "food","food" ] ] }
                  },
      "server" : "mongodbo0.example.net:27017" 
    }

.. data:: cursor

   Specifies the type of cursor used in the query operation:

   - **BasicCursor** indicates use of full table scan.

   - **BtreeCursor** indicates use of an index. The cursor information
     includes the index name. With the use of an index, the
     :method:`explain()` output will include the :data:`indexBounds`
     details.

.. data:: isMultiKey

   Specifies whether a :ref:`multikey index on an array field
   <index-type-multikey>` was used.
   
.. data:: n

   Specifies the number of documents that match the query selection
   criteria.

.. data:: nscannedObjects

   Specifies the total number of documents scanned during the query. If
   the index is a covered index, the :data:`nscannedObjects` may be
   lower than :data:`nscanned`.

.. data:: nscanned

   Specifies the total number of documents or index entries scanned
   during the database operation. You want :data:`n` and
   :data:`nscanned` to be close in value as possible. If the index is a
   covered index, :data:`nscanned` may be higher than
   :data:`nscannedObjects`.

.. data:: nscannedObjectsAllPlans

   Specifies the total number of documents scanned for all query plans
   during the database operation.

.. data:: nscannedAllPlans

   Specifies the total number of documents or index entries scanned for
   all query plans during the database operation.

.. data:: scanAndOrder

   Specifies whether the index could not be used for sorting. If
   ``true``, the index could *not* be used for sorting.

.. data:: indexOnly

   Specifies whether the query is a :ref:`covered query
   <indexes-covered-queries>` that can be fulfilled by using just the
   index.

.. data:: nYields

   Specifieds the number of times this query yielded the read lock to
   allow waiting writes execute.
   
.. data:: nChunkSkips

   Specifies the number of documents skipped because of active chunk
   migrations in a sharded system. Typically this will be zero. A
   number greater than zero is ok, but indicates a little bit of
   inefficiency.

.. data:: millis

   Specifies the number of milliseconds to complete the query.

.. data:: indexBounds

   Specifies the lower and upper index key bounds. 

.. data:: allPlans

   Specifies the list of plans the query optimizer runs in order to
   select the index for the query.

.. data:: oldPlan

   Specifies the previous plan selected by the query optimizer for the
   query.

.. data:: server

   Specifies the MongoDB server.

.. explain-output-sharded-collection

*Sharded Collections*

The ``explain`` output contains additional fields for queries on a
sharded collection:

.. code-block:: javascript

   {
      "clusteredType" : "ParallelSort",
      "shards" : {

                   "shard-a/mongodbo0.example.net:30000,mongodbo0.example.net:30001,mongodbo0.example.net:30002" : [
                      {
                        "cursor" : "BasicCursor",
                        "isMultiKey" : false,
                        "n" : 0,
                        "nscannedObjects" : 1000003,
                        "nscanned" : 1000003,
                        "nscannedObjectsAllPlans" : 1000003,
                        "nscannedAllPlans" : 1000003,
                        "scanAndOrder" : false,
                        "indexOnly" : false,
                        "nYields" : 0,
                        "nChunkSkips" : 0,
                        "millis" : 431,
                        "indexBounds" : { },
                        "server" : "mongodbo0.example.net:30000"
                     } ],
                  "shard-b/mongodbo0.example.net:30100,mongodbo0.example.net:30101,mongodbo0.example.net:30102" : [
                     { 
                        "cursor" : "BasicCursor",
                        "isMultiKey" : false,
                        "n" : 249999,
                        "nscannedObjects" : 999999,
                        "nscanned" : 999999,
                        "nscannedObjectsAllPlans" : 999999,
                        "nscannedAllPlans" : 999999, 
                        "scanAndOrder" : false, 
                        "indexOnly" : false,
                        "nYields" : 0,
                        "nChunkSkips" : 0, 
                        "millis" : 584,
                        "indexBounds" : { },
                        "server" : "mongodbo0.example.net:30100" 
                     } 
                  ] 
               }, 
      "cursor" : "BasicCursor",
      "n" : 249999,
      "nChunkSkips" : 0,
      "nYields" : 0,
      "nscanned" : 2000002,
      "nscannedAllPlans" : 2000002,
      "nscannedObjects" : 2000002,
      "nscannedObjectsAllPlans" : 2000002,
      "millisShardTotal" : 1015,
      "millisShardAvg" : 507,
      "numQueries" : 2, 
      "numShards" : 2,
      "millis" : 585 
   }


.. data:: clusteredType

   Specifies how the shards are accessed:

   - **ParallelSort** means all shards are queried in parallel
   - **SerialServer** means the shards are queried sequentially

.. data:: shards

   Specifies the shards accessed during the query and individual
   explain output for each shard.

.. data:: millisShardTotal

   Specifies the total time in milliseconds for the query to run on the
   shards.

.. data:: millisShardAvg

   Specifies the average time in millisecond for the query to run on
   each shard.

.. data:: numQueries

   Specifies the total number of queries executed.

.. data:: numShards

   Specifies the total number of shards queried.
