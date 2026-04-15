Starting in MongoDB 8.3, :ref:`DDL operations <ddl-operations>` and 
:dbcommand:`applyOps` can only be run on a ``mongos`` for all sharded clusters.
These operations may be temporarily unavailable while transitioning from a
replica set to a sharded cluster.