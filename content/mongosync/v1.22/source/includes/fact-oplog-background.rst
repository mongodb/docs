
``mongosync`` applies operations in the ``oplog`` on the source cluster
to the data on the destination cluster after the 
:ref:`collection copy <c2c-collection-copy>` phase.  When 
operations that ``mongosync`` has not applied roll off the ``oplog`` 
on the source cluster, the sync fails and ``mongosync`` exits.

.. note::

   .. include:: /includes/fact-applyOps.rst

If you anticipate syncing a large data set, or if you plan to pause
synchronization for an extended period of time, you might exceed the
:term:`oplog window`. Use the :setting:`~replication.oplogSizeMB` setting
to increase the size of the ``oplog`` on the source cluster.

