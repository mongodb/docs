=================
Command Reference
=================

.. default-domain:: mongodb
.. highlight:: javascript

This document contains a reference to all :term:`database
commands`. These commands take the form of :term:`JSON` documents
issued as a query against a special MongoDB collection named
:term:`$cmd`; however,  the JavaScript shell (i.e. ``mongo``,) provides
the following syntax to facilitate running commands: ::

      db.runCommand( { <commandname>: <value> [, options] } );

Similarly, you can run administrative commands using the following
syntax: ::

      db._adminCommand( { <commandname>: <value> [, options] } );

The ``_adminCommand`` helper is shorthand for "``db.getSisterDB("admin").runCommand();``".

MongoDB drivers, and the ``mongo`` shell may provide an alternate
interfaces for issuing database commands. All examples in this
reference are provided as JSON documents.

User Commands
-------------

Sharding
~~~~~~~~

.. describe:: addShard

   The ``addShard`` command informs a ``mongos`` process about the
   shard instance. Connect using the MongoDB shell (e.g. ``mongo``) to
   the ``mongos`` instance. The command takes the following form: ::

        { addshard: "<hostname>:<port>" }

   Replace "``<hostname>:<port>``" with the hostname and port of the
   database instance you want to add as a shard. Because the ``mongos``
   instances do not have state and distribute configuration in the
   :term:`configdb`, you only need to send this command to one
   ``mongos`` instance. There are two optional parameters:

   - **name**. If no name is specified, a name will be automatically
     provided to uniquely identify the shard.
   - **maxSize** Unless specified shards will consume the total amount
     of available space if necessary. Use the ``maxSize`` value to
     limit the amount of space the database can use.

     .. note::

        Specify a ``maxSize`` when you have machines with different
        disk capacities, or if you want to limit the amount of data on
        some shards.

   See :doc:`/sharding` for more information related to sharding.

.. describe:: listShards

   Use the ``listShards`` command to return a list of configured
   shards. The command takes the following form:

        { listShards: 1 }

   See :doc:`/sharding` for more information related to sharding.

.. describe:: enableSharding

   The ``enableSharding`` command enables sharding on a per-database
   level. Use the following command form: ::

        { enableSharding: 1 }

   The ``enableSharding`` command doesn't move or shift any data. Use
   the :command:`shardCollection` to begin the process of distributing
   data among the shards.

   See :doc:`/sharding` for more information related to sharding.

.. describe:: shardCollection

   The ``shardCollection`` command marks a collection for sharding and
   will begin the process of distributing the data among the
   shards. Call :command:`enableSharding` before calling the
   ``shardCollection`` command. Consider the following syntax: ::

        { shardcollection: "<db>.<collection>", key: "<shardkey>" }

   This enables sharding for the collection specified by
   ``<collection>`` in the database named ``<db>``, using the key
   "``<shardkey>``" to distribute documents among the shard.

   Choosing the right shard key to effectively distribute load among
   your shards can be challenging to do properly. See
   :doc:`/sharding` for more information related to sharding and
   choosing the shard key.

   .. warning::

      There is no way to disable sharding or change the ``shardkey``
      once established, without making a backup, dropping the
      collection and reloading the data into a recreated collection.

.. describe:: shardingState

   The ``shardingState`` command returns ``true`` or ``false`` if the
   ``mongod`` instance is a member of a sharded cluster. Run the
   command using the following syntax: ::

        { shardingState: 1 }

   The value specified does not effect the output of the command.

   See :doc:`/sharding` for more information related to sharding.

   .. admin-only

Aggregation
~~~~~~~~~~~

.. describe:: group

   The ``group`` command returns an array of grouped items. ``group``
   provides functionality analogous to the ``GROUP BY`` statement in
   SQL. Consider the following example from the ``mongo`` shell: ::

        db.collection.group(
                            {key: { a:true, b:true },
                             cond: { active:1 },
                             reduce: function(obj,prev) { prev.csum += obj.c; },
                             initial: { csum: 0 }
                            });

   Here ``group`` runs against the collection "``collection``" and
   provides and aggregate sum of all documents that have an ``active``
   field with a value of ``1``. The parameter fields in the group
   command are:

   - **key** specifies the fields for grouping the results.
   - **reduce** aggregates (i.e. reduces) the objects that the
     function iterates. Typically this counts or sums the field.
   - **initial** sets the starting value of the aggregation counter
     object.
   - **keyf** is an optional function that returns a "key object,"
     that specifies a key that is not a single field. One typical use
     of ``keyf`` is to group documents by day of week. Set ``keyf`` in
     lieu of a key.
   - **cond** specifies an optional condition that must be true for a
     document to be considered. This functions like a
     :command:`find()` query. If ``cond`` returns no results, the
     ``reduce`` function will run against all documents in the
     collection.
   - **finalize** is an optional function that runs against every
     result before the item is returned, to provide additional post
     processing or transformation.

   Consider the following limitations:

   - The results of the ``group`` command are returned as a single
     :term:`BSON` object. As a result you must ensure that there are
     fewer then 10,000 keys to prevent an exception.

   - The ``group`` command does not operate in :term:`sharded`
     environments. Use :command:`mapReduce` in these situations.

   .. read-lock

.. describe:: count

   The ``count`` command provides. For example: ::

        db.collection.count():

   In the ``mongo`` shell, this returns the number of documents in the
   collection (e.g. ``collection``). You may also run this command
   using the ``runCommand`` functionality, with the following results:
   ::

        > db.runCommand( { count: "collection" } );
        { "n" : 10 , "ok" : 1 }

   The collection in this example has 10 documents.

   .. read-lock

