In MongoDB 4.2 and earlier, to change a shard key:

- Dump all data from MongoDB into an external format.

- Drop the original sharded collection.

- Configure sharding using the new shard key.

- :ref:`Pre-split <create-chunks-in-a-sharded-cluster>` the shard
  key range to ensure initial even distribution.

- Restore the dumped data into MongoDB.
