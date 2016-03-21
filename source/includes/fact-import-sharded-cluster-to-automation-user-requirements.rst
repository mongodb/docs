If you are adding a sharded cluster, you must create this user through
the :program:`mongos` *and* on every shard. That is, create the user
both as a cluster wide user through :program:`mongos` as well as a
shard local user on each shard.
