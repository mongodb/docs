Each database in a sharded cluster has a primary shard. If the
shard you want to drain is also the primary of one of the
cluster's databases, then you must manually move the databases
to a new shard after migrating all data from the shard. See the
:dbcommand:`movePrimary` command and the
:ref:`remove-shards-from-cluster-tutorial` for more information.