To authenticate to sharded clusters, create both shard-local users on
each shard, as well cluster-wide users:

- Create cluster users while connected to the :program:`mongos`; these
  credentials persist to the config servers.

- Create shard-local users by connecting directly to the replica set
  for each shard.