.. describe:: mapReduce

   The ``mapReduce`` command provides map/reduce functionality for the
   MongoDB server. In MongoDB map/reduce operations provide
   aggregation functionality, and are not used for querying the
   database. ``mapReduce`` creates a collection holding the results of
   the operation. The ``mapReduce`` command has the following syntax:
   ::

        { mapreduce : <collection>,
           map : <mapfunction>,
           reduce : <reducefunction>,
           query : <query filter object>,
           sort : <sorts to limit input objects. For optimization>,
           limit : <number of objects to return>,
           out : <output>,
           keeptemp: <true|false>,
           finalize : <finalizefunction>,
           scope : <object where fields go into javascript global scope>,
           jsMode : true,
           verbose : true,
        }

   Only the ``map`` and ``reduce`` options are required, all other
   fields are optional. The ``map`` and ``reduce`` functions are
   written in JavaScript. See :doc:`/map-reduce` for more information
   on using the ``mapReduce`` command.

   .. slave-ok

.. describe:: mapreduce.shardedfinish

   See :doc:`/map-reduce` for more information on mapReduce
   operations.

   .. slave-ok

.. describe:: findAndModify

   The ``findAndModify`` command provides an atomic modification and
   return of a single document. The command takes the following form: ::

        { findAndModify: collection, <options> }

   The shell and many drivers also provide a ``db.findAndModify();``
   method. This command returns, by default, the document is returned
   before modifications are made. The following options are available:

   - **query** specifies a filter to select a document to modify.

   - **sort** specifies a sort order if multiple documents are
     returned. The first document in this sort order will be
     manipulated by the command.

   - **remove**, when set, triggers ``findAndModify`` to remove the
     document. To set, specify "``remove: true``".

   - **update** specifies an :ref:`update operator <update-operators>`.
     to modify the returned documents.

   - **new**, when set, returns the modified object rather than the
     original. The ``new`` option is ignored for ``remove``
     operations. To set, specify "``new: true``".

   - **fields**, specifies a limited selection of fields to
     return. See ":ref:`projection operators <projection-operators>`"
     for more information.

   - **upsert**, when set, creates an object if the specified
     ``query`` returns no objects. To set, specify "``upsert: true``".

.. describe:: distinct

   The ``distinct`` command returns an array of distinct values for a
   given field across a single collection. The command takes the
   following form: ::

        { distinct: collection, key: age, query: { query: { field: { $exists: true } } } }

   Here, all distinct values of the field (or "``key``") ``age`` are
   returned in documents that match the query "``{ field: { $exists:
   true }``". The query is optional.

   The shell and many drivers provide a helper method that provides
   this functionality, consider the following equivalent syntax: ::

       db.collection.distinct("age", { field: { $exists: true } } );

   The ``distinct`` command will use an index to locate and return
   data.

.. describe:: eval

   The ``eval`` provides the ability to evaluate JavaScript functions
   on the database server. Consider the following (trivial) example: ::

        { eval: function() { return 3+3 } }

   The shell also provides a helper method. The above can be expressed
   in the following form: ::

        db.eval( function { return 3+3 } } );

   While you can input functions directly into the shell, they will be
   evaluated by the shell rather than the database itself. Consider
   the following behaviors and limitations:

   - ``eval`` does not work in :term:`sharded` environments.

   - The ``eval`` operation is blocking and prevents all writes to the
     database until ``eval`` has finished, unless the ``nolock`` flag
     is set to ``true``, For example: ::

           { eval: function() { return 3+3 }, nslock: true }

.. describe:: dataSize

   The ``dataSize`` command returns the size data size for a set of
   data within a certian rage. Consider the following syntax: ::

        { dataSize: "database.collection", keyPattern: { field: 1 }, min: { field: 10 }, max: { field: 100 } }

   This will return a document that contains the size of all matching
   documents. Replace "``database.collection``" value with database
   and collection from your deployment. The ``keyPattern``, ``min``,
   and ``max`` parameters are options.

   The amount of time required to return ``dataSize`` depends on the
   amount of data in the collection.

Replication
~~~~~~~~~~~

.. describe:: resync

   The ``resync`` command forces an out-of-date non-primary/master
   ``mongod`` instance to re-synchronize itself.

   .. write-lock, slave-ok, admin-only.

.. describe:: replSetFreeze

   To the greatest extent possible, the ``replSetFreeze`` command
   freezes the state of a member. Use the following syntax: ::

        { replSetFreeze: <seconds> }

   This will prevent the MongoDB instance from attempting to become
   primary until the time specified by "``<seconds>``". To reverse
   this operation and allow the instance to become primary, issue the
   following command: ::

        { replSetFreeze: 0 }

   Restarting the ``mongod`` process also unfreezes a replica set
   member, allowing the ``mongod`` instance to become primary
   again.

   ``replSetFreeze`` is an administrative command that must be issued
   against the ``admin`` database.

   .. slave-ok, admin-only

   See the ":doc:`/replication`" document for more information about
   replication.

.. describe:: replSetGetStatus

   The ``replSetGetStatus`` command returns the status of the replica
   set form the point of view of the current server. To get this
   status, Issue the following command on the :term:`admin database`: ::

        { replSetGetStatus: 1 }

   .. slave-ok, admin-only

   See the ":doc:`/replication`" document for more information about
   replication, and the ":doc:`/reference/replica-status`" document for more
   information on the output of this command .

