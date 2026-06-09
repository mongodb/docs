Queries using :pipeline:`$unionWith` with :pipeline:`$search` in the
sub-pipeline might fail during an upgrade from a replica set to a
sharded cluster running MongoDB v7.0 if the collection is not spread
across multiple shards. To mitigate this, deploy more than one shard
on your cluster and shard the collection such that multiple chunks
are spread across multiple shards. 