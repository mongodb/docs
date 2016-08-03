You can configure all MongoDB deployment types: sharded clusters,
replica sets, and standalones.

The shards in a sharded cluster **must** be replica sets. That is, a shard
cannot be a standalone :program:`mongod`. If you must run a shard as a
single :program:`mongod` (which provides **no** redundancy or failover), run
the shard as a single-member replica set.
