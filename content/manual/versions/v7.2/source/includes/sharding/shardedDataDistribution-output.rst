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

   * - ``shards.numOwnedDocuments``
     - integer
     - Number of documents owned by the shard.

   * - ``shards.ownedSizeBytes``
     - integer
     - Storage in bytes for documents owned by the shard.

   * - ``shards.orphanedSizeBytes``
     - integer
     - Storage in bytes for orphaned documents in the shard.