.. describe:: replSetInitiate

   The ``replSetInititate`` command creates a replica set. Use the
   following syntax: ::

         { replSetInitiate : <config_object> }

   The "``<config_object>``" is a :term:`JSON document` that holds the
   configuration of a replica set. Consider the following model of the
   most basic configuration for a 3-member replica set: ::

          {
              _id : <setname>,
               members : [
                   {_id : 0, host : <host0>},
                   {_id : 1, host : <host1>},
                   {_id : 2, host : <host2>},
               ]
          }

   The ``mongo`` shell provides a helper method for
   ``replSetInititate``. You may also use the following syntax: ::

        rs.initiate()

   .. slave-ok, admin-only

   See the ":doc:`/replication`" document for more information about
   replication.

.. describe:: replSetReconfig

   The ``replSetReconfig`` provides the ability to modify an existing
   replica set configuration. Use the following syntax to add
   configuration to a replica set: ::

        { replSetReconfig: <config_object> }

   The JavaScript shell provides the ``rs.reconfig()`` function
   command as a helper for replica set reconfiguration.

   Be aware of the following ``replSetReconfig`` behaviors:

   - You must issue this command to the admin database of the current
     primary database in the set.

   - A majority of the set's members must be operational for the
     changes to propagate properly.

   - This command can cause downtime as the set renegotiates
     master-status. Typically this is 10-20 seconds; however, you
     should always perform these operations during scheduled
     maintenance periods.

   - In some situations, a ``replSetReconfig`` can cause the current
     shell to disconnect. Do not be alarmed.

   See the ":doc:`/replication`" document for more information about
   replication.

   .. slave-ok, admin-only

.. describe:: replSetStepDown

   The ``replSetStepDown`` command forces a ``mongod`` instance to
   step down as primary, and then (attempt to) avoid reelection to
   primary for a specified number of seconds. Consider the following
   syntax for this admin-only command: ::

        { replSetStepDown: <seconds> }

   Specify the amount of time, in seconds, for the server to avoid
   reelection to primary. If you do not specify a value for
   ``<seconds>``, ``replSetStepDown`` will attempt to avoid reelection
   to primary for 60 seconds.

   .. slave-ok, admin-only

   See the ":doc:`/replication`" document for more information about
   replication.

Geolocation
~~~~~~~~~~~

