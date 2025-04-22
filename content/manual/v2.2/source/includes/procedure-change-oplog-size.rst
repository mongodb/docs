1. Shut down the current :term:`primary` instance in the
   :term:`replica set` and then restart it on a different port
   and in "standalone" mode.

#. Create a backup of the old (current) oplog. This is optional.

#. Save the last entry from the old oplog.

#. Drop the old oplog.

#. Create a new oplog of a different size.

#. Insert the previously saved last entry from the old oplog into the
   new oplog.

#. Restart the server as a member of the replica set on its usual
   port.

#. Apply this procedure to any other member of the replica set that
   *could become* primary.
