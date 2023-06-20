
``mongosync`` applies operations in the ``oplog`` on the source cluster
to the data on the destination cluster.  When older operations 
that ``mongosync`` has not applied roll off the ``oplog`` 
on the source cluster, the sync fails and ``mongosync`` exits.

During initial sync, ``mongosync`` may apply operations at a slower
rate. After ``mongosync`` completes the initial sync, it applies changes 
faster and stays more current in the source cluster ``oplog``.

If you anticipate syncing a large data set, or if you plan to pause
synchronization for an extended period of time, you might exceed the
:term:`oplog window`. Use the :setting:`~replication.oplogSizeMB` setting
to increase the size of the ``oplog`` on the source cluster.

