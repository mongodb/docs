
``mongosync`` applies operations in the ``oplog`` on the source cluster
to the data on the destination cluster.  When operations 
that ``mongosync`` has not applied roll off the ``oplog`` 
on the source cluster, the sync fails and ``mongosync`` exits.

.. note::

   .. include:: /includes/fact-applyOps.rst

During the initial sync, ``mongosync`` may apply operations at a slower
rate due to copying documents concurrently.
After the initial sync, ``mongosync`` applies changes 
faster and is more likely to maintain a position in the ``oplog``
that is close to the real-time writes occurring on the source cluster.

If you anticipate syncing a large data set, or if you plan to pause
synchronization for an extended period of time, you might exceed the
:term:`oplog window`. Use the :setting:`~replication.oplogSizeMB` setting
to increase the size of the ``oplog`` on the source cluster.

