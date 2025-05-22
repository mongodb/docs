.. _|idref|-clusterTime:
 
``clusterTime`` is the timestamp from the oplog entry associated with 
the event.

Due to :ref:`oplog size limits<txn-oplog-size-limit>`, 
:ref:`multi-document transactions <transactions>` may create multiple 
oplog entries. In a transaction, change stream events staged in a given oplog 
entry share the same ``clusterTime``. 

On sharded clusters, events with the same ``clusterTime`` may not all
relate to the same transaction.  Some events don't relate to a
transaction at all.

To identify events for a single transaction, you can use the
combination of ``lsid`` and ``txnNumber`` in the change stream
event document.
