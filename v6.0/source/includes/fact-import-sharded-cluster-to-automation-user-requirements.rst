If you are adding a sharded cluster, you must create this user through
the :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` *and* on every shard. That is, create the user
both as a cluster wide user through :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` as well as a
shard local user on each shard.
