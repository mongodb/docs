#. Shut down one of the :term:`secondary` members of your
   :term:`replica set` and then restart it on a different port and in
   "standalone" mode.

#. Create a backup of the old (current) oplog. This is optional.

#. Save the last entry from the old oplog.

#. Drop the old oplog.

#. Create a new oplog of a different size.

#. Insert the previously saved last entry from the old oplog into the
   new oplog.

#. Restart the server as a member of the replica set on its usual
   port.

#. Apply this procedure to all secondaries that
   *could become* primary.

#. Step down the current :term:`primary` with :method:`rs.stepDown()`,
   and repeat oplog resizing process above for the former
   primary (e.g. steps 2 through 7).
