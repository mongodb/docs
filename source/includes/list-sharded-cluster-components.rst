- |service| deploys each shard as a replica set, consisting of the number of
  nodes specified by the replication factor. The shard servers have the
  selected instance size. For cross-region clusters, the nodes of each shard
  replica set are distributed across the selected regions.

- |service| deploys the :ref:`config servers <sharding-config-server>`
  as a three-node replica set. The config servers run on
  M30 instances. For cross-region clusters, the nodes of the config 
  server replica set are distributed to ensure optimal availability. For
  example, |service| might deploy the config servers across three distinct
  availability zones and three distinct regions, if possible.

- |service| deploys six routers (:binary:`mongos <bin.mongos>` programs) for a
  sharded cluster. |service| runs the routers on the shard servers. 
  For cross-region clusters, |service| spreads the routers across the
  selected regions.
