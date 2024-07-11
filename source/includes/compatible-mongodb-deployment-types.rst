Using |mms|, you can configure all MongoDB deployment types: sharded
clusters, replica sets, and standalones.

The shards in a sharded cluster **must** be replica sets. That is, a
shard cannot be a standalone :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>`. If you must run a shard
as a single :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` (which provides **no** redundancy or
failover), run the shard as a single-member replica set.

