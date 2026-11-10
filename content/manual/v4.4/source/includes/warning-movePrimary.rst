For MongoDB 4.2 and previous, if using the :dbcommand:`movePrimary`
command on a database that contains an *unsharded* collection, you
must perform the following additional steps.

.. note::

   MongoDB 4.4 does not require these additional steps when moving
   databases that contain unsharded collections.

- For **MongoDB 4.2**, you must either:

  - Restart all :binary:`~bin.mongos` instances **and** all
    :binary:`~bin.mongod` shard members (including the secondary
    members);

  - Use the :dbcommand:`flushRouterConfig` command on all
    :binary:`~bin.mongos` instances and all :binary:`~bin.mongod`
    shard members (including the secondary members) before reading
    or writing any data to any unsharded collections that were
    moved.

- For **MongoDB 4.0 and earlier**, you must either:

  - Restart all :binary:`~bin.mongos` instances;

  - Use the :dbcommand:`flushRouterConfig` command on all
    :binary:`~bin.mongos` instances before reading or writing any data
    to any unsharded collections that were moved.

These steps ensure that all cluster nodes refresh their metadata cache,
which includes the location of the :ref:`primary shard<primary-shard>`.
Otherwise, you may miss data on reads, and may not write data to the
correct shard. To recover, you must manually intervene.
