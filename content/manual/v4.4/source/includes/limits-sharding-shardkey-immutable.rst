If you must change a shard key:

- Dump all data from MongoDB into an external format.

- Drop the original sharded collection.

- Configure sharding using the new shard key.

- :doc:`Pre-split </tutorial/create-chunks-in-sharded-cluster>` the shard
  key range to ensure initial even distribution.

- Restore the dumped data into MongoDB.
