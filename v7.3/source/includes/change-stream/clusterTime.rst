.. _|idref|-clusterTime:

The timestamp from the oplog entry associated with the event.

Change stream event notifications associated with a
:ref:`multi-document transaction <transactions>`
all have the same ``clusterTime`` value: the time when the transaction
was committed.

On sharded clusters, events with the same ``clusterTime`` may not all
relate to the same transaction.  Some events don't relate to a
transaction at all.

To identify events for a single transaction, you can use the
combination of ``lsid`` and ``txnNumber`` in the change stream
event document.
