- |service| deploys each shard as a replica set, consisting of the
  number of members specified by the replication factor. The shard
  servers have the selected instance size.

- |service| deploys the :ref:`config servers <sharding-config-server>`
  as a three-member replica set. The config servers run on
  M30 instances.

- |service| deploys six routers (:program:`mongos <bin.mongos>` programs) for a
  sharded cluster. |service| runs the routers on the shard servers.
