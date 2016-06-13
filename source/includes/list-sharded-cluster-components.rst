- |service| deploys each shard as a replica set, consisting of the
  number of members specified by the replication factor.

- |service| deploys the :ref:`config servers <sharding-config-server>`
  as a three-member replica set.

- |service| deploys six routers (:program:`mongos` programs) for a
  sharded cluster. |service| runs the routers on the shard servers.
