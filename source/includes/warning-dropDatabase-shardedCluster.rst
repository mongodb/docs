If you intend to create a new database with the same name as the dropped
database, you must follow these additional steps for using the
:dbcommand:`dropDatabase` command, specific to your version of MongoDB:

- For **MongoDB 4.4 and later**, you must:

  #. Run the :dbcommand:`dropDatabase` command on a
     :binary:`~bin.mongos`.

  #. Once the command successfully completes, run the
     :dbcommand:`dropDatabase` command once more on a
     :binary:`~bin.mongos`.

- For **MongoDB 4.2**, you must:

  #. Run the :dbcommand:`dropDatabase` command on a
     :binary:`~bin.mongos`.

  #. Once the command successfully completes, run the
     :dbcommand:`dropDatabase` command once more on a
     :binary:`~bin.mongos`.

  #. Use the :dbcommand:`flushRouterConfig` command on **all**
     :binary:`~bin.mongos` instances before reading or writing to that
     database.

- For **MongoDB 4.0 and earlier**, you must:

  #. Run the :dbcommand:`dropDatabase` command on a
     :binary:`~bin.mongos`.

  #. Connect to each shard's :term:`primary` and verify that the
     namespace has been dropped. If it has not, rerun the
     :dbcommand:`dropDatabase` command again directly from the
     :term:`primary`.

  #. Connect to a :binary:`~bin.mongos`, switch to the
     :term:`config database`, and remove any reference to the removed
     namespace from the ``databases``, ``collections``, ``chunks``,
     ``tags``, and ``locks`` collections:

     .. code-block:: javascript

        use config
        db.collections.remove( { _id: /^DATABASE\./ }, {writeConcern: {w: 'majority' }} )
        db.databases.remove( { _id: "DATABASE" }, {writeConcern: {w: 'majority' }} )
        db.chunks.remove( { ns: /^DATABASE\./ }, {writeConcern: {w: 'majority' }} )
        db.tags.remove( { ns: /^DATABASE\./ }, {writeConcern: {w: 'majority' }} )
        db.locks.remove( { _id: /^DATABASE\./ }, {writeConcern: {w: 'majority' }} )

     Where ``DATABASE`` represents the namespace of the database you
     just dropped.

  #. Connect to the :term:`primary` of each shard, and remove any
     reference to the removed namespace from the ``cache.databases``,
     ``cache.collections``,  and ``cache.chunks.DATABASE.COLLECTION``
     collections:

     .. code-block:: javascript

        db.getSiblingDB("config").cache.databases.remove({_id:"DATABASE"}, {writeConcern: {w: 'majority' }});
        db.getSiblingDB("config").cache.collections.remove({_id:/^DATABASE.*/}, {writeConcern: {w: 'majority' }});
        db.getSiblingDB("config").getCollectionNames().forEach(function(y) {
           if(y.indexOf("cache.chunks.DATABASE.") == 0)
            db.getSiblingDB("config").getCollection(y).drop()
         })

     Where ``DATABASE`` represents the namespace of the database you
     just dropped.

  #. Use the :dbcommand:`flushRouterConfig` command on **all**
     :binary:`~bin.mongos` instances before reading or writing to that
     database.

These steps ensure that all cluster nodes refresh their metadata cache,
which includes the location of the :ref:`primary shard<primary-shard>`
for the new database. Otherwise, you may miss data on reads, and may not
write data to the correct shard. To recover, you must manually
intervene.