.. describe:: geoNear

   The ``geoNear`` command provides an alternative to the
   :operator:`$near` operator. In addition to the functionality of
   ``$near``, ``geoNear`` returns the distance of each item from the
   specified point and additional diagnostic information. For example:
   ::

         { geoNear : "places" , near : [50,50], num : 10 }

   Here, ``geoNear`` returns the 10 items nearest to the cordinates
   ``[50,50]``. ``geoNear`` provides the following options (all
   distances are specified in the same units as the document
   coordinate system:)

   - The `near`` option allows you to specify coordinates (e.g. ``[ x,
     y ]``) to use as the center of a geographical query.
   - The ``num`` option specifies the (maximum) number of for the
     operation to return.
   - The ``maxDistance`` option allows you to limit results based on
     their distance from the initial coordinates.
   - The ``query`` option makes it possible to narrow the results
     with any standard mongodb query.
   - The ``distanceMultiplier`` option is undocumented.

TODO distanceMultiplier research/definition

   .. read-lock, slave-ok

.. describe:: geoSearch

   The ``geoSearch`` command provides an interface to MongoDB's
   :term:`haystack index` functionality. These indexes are useful for
   returning results based on geolocation coordinates *after*
   collecting results based on some other query (i.e. a "haystack.")
   Consider the following example: ::

        { geoSearch : "foo", near : [33, 33], maxDistance : 6, search : { type : "restaurant" }, limit : 30 }

   The above command returns all documents with a ``type`` filed that
   holds the a ``restaurants`` value with a maximum distance of 6
   units from the coordinates "``[30,33]``" up to a maximum of 30
   results.

   Unless specified the ``geoSearch`` command limits results to 50
   documents.

   .. read-lock, slave-ok

Collections
~~~~~~~~~~~

.. describe:: drop

   The ``drop`` command removes an entire collection from a
   database. Consider the following syntax: ::

        { drop: "collection" }

   This drops entire collection named ``collection`` from the
   database. The ``mongo`` shell provides the equivalent helper
   method: ::

        db.collection.drop();

.. describe:: cloneCollection

   The ``cloneCollection`` command copies a single collection from one
   server to another. Consider the following example:  ::

        { cloneCollection: collection1, from: <host>, query: { field { $exists: true } }, copyIndexes: false }

   Here, ``collection1`` one from the database host ``<host>`` is
   copied to the current database. Only documents that satisfy the
   query "``{ field: { $exists: true } }`` are copied, and none of the
   indexes are copied. The ``query`` and ``copyIndexes`` parameters
   are optional.

   ``cloneCollection`` creates a collection on the current database
   with the same name as the origin collection. If, in the above
   example, ``collection1`` exists in the local database, it is
   emptied before copying begins. Do not use ``cloneCollection`` for
   local operations.

.. describe:: create

   The ``create`` command explicitly creates a collection. The command
   uses the following syntax: ::

        { create: "collection" }

   To create a capped collection  command in the following form.

        { create: "collection", capped: true, size: 40000, max: 9000 }

   The options for creating capped collections are:

   - **capped**, is "false," by default. Specify "``true``" to create
     a :term:`capped collection`.
   - **size** specifies a maximum "cap," in bytes for capped
     collections. If you specify a capped collection, you *must*
     specify a size cap.
   - **max** specifies a maximum "cap," in number of documents for
     capped collections. You must also specify ``size`` when
     specifying ``max``.

   If a collection has a cap on the number of documents and the size
   in bytes is reached first, older documents will be removed.

   You can use the ``.createCollection()`` method in the shell to
   access this functionality.

.. describe:: convertToCapped

   The ``convertToCapped`` command converts an existing, non-capped
   collection to a :term:`capped collection`. Use the following
   syntax: ::

        {convertToCapped: "collection", size: 100000, max: 9000 }

   Here, ``collection`` (an existing collection) is converted to a
   capped collection, with a maximum size of 100 kilobytes (specified
   in bytes) or 9000 records. The options used to specify the
   parameters of a capped collection are:

   - **size** specifies a maximum "cap," in bytes for capped
     collections. If you specify a capped collection, you *must*
     specify a size cap.
   - **max** specifies a maximum "cap," in number of documents for
     capped collections. You must also specify ``size`` when
     specifying ``max``.

   If a collection has a cap on the number of documents and the size
   in bytes is reached, older documents will be removed.

.. describe:: emptycapped

   The ``emptycapped`` command removes all documents from a capped
   collection. Use the following syntax: ::

        { emptycapped: "events" }

   This command removes all records from the capped collection named
   ``events``.

.. describe:: captrunc

   The ``captrunc`` command removes (i.e. truncates) the most recent
   additions to a capped collection. Use the following syntax: ::

        { captrunc: "events", n: 1 }

   In this example, the last ``1`` item entered is removed from the
   capped collection named ``events``. The ``n`` value, specifies the
   number of documents to truncate.

   The command is not safe to use on non-capped collection.

   .. is this internal?

      The command, in my tests, removes documents from non-capped
      collections (but it does throw an error.

      There's also an "inc" option which modifies the behavior but I'm
      not sure what this stands for.

TODO factcheck captrunc

.. describe:: rename Collection

   The ``renameCollection`` command changes the name of an existing
   collection. Use the following command to rename the collection
   named ``collection`` to ``events``: ::

        { renameCollection: store.collection, to: store.corpus }

   In this command, ``collection`` in the ``store`` database is
   renamed "``corpus``". This command must be run on the admin
   database, and thus requires specifying the database name
   (e.g. "``store``".)

   The shell helper "``renameCollection()``" exists to make renaming
   collections easier. Use the following command in the ``mongo``
   shell, which is equivalent to the command above:

        db.collection.renameCollection( "corpus" );

.. describe:: collStats

   The ``collStats`` command returns a number of regarding a
   collection. Use the following syntax: ::

        { collStats: "database.collection" , scale : 1024 }

   Specify a collection in the form of "``database.collection``" and
   use the ``scale`` argument to control the output. The above example
   will display values in kilobytes.

   Consider the following example output: ::

        > db.collection.stats()
        {
                "ns" : "database.collection",   // database namespace
                "count" : 9,                    // number of documents
                "size" : 432,                   // collection size in bytes unless alternate scale used.
                "avgObjSize" : 48,              // average object size in bytes
                "storageSize" : 3840,           // (pre)allocated space for the collection
                "numExtents" : 1,               // extents are contiguously allocated chunks of datafile space
                "nindexes" : 2,                 // number of indexes
                "lastExtentSize" : 3840,
                "paddingFactor" : 1,            // padding can speed up updates if documents grow
                "flags" : 1,
                "totalIndexSize" : 16384,       // total index size in bytes
                "indexSizes" : {                // size of specific indexes in bytes
                        "_id_" : 8192,
                        "x_1" : 8192
                },
                "ok" : 1
        }

   The ``mongo`` shell also provides a helper. The following command
   is equivalent to the above: ::

        db.collection.stats();

.. describe:: compact

   The ``compact`` command optimizes the storage for a single
   :term:`capped collection`. This is similar to the
   :command:`repairDatabase` command, except that ``compact`` operates
   on a single collection. The command uses the following syntax: ::

        { compact: "collection" }

   In this example, ``collection`` will be compacted. Generally, this
   operation defragments and optimizes the storage organization of the
   collection as well as rebuilds and optimizes indexes. Consider the
   following behaviors:

   - During a ``compact``, the database blocks all other activity.

   - In a :term:`replica set`, ``compact`` will refuse to run on the
     master node in a replica set unless the "``force: true``" option
     is specified. For example: ::

           { compact: "collection", force: true }

   - If you have journeying enabled and "kill" the ``compact``
     operation, or the database restarts during a ``compact``
     operation, no data will be lost, although indexes will be
     absent. Running ``compact`` without journaling may risk data
     loss.

     .. warning::

        Always have an up-to-date backup before performing server
        maintenance such as the ``compact`` operation.

   - ``compact`` requires a small amount of additional diskspace while
     running but unlike :command:`repairDatabase` it does *not* free
     space equal to the total size of the collection.

   - the ``compact`` command will not return until the operation is
     complete.

   - ``compact`` removes any :term:`padding factor` in the collection,
     which may impact performance if documents grow regularly.

   - ``compact`` commands do not replicate and can be run on slaves
     and replica set members.

   - :term:`Capped collections` cannot be compacted.

Administration
~~~~~~~~~~~~~~

.. describe:: fsync

   ``fsync`` is an administrative command that forces the ``mongod``
   process to flush all pending writes to the data files. In default
   operation, full flush runs within every 60 seconds. Running
   ``fsync`` in the course of normal operations is not required. The
   command takes the following form: ::

        { fsync: 1 }

   The ``fsync`` command is synchronous and returns only after the
   operation has completed. To run the command asynchronously, use the
   following syntax: ::

        { fsync: 1, async: true }

   The ``fsync`` operation blocks all other write operations for a
   while it runs. To toggle a write-lock using ``fsync``, add a lock
   argument, as follows: ::

        { fsync: 1, lock: true }

   Later, you will need to issue a command to unlock the
   database. This command will block until the operation is complete:
   when the command returns the database is unlocked. Such a command
   would resemble: ::

        { fsync: 1, lock: false }

   In the shell, the following helpers exist to simplify this
   process: ::

        db.fsyncLock();
        db.fsyncUnlock();

   .. versionadded:: 1.9.0
      The ``db.fsyncLock()`` and ``db.fsyncUnlock`` helpers in the
      shell.

.. describe:: dropDatabase

   The ``dropDatabase`` command drops the database from MongoDB and
   deletes the associated data files. ``dropDatabase`` operates on the
   current database. In the shell issue the ``use <database>``
   command, replacing "``<database>``" with the name of the database
   you wish to delete. Then use the following command form: ::

        { dropDatabase: 1 }

   The ``mongo`` shell also provides the following helper method for
   this function operation: ::

        db.dropDatabase();

   .. write-lock

.. describe:: dropIndexes

   The ``dropIndexes`` command provides the ability to drop or remove
   indexes for the current collection. The command either: removes all
   databases, or selectively drop indexes. To drop all indexes issue a
   command in the following format: ::

        { dropIndexes: "collection", index: "*" }

   Specify the field in the "index" parameter to drop indexes with a
   specific key pattern. For example, to drop all indexes of the
   "``age``" field, use the following command format: ::

        { dropIndexes: "collection", index: "age: 1" }

   The shell also provides the following command helper: ::

        db.collection.dropIndex();

   Use as above to drop all indexes in ``collection``, and specify
   fields to only drop specific indexes.

.. describe:: clone

   The ``clone`` provides the ability to clone a database from a
   remote MongoDB instance to the current host. ``clone`` copies the
   database on the remote instance with the same name as the current
   database. The command takes the following form: ::

        { clone: "example.com" }

   Replace ``example.com`` above with the resolvable hostname for the
   MongoDB instance you wish to copy from. Note the following
   behaviors:

   - ``clone`` can run against a :term:`slave` or a
     non-:term:`primary` member of a :term:`replica set`.
   - ``clone`` does not snapshot the database. If the copied database is
     updated at any point during the clone operation the resulting
     database may be inconsistent.
   - You must run ``clone`` on the **destination server**.
   - The destination server is not locked during the duration of the
     ``clone`` operation, and ``clone`` will occasionally yield to
     allow other operations.

   See :command:`copydb`  for similar functionality.

.. describe:: closeAllDatabases

   The ``closeAllDatabases`` command forces ``mongod`` to close all
   open database files. The command takes the following form: ::

        { closeAllDatabases: 1 }

   .. note::

      A new request will cause the ``mongod`` to immediately reopen
      the database files. As a result this command is primarily useful
      for testing purposes

.. describe:: repairDatabase

   The ``repairDatabase`` command checks and repairs errors and
   inconsistencies with the data storage. The command is analogous to
   a ``fsck`` command for file systems. If your ``mongod`` instance is
   not running with journaling and you experience an unexpected system
   restart or crash, you should run the ``repairDatabase`` command to
   ensure that there are no errors in the data storage. Additionally,
   the ``repairDatabase`` command will compact the database similar to
   the functioning of :command:`compact`. Issue the command with the
   following syntax.

        { repairDatabase: 1 }

   Be aware that this command can take a long time to run depending on
   the size of your database.

   This command is accessible via a number of different avenues. You
   may:

   - Use the shell to run the above command, as above.

   - Run ``mongod`` directly from your system's shell. Make sure that
     ``mongod`` isn't already running, and that you issue this command
     as a user that has access to MongoDB's data files. Run as: ::

           $ mongod --repair

     .. note::

        This command will fail if your database is not a master or
        primary. Restart the server on another port without the
        ``--replSet`` option.

   - Use the following shell helper: ::

           db.repairDatabase();

   .. note::

      When :term:`journaling` is enabled, there is no need to run
      ``repairDatabase``.

.. describe:: shutdown

   The ``shutdown`` command shuts down the database process. The
   command takes the following form: ::

        { shutdown: 1 }

   .. note::

      The ``shutdown`` command must be run against the admin
      database. Additionally, the command must be issued from a
      connection on localhost, or the connection must be
      authenticated.

   For :doc:`replica set </replication>` users, if the current node is
   primary and no other members of the set are less than 10 seconds
   behind the node then the server will not shut down without a
   "force" option. See the following example: ::

        { shutdown: 1, force: true }

   The ``shutdown`` command also supports a ``timeoutSecs`` argument
   which allows you to specify a number of seconds to wait for other
   members of the replica set to catch up. That command resembles: ::

        { shutdown: 1, timeoutSecs: 60 }

   The ``mongo`` shell also provides the following helper method: ::

        db.shutdownServer();

.. describe:: copydb

   The ``copydb`` command copies a database from another host to the
   current host. This provides similar functionality to
   :command:`clone`, but provides additional flexibility. The command
   takes the following syntax: ::

        { copydb: 1:
          fromhost: <hostname>,
          fromdb: <db>,
          todb: <db>,
          slaveOk: <bool>,
          username: <username>,
          nonce: <nonce>,
          key: <key> }

   The following arguments are optional:

   - slaveOK
   - username
   - nonce
   - key

   Be aware of the following behaviors:

   - ``copydb`` can run against a :term:`slave` or a
     non-:term:`primary` member of a :term:`replica set`.

   - ``copydb`` does not snapshot the database. If the copied database is
     updated at any point during the copydb operation the resulting
     database may be inconsistent.

   - You must run ``copydb`` on the **destination server**.

   - The destination server is not locked during the duration of the
     ``copydb`` operation, and ``copydb`` will occasionally yield to
     other operations.

TODO is the password an option here?

.. describe:: logout

   The ``logout`` command forces the current session to end the
   current authentication session. The command takes the following
   syntax: ::

        { logout: 1 }

   .. note::

      If you're not logged on using authentication this command will
      not have any effect.

.. describe:: logRotate

   ``logRotate`` is an admin only command that allows you to rotate
   the MongoDB commands to prevent a single logfile from consuming too
   much disk space. Use the following syntax: ::

        { logRotate: 1 }

   .. note::

      Your ``mongod`` instance needs to be running with the
      ``--logpath <file>`` option for the ``logRotate`` command.

   You may also rotate the logs by sending the ``mongod`` process the
   ``SIGUSR1`` signal.

   .. note::

     The ``logRotate`` command is not available to mongod instances
     running on windows systems.

TODO does logRotate remove the old files or rename them?

.. describe:: setParameter

   ``setParamenter`` is an administrative command for modifying the
   operational parameters of the MongoDB instance. The
   ``setParameter`` command must be issued against the ``admin``
   database.  The command takes form: ::

        { setParameter: 1, <option>: <value> }

   Replace the ``<option>`` with one of the following options
   supported by this command:

   - **journalCommitInterval** specify a ``<value>`` between 1 and 500
     to control the number of milliseconds (ms) between journal
     commits.

   - **logLevel** specify a ``<value>`` as an integer between ``0``
     and ``5`` to determine the verbosity of the logging.

   - **notablescan** specify a "``true``" or "``false``" value for this
     option allow or disable collection (e.g. table) scans.

   - **quiet** specify a "``true``" or "``false``" value for this
     option to enable or disable a quiet logging mode. This toggles
     the same option as running ``mongod`` with the "``--quiet``"
     flag. This will suppress logging of the following messages:

     - Connection events: accepted and closed.
     - Commands: :command:`drop`, :command:`dropIndex`, and
       :command:`daglogging`, :command:`validate`, :command;`clean`.
     - Replication synchronization activity.

   - **syncdelay** specify a ``<value>``, in seconds, to control the
     interval that the ``mongod`` flushes memory to disk. By default
     ``mongod`` will flush memory to disk every 60 seconds.

   .. slave-ok, admin-only

.. describe:: getParameter

   ``getParemeter`` is an administrative command for retrieving the
   current operational parameters for a MongoDB instance. Issue
   commands against the ``admin`` database in the following form: ::

        { getParameter: 1, <option>: 1 }

   The values specified for ``getParameter`` and ``<option>`` do not
   effect the output. The command provides visibility for the
   following options:

   - **quiet**
   - **notablescan**
   - **logLevel**
   - **syncdelay**

   See :command:`setParameter` for more regarding these parameters.

   .. slave-ok, admin-only

Diagnostics
~~~~~~~~~~~

.. describe:: dbStats

   The ``dbStats`` command returns a document with information
   regarding a specific database. This command does not return
   instantly, and the time required to run the command depends on the
   total size of the database. The command takes the following syntax:

        { dbStats: 1, scale: 1 }

   The value of the argument (e.g. ``1`` above) to ``dbStats`` does
   not effect the output of the command. The "``scale``" option
   allows you to configure how the values of bytes are
   scaled. For example, specify a "``scale``" value of "``1024``" to
   display kilobytes rather than bytes.

   The ``mongo`` shell provides the following helper method. for
   ``dbStats``. The following helper method is equivalent to the
   example above: ::

        db.stats()

.. describe:: connPoolStats

   The command ``connPoolStats`` returns information regarding the
   number of open connections to the current database instance
   including client connections and server-to-server connections for
   replication and clustering. The command takes the following form:
   ::

        { connPoolStats: 1 }

   The value of the argument (e.g. ``1`` above) does not effect the
   output of the command.

.. describe:: getCmdLineOpts

   The ``getCmdLineOpts`` command returns a document with information
   regarding the runtime options used by the MongoDB server. Consider
   the following syntax: ::

        { getCmdLineOpts: 1 }

   The value of the argument (e.g. ``1`` above) does not effect the
   output of the command.

   This command returns a document with two fields, "``argv``" and
   "``parsed``". The "``argv``" field contains an array with each item
   from the command string that invoked ``mongod``. The document
   in the "``parsed``" field includes all runtime options, including
   those parsed from the command line and those specified in the
   configuration file (if specified.)

.. describe:: validate

   The ``validate`` command checks the contents of a namespace by
   scanning data structures,  and indexes for correctness. The command
   can be slow to run particularly on larger data sets. Consider the
   following syntax: ::

        { validate: "collection" }

   This command will validate the contents of the collection named
   "``collection``". You may also specify one of the following
   options:

   - "``full: true``" provides a more thorough scan of the data.

   - "``scandata: false``" skips the scan of the base collection
     without skipping the scan of the index.

   The ``mongo`` shell also provides a shell wrapper which is
   equivalent to the first example above: ::

        db.collection.validate();

TODO factcheck; the options on the REST interface and wiki differ

.. describe:: top

   The ``top`` command returns raw usage of each database, and
   provides amount of time, in microseconds, used and a count of
   operations for the following event types:

   - total
   - readLock
   - writeLock
   - queries
   - getmore
   - insert
   - update
   - remove
   - commands.

   The command takes the following form: ::

        { top: 1 }

   The value of the argument (e.g. ``1`` above) does not effect the
   output of the command.

.. describe:: buildInfo

   The ``bulidInfo`` command returns information regarding the build
   of MongoDB currently running. The command takes the following
   form: ::

         { buildInfo: 1 }

   The value of the argument (e.g. ``1`` above) does not effect the
   output of the command. The data returned includes:

   - The version of MongoDB currently running.
   - The information about the system that the mongod binary was built
     on and a time stamp of this build.
   - The architecture of the binary (i.e. 64 or 32 bits)
   - The maximum :term:`BSON` object size in bytes (in the field
     "``maxBsonObjectSize``".)

   ``buildInfo`` must be issued while using the ``admin`` database.

.. describe:: getLastError

   The ``getLastError`` command returns the error status of the last
   operation *on this connection*. Consider the following syntax: ::

        { getLastError: 1 }

   The value of the argument (e.g. ``1`` above) does not effect the
   output of the command. The following options are available:

   - "``fsync: true``" run an :command:`fsync` before returning. If
     your database is running with :doc:`journaling </journaling>`,
     this option will instead wait for the next journal commit before
     returning.
   - "``j: true``" waits for the next journal commit before
     returning.
   - "``w: <n>``" waits for replication to "``<n>``" number of
     servers before returning. If specified this value will include
     the current host.
   - "``wtimeout: <ms>``" provides a timeout for for the "``w``"
     option. Specify this value in milliseconds.

.. describe:: getLog

   The ``getLog`` command returns a document with a ``log`` array that
   contains recent messages from the ``mongod`` process's log. Use the
   following syntax: ::

        { getLog: <log> }

   Replace "``<log>``" with one of the following values:

   - ``"startupWarnings"`` - to generate logs that *may* contain
     errors or warnings from MongoDB's log from the when the current
     process started.

   - ``"global"`` - to generate the most recent log events from the
     database. This is equivalent to running the "``tail``" command on
     the ``mongod`` log in the system shell.

.. describe:: listDatabases

   The ``listDatabases`` command provides a list of the extant
   databases along with basic statistics regarding the database. The
   command takes the following form: ::

        { listDatabases: 1 }

   The value (e.g. ``1``) does not effect the output of the
   command. ``listDatabases`` returns documents for each database, within
   the "``databases``" array as well a ``totalSize`` field which
   contains the total amount of disk space used for the database in
   bytes. The documents for each database contain a "``name``" field
   with the database name, a "``sizeOnDisk``" field with the total
   size of the database file on disk in bytes, and the "``empty``"
   field with a true or false value.

.. describe:: cursorInfo

   The ``cursorInfo`` command returns information about current cursor
   allotment and use. Use the following form: ::

        { cursorInfo: 1 }

   The value (e.g. ``1`` above,) does not effect the output of the
   command. ``cursorInfo`` provides values for the total number of
   open cursors ("``totalOpen``",) the size of client cursors in
   current use ("``clientCursors_size``",) and the number of timed out
   cursors since the last server restart ("``timedOut``".)

.. describe:: isMaster

   The ``isMaster`` command returns ``true`` if the current instance
   is the primary node in a replica set or the master in a simple
   master/slave setup. The command takes the following form: ::

        { isMaster: 1 }

   This command will return a ``true`` value on ``mongod`` instances
   that are running as standalone nodes.

.. describe:: ping

   The ``ping`` command is used to test the server to ensure that it
   is running. This command will return immediately even if the server
   has a db lock. Issue the command with the following syntax: ::

        { ping: 1 }

   The value (e.g. ``1`` above,) does not impact the behavior of the
   command.

.. describe:: journalLatencyTest

   ``journalLatencyTest`` is an admin command that tests the length of
   time required to write and perform a file system sync (e.g. fsync)
   for a file in the journal directory. The command syntax is: ::

         { journalLatencyTest: 1 }

   The value (i.e. ``1`` above), does not effect the operation of the
   command.

.. describe:: availableQueryOptions

   { "options" : 254, "ok" : 1 }

TODO no documentation exists, and the response I get is the above

.. describe:: serverStatus

   The ``serverStatus`` command returns a document that provides an
   overview of the database process' state. The command takes the
   following form: ::

        { serverStatus: 1 }

   The value (i.e. ``1`` above), does not effect the operation of the
   command. You may also access this command with the following shell
   helper: ::

        db.serverStatus();

   For more information about the output of this command, see the
   ":doc:`/reference/server-status`" documentation.

.. describe:: resetError

   The ``resetError`` command resets the error status. Use this
   command with :command:`getpreverror``

