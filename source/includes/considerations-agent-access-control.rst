To authenticate to sharded clusters, create shard-local users on *each*
shard and create cluster-wide users:

- Create cluster users while connected to the :program:`mongos`; these
  credentials persist to the config servers.

- Create shard-local users by connecting directly to the replica set
  for each shard.
