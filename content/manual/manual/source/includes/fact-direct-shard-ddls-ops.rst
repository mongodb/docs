Starting in MongoDB 8.3, you can only run :ref:`DDL operations <ddl-operations>` and 
:dbcommand:`applyOps` on a ``mongos`` for all sharded clusters.
For Atlas clusters, these operations may be temporarily unavailable while
transitioning from a replica set to a sharded cluster.