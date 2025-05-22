For clusters with high insert volumes, a shard key with
monotonically increasing and decreasing keys can affect insert
throughput. If your shard key is the ``_id`` field, be aware that
the default values of the ``_id`` fields are :term:`ObjectIds
<ObjectId>` which have generally increasing values.

When inserting documents with monotonically increasing shard keys, all inserts
belong to the same :term:`chunk` on a single :term:`shard`. The system
eventually divides the chunk range that receives all write operations and
migrates its contents to distribute data more evenly. However, at any moment
the cluster directs insert operations only to a single shard, which creates an
insert throughput bottleneck.

If the operations on the cluster are predominately read operations
and updates, this limitation may not affect the cluster.

To avoid this constraint, use a :ref:`hashed shard key
<sharding-hashed-sharding>` or select a field that does not
increase or decrease monotonically.

:ref:`Hashed shard keys <sharding-hashed-sharding>` and :ref:`hashed
indexes <index-type-hashed>` store hashes of keys with ascending values.
