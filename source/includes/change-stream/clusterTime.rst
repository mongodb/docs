.. _|idref|-clusterTime:

The timestamp from the oplog entry associated with the event.

Change stream event notifications associated with a
:ref:`multi-document transaction <transactions>`
all have the same ``clusterTime`` value: the time when the transaction
was committed.

Events with the same ``clusterTime`` may not all relate to the same transaction.  
Some events don't relate to a transaction at all. Starting in MongoDB 8.0, 
this may be true for events on any deployment. In previous versions, this 
behavior was possible only for events on a sharded cluster.

To identify events for a single transaction, you can use the
combination of ``lsid`` and ``txnNumber`` in the change stream
event document.

.. versionchanged:: 8.0 
