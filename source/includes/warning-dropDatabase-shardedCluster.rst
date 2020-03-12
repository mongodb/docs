For MongoDB 4.2 and previous, when executing the
:dbcommand:`dropDatabase` command, you must perform the following
additional steps if you intend to create a new database with the same
name as the dropped database.

.. note::

   MongoDB 4.4 does not require these additional steps when dropping and
   recreating a database with the same name.

- For **MongoDB 4.2**, you must either:

  - Restart all :binary:`~bin.mongos` instances and all
    :binary:`~bin.mongod` shard members (including the secondary
    members);

  - Use the :dbcommand:`flushRouterConfig` command on all
    :binary:`~bin.mongos` instances and all :binary:`~bin.mongod`
    shard members (including the secondary members) before reading
    or writing to that database.

- For **MongoDB 4.0 and earlier**, you must either:

  - Restart all :binary:`~bin.mongos` instances;

  - Use the :dbcommand:`flushRouterConfig` command on all
    :binary:`~bin.mongos` instances before reading or writing to that
    database.

These steps ensure that all cluster nodes refresh their metadata cache,
which includes the location of the :ref:`primary shard<primary-shard>`
for the new database. Otherwise, you may miss data on reads, and may not
write data to the correct shard. To recover, you must manually
intervene.