.. describe:: getpreverror

   The ``getPrevError`` command returns the errors since the last
   :command:`resetError` command.

.. describe:: forceerror

   The force error command is for testing purposes only. Use
   ``forceerror`` to force a user assertion exception.

.. describe:: profile

   Use the ``profile`` command to enable, disable or change the
   profile level. Use the following syntax: ::

        { profile: -1 }

   The following profiling levels are available:

   - ``0`` - off; no profiling.
   - ``1`` - on; log slow operations only.
   - ``2`` - on; log all operations.
   - ``-1`` - return the current profiling level.

.. describe:: listCommands

   The ``listCommands`` command generates a list of all database
   commands implemented in the running version of ``mongod``.

   .. slave-ok

Other Commands
~~~~~~~~~~~~~~

.. describe:: reIndex

   The ``reIndex`` command triggers a rebuild of all indexes for a
   specified collection. Use the following syntax: ::

        { reIndex: "collection" }

   Indexes are automatically compacted as they are updated. In routine
   operations ``reIndex`` is unnecessary; however, you may wish if the
   collection size changed significantly or the indexes are consuming
   a disproportionate amount of disk space. The ``reIndex`` process is
   blocking, and will be slow for larger collections. You can also
   call ``reIndex`` using the following form: ::

        db.collection.reIndex();

