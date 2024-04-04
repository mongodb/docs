
``mongosync`` applies operations in the ``oplog`` on the source cluster
to the data on the destination cluster.  When operations 
that ``mongosync`` has not applied roll off the ``oplog`` 
on the source cluster, the sync fails and ``mongosync`` exits.

.. note::

   .. include:: /includes/fact-applyOps.rst

Starting in version 1.5.0, ``mongosync`` enables Oplog Rollover
Resilience (ORR).  With ORR,  ``mongosync`` applies changes on the
source cluster to the destination cluster during the initial sync. ORR
increases the resilience of ``mongosync`` to oplog rollover but does not
prevent rollover entirely.

You might exceed the oplog window if you: 

- Sync from a high write rate source cluster for an extended
  period.
- Pause sync for an extended period.

To increase the size of the ``oplog`` on the source cluster, use
:setting:`~replication.oplogSizeMB`. For more information, see
:ref:`Change Oplog Size <tutorial-change-oplog-size>` and
:ref:`Workloads that Might Requre a Large Oplog Size 
<replica-set-large-oplog-required>`.


