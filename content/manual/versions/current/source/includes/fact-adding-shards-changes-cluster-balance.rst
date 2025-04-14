When you add a shard to a sharded cluster, you affect the balance of
:term:`chunks <chunk>` among the shards of a cluster for all existing sharded
collections. The balancer will begin migrating chunks so that the
cluster will achieve balance. See :ref:`sharding-internals-balancing` for
more information.
