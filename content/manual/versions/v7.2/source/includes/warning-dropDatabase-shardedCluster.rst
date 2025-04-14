If you intend to create a new database with the same name as the dropped
database, you must follow these additional steps for using the
:dbcommand:`dropDatabase` command, specific to your version of MongoDB:

- For **MongoDB 5.0 and later**, you must:

  #. Run the :dbcommand:`dropDatabase` command on a 
     :binary:`~bin.mongos`, no additional steps required.

- For **MongoDB 4.2**, you must:

  #. Run the :dbcommand:`dropDatabase` command on a
     :binary:`~bin.mongos`.

  #. Once the command successfully completes, run the
     :dbcommand:`dropDatabase` command once more on a
     :binary:`~bin.mongos`.

  #. Use the :dbcommand:`flushRouterConfig` command on **all**
     :binary:`~bin.mongos` instances before reading or writing to that
     database.

These steps ensure that all cluster nodes refresh their metadata cache,
which includes the location of the :ref:`primary shard<primary-shard>`
for the new database. Otherwise, you may miss data on reads, and may not
write data to the correct shard. To recover, you must manually
intervene.
