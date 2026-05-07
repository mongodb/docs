
Starting in MongoDB 8.3, replica sets that were previously
sharded clusters cannot be converted back into replica sets.

The conversion of a sharded cluster into a replica set preserves
sharding metadata from its prior deployment, including a shard
identity document, which blocks it from again becoming a sharded
cluster. If you attempt a self-managed conversion back into a
sharded cluster, MongoDB returns an error.

To convert such replica sets into sharded clusters, contact
:ref:`technical-support`.

