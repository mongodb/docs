.. list-table::
   :header-rows: 1
   :widths: 30 15 55

   * - Field Name
     - Data Type
     - Description

   * - ``ns``
     - string
     - Namespace of the sharded collection.

   * - ``shards``
     - array
     - Shards in the collection with the data distribution
       information for each shard.

   * - ``shards.numOrphanedDocs``
     - integer
     - Number of orphaned documents in the shard. 
     
       For :ref:`time series collections
       <manual-timeseries-collection>`, ``numOrphanedDocs`` contains the number of
       orphaned measurement buckets in the shard.

   * - ``shards.numOwnedDocuments``
     - integer
     - Number of documents owned by the shard. 

       For :ref:`time series collections
       <manual-timeseries-collection>`, ``numOwnedDocuments`` contains the number of measurement
       buckets in the shard.

   * - ``shards.ownedSizeBytes``
     - integer
     - Size in bytes of documents owned by the shard when
       uncompressed.

   * - ``shards.orphanedSizeBytes``
     - integer
     - Size in bytes of orphaned documents in the shard when
       uncompressed.

