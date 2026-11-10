:term:`oplog` entries are time-stamped. The oplog window is the time
difference between the newest and the oldest timestamps in the
``oplog``. If a secondary node loses connection with the primary, it
can only use :ref:`replication <replication>` to sync up again if the
connection is restored within the oplog window. 