.. describe:: filemd5

   The ``filemd5`` command returns :term:`md5` hashes for every object
   in a :term:`GridFS` store. Use the following syntax: ::

        { filemd5: "style-guide.rst" }

TODO find md5 "root" argument, and other functionality.

Internal Use
------------

.. describe:: setShardVersion

   ``setShardVersion`` is an internal command that supports sharding
   functionality.

   .. admin-only

.. describe:: getShardVersion

   ``getShardVersion`` is an internal command that supports sharding
   functionality.

   .. admin-only

.. describe:: unsetSharding

   ``unsetSharding`` is an internal command that supports sharding
   functionality.

   .. slave-ok, admin-only

.. describe:: whatsmyuri

   ``whatsmyuri`` is an internal command.

   .. slave-ok

.. describe:: features

   ``features`` is an internal command that returns the build-level
   feature settings.

   .. slave-ok

.. describe:: driverOIDTest

   ``driverOIDTest`` is an internal command.

   .. slave-ok

.. describe:: diagLogging

   ``diagLogging`` is an internal command.

   .. write-lock, slave-ok,

.. describe:: copydbgetnonce

   ``copydbgetnonce`` is an internal command.

   .. write-lock, admin-only

.. describe:: dbHash

   ``dbHash`` is an internal command.

   .. slave-ok, read-lock

