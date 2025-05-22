If you intend to create a new database with the same name as the dropped
database, you must run the :dbcommand:`dropDatabase` command on a 
:binary:`~bin.mongos`.

This ensures that all cluster nodes refresh their metadata cache,
which includes the location of the :ref:`primary shard<primary-shard>`
for the new database. Otherwise, you may miss data on reads, and may not
write data to the correct shard. To recover, you must manually
intervene.