.. describe:: medianKey

   ``medianKey`` is an internal command.

   .. slave-ok, read-lock

.. describe:: geoWalk

   ``geoWalk`` is an internal command.

   .. read-lock, slave-ok

.. describe:: sleep

   ``sleep` an internal command for testing purposes. The ``sleep``
   command forces the db block all operations. It takes the following
   options: ::

        { sleep: { w: true, secs: <seconds> } }

   The above command places the ``mongod`` instance in a "write-lock"
   state for a specified (i.e. ``<seconds>``) number of
   seconds. Without arguments, ``sleep``, causes a "read lock" for 100
   seconds.

.. describe:: getnonce

   ``getnonce`` is an internal command.

   .. slave-ok

.. describe:: getoptime

   ``getoptime`` is an internal command.

   .. slave-ok

.. describe:: godinsert

   ``godinsert`` is an internal command for testing purposes only.

   .. write-lock, slave-ok

.. describe:: clean

   ``clean`` is an internal command.

   .. write-lock, slave-ok

.. describe:: applyOps

   ``applyOps`` is an internal command that supports sharding
   functionality.

   .. write-lock

.. describe:: replSetElect

   ``replSetElect`` is an internal command that support replica set
   functionality.

   .. slave-ok, admin-only

.. describe:: replSetGetRBID

   ``replSetGetRBID`` is an internal command that support replica set
   functionality.

   .. slave-ok, admin-only

.. describe:: replSetHeartbeat

   ``replSetheThis`` is an internal command that support replica set functionality.

   .. slave-ok

.. describe:: replSetFresh

   ``replSetFresh`` is an internal command that support replica set
   functionality.

   .. slave-ok, admin-only

.. describe:: writeBacksQueued

   ``writeBacksQueued`` is an internal command that returns true if
   there are operations in the write back queue when
   ``writeBacksQueued`` was called.

   .. slave-ok, admin-only

TODO factcheck (minor)

.. describe:: connPoolSync

   ``connPoolSync`` is an internal command.

   .. slave-ok

.. describe:: checkShardingIndex

   ``checkShardingIndex`` is an internal command that supports the
   sharding functionality.

   .. read-lock

.. describe:: getShardMap

   ``getShardMap`` is an internal command that supports the sharding
   functionality.

   .. slave-ok, admin-only

.. describe:: splitChunk

   ``splitChunk`` is an internal command.

TODO splitChunk has some documentation in the RESTfull command list, should it be included here?

   .. admin-only.

.. describe:: writebacklisten

   ``writebacklisten`` is an internal command.

   .. slave-ok, admin-only

.. describe:: replSetTest

   ``replSetTest`` is internal diagnostic command used for regression
   tests that supports replica set functionality.

   .. slave-ok, admin-only

.. describe:: moveChunk

   ``moveChunk`` is an internal command that supports the sharding
   functionalty and should not be called directly.

   .. admin-only

.. describe:: authenticate

   ``authenticate`` is an internal command.

   .. read-lock, slave-ok

.. describe:: handshake

   ``handshake`` is an internal command.

   .. slave-ok

.. describe:: _isSelf

   ``_isSelf`` is an internal command.

   .. slave-ok

.. describe:: _migrateClone

   ``_migrateClone`` is an internal command and should not be called
   directly.

   .. admin-only

.. describe:: _recvChunkAbort

   ``_recvChunkAbort`` is an internal command and should not be called
   directly.

   .. admin-only

.. describe:: _recvChunkCommit

   ``_recvChunkCommit`` is an internal command and should not be
   called directly.

   .. admin-only

.. describe:: _recvChunkStatus

   ``_recvChunkStatus`` is an internal command and should not be
   called directly.

   .. admin-only

.. describe:: _skewClockCommand

   ``skewClockCommand`` is an internal command and should not be
   called directly.

   .. admin-only

.. describe:: _testDistLockWithSkew

   ``_testDistLockWithSkew`` is an internal command and should not be
   called directly.

   .. admin-only

.. describe:: _testDistLockWithSyncCluster

   ``_testDistLockWithSyncCluster`` is an internal command and should
   not be called directly.

   .. admin-only

.. describe:: _transferMods

   ``_transferMods`` is an internal command and should not be called
   directly.

   .. admin-only

.. describe:: _recvChunkStart

   ``_recvChunkStart`` is an internal command and should not be called
   directly.

   .. admin-only, write-lock
