=================
Command Reference
=================

.. default-domain:: mongodb
.. highlight:: javascript

This document contains a reference to all :term:`database commands <database command>`.

The MongoDB command interface provides access
to all non-CRUD database operations. Fetching
server stats, initializing a replica set, and running a map-reduce job
are all accomplished by running a command.

You specify a command first by constructing a standard :term:`BSON` document
whose first key is the name of the command. For example, the ``isMaster`` command
is specified using the following ``BSON`` document: ::

    { isMaster: 1 }

To execute this command, you send this document as a query on the special :term:`$cmd`
collection: ::

    db.$cmd.findOne( {isMaster: 1} )

The JavaScript shell (i.e. :option:`mongo`,) provides a helper method for
running commands. Thus, you can also run the above command like so: ::
.. code-block:: javascript

    db.runCommand( { isMaster: 1 } )

Quite a few commands even have their own shell helpers: ::
.. code-block:: javascript

    db.isMaster();

Some commands must be run on the ``admin`` database. Normally, that looks like this: ::
.. code-block:: javascript

    use admin
    db.runCommand( {buildInfo: 1} )

However, there's also a command helper that automatically switches to this database: ::
.. code-block:: javascript

    db._adminCommand( {buildInfo: 1} )

This ``_adminCommand`` helper is shorthand for "``db.getSisterDB("admin").runCommand();``".

All commands return, at minimum, a document with an ``ok`` field indicating whether the
command has succeeded: ::

    { 'ok': 1 }

If the command fails, the value of ``ok`` will be 0.

In the command descriptions below, we provide the document template for each command.
In some cases, we also show the relevant ``mongo`` shell helpers.

User Commands
-------------

Sharding
~~~~~~~~

.. seealso:: ":doc:`/core/sharding`" for more information about
   MongoDB's sharding functionality.

.. dbcommand:: addShard

   The ``addShard`` command registers a new with a sharded
   cluster. You must run this command against a :option:`mongos`
   instance. The command takes the following form: ::

        { addshard: "<hostname>:<port>" }

   Replace "``<hostname>:<port>``" with the hostname and port of the
   database instance you want to add as a shard. Because the
   :option:`mongos` instances do not have state and distribute
   configuration in the :term:`configdbs <configdb>`, you send this
   command to only one :option:`mongos` instance.

   There are two optional parameters:

   - **name**. Unless specified, a name will be automatically provided
     to uniquely identify the shard.

   - **maxSize** Unless specified, shards will consume the total
     amount of available space on their machines if necessary. Use the
     ``maxSize`` value to limit the amount of space the database can
     use.

     .. note::

        Specify a ``maxSize`` when you have machines with different
        disk capacities, or if you want to limit the amount of data on
        some shards.

.. dbcommand:: listShards

   Use the ``listShards`` command to return a list of configured
   shards. The command takes the following form: ::

        { listShards: 1 }

.. dbcommand:: enableSharding

   The ``enableSharding`` command enables sharding on a per-database
   level. Use the following command form: ::

        { enableSharding: 1 }

   Once you've enabled sharding in a database, you can use the :dbcommand:`shardCollection`
   command to begin the process of distributing data among the shards.

.. dbcommand:: shardCollection

   The ``shardCollection`` command marks a collection for sharding and
   will allow data to begin distributing among shards. You must run
   :dbcommand:`enableSharding` on a database before running the
   ``shardCollection`` command. ::

        { shardcollection: "<db>.<collection>", key: "<shardkey>" }

   This enables sharding for the collection specified by
   ``<collection>`` in the database named ``<db>``, using the key
   "``<shardkey>``" to distribute documents among the shard.

   Choosing the right shard key to effectively distribute load among
   your shards requires some planning. See
   :doc:`/core/sharding` for more information related to sharding and
   the choice of shard key.

   .. warning::

      There's no easy way to disable sharding once you've enabled it. In addition,
      shard keys are immutable. If you must revert a sharded cluster to a single
      node or replica set, you'll have to make a single backup of the entire cluster
      and then restore the backup to the standalone ``mongod``.

.. dbcommand:: shardingState

   The ``shardingState`` command returns ``true`` if the
   :option:`mongod` instance is a member of a sharded cluster. Run the
   command using the following syntax: ::

        { shardingState: 1 }

   .. admin-only

.. dbcommand:: removeshard

   Starts the process of removing a shard from a :term:`shard
   cluster`. This is a multi-stage process. Begin by issuing the following
   command: ::

        { removeshard : "shardName" }

   Here, "``shardName``` refers to the hostname of the shard that you wish
   to remove. The balancer will then begin migrating chunks from this
   shard to other shards in the cluster. This process happens slowly
   to avoid placing undue load on the overall cluster.

   The command returns immediately, with the following message: ::

        { msg : "draining started successfully" , state: "started" , shard: "shardName" , ok : 1 }

   If you run the command again, you'll see the following progress
   output: ::

        { msg: "draining ongoing" ,  state: "ongoing" , remaining: { chunks: 23 , dbs: 1 }, ok: 1 }

   The ``remaining`` :term:`document <JSON document>`" specifies how
   many chunks and databases remain on the shard. Use
   :dbcommand:`printShardingStatus` to list the databases that
   must be moved from the shard.

   Each database in a sharded cluster is assigned a primary shard. If the shard you want to remove
   is also the primary of one the cluster's databases, then you must manually move the database to
   a new shard. This can be only after the shard has been drained. See the :dbcommand:`moveprimary` command
   for details.

   Once all chunks and databases have been removed from the shard, you
   may issue the command again, to return: ::

        { msg: "remove shard completed successfully , stage: "completed", host: "shardName", ok : 1 }

.. dbcommand:: moveprimary

   In a :term:`shard cluster`, this command reassigns a databases primary shard.
   The command takes the following form: ::

        { moveprimary : "test", to : "shard0001" }

   When the command returns, the database's primary location will have been
   shifted to the designated :term:`shard`. To fully decomission a
   shard, use the :dbcommand:`removeshard` command.

   .. warning:: Do not use :dbcommand:`moveprimary` if you have
      sharded collections and the :term:`draining` process has not
      completed.

Aggregation
~~~~~~~~~~~

.. dbcommand:: group

   The ``group`` command returns an array of grouped items. ``group``
   provides functionality analogous to the ``GROUP BY`` statement in
   SQL. Consider the following example: ::

        db.users.group(
                        {key: { school_id: true },
                         cond: { active: 1 },
                         reduce: function(obj, prev) { obj.total += 1; },
                         initial: { total: 0 }
                        }
                      );

   Here ``group`` runs against the collection "``users``" and
   counts the total number of active users from each school.
   Fields allowed by the group command include:

   - **key** a document specifying one or more fields to group on.
   - **reduce** a JavaScript function that aggregates (i.e., reduces) the
     grouped documents. This function typically counts or sums the fields being grouped on.
   - **initial** the starting value of the aggregation counter
     object.
   - **keyf** In lieu of ``key``, ``keyf`` takes a JavaScript function. For each document
     being grouped upon, the key function will return a key object. You'll use ``keyf``
     when the key must be calculated in real time.
     One typical use of ``keyf`` is to group documents by day of week. Set ``keyf`` in
     lieu of a key.
   - **cond** (optional) a query selector that filters the documents to be
     grouped on. This functions like a
     :dbcommand:`find()` query.
   - **finalize** (optional) a function applied to every
     result before the item is returned. You can use this to
     for post-processing or transformations.

   Consider the following limitations:

   - The results of the ``group`` command are returned as a single
     :term:`BSON` object and therefore must fit within the max BSON document
     size (16 MB).

   - You must ensure that there are fewer then 10,000 unique keys. If you have more than this,
     use :command:'mapReduce'.

   - The ``group`` command does not operate in :term:`sharded
     <sharding>` environments. Use :dbcommand:`mapReduce` in these
     situations.

   .. read-lock

.. dbcommand:: count

   The ``count`` command counts the number of documents in a collection. For example: ::

        db.collection.count():

   In the ``mongo`` shell, this returns the number of documents in the
   collection (e.g. ``collection``). You may also run this command
   using the ``runCommand`` functionality, with the following results:
   ::

        > db.runCommand( { count: "collection" } );
        { "n" : 10 , "ok" : 1 }

   The collection in this example has 10 documents.

   .. read-lock

.. dbcommand:: mapReduce

   The ``mapReduce`` command allows you to run map-reduce-style aggregations
   over a collection. ``mapReduce`` may create a collection to contain the results of
   the operation or may return the results inline. The ``mapReduce`` command has the
   following syntax: ::

        { mapreduce : <collection-name>,
           map : <map-function>,
           reduce : <reduce-function>,
           query : <query-filter-object>,
           sort : <sort-specifier document>,
           limit : <limits the number of documents in the input set>,
           out : <output style>,
           finalize : <finalize-function>,
           scope : <object where fields go into javascript global scope>,
           jsMode : true,
           verbose : true,
        }

   Only the ``map`` and ``reduce`` options are required, all other
   fields are optional. The ``map`` and ``reduce`` functions are
   written in JavaScript.

   .. seealso:: ":js:func:`mapReduce()`" and ":doc:`/core/map-reduce`"

   .. slave-ok

.. dbcommand:: mapreduce.shardedfinish

   See :doc:`/core/map-reduce` for more information on mapReduce
   operations.

TODO lacking a lot of documentation. Can you describe each option in the way you do with 'group'? See the command description in MIA book.

   .. slave-ok

.. dbcommand:: findAndModify

   The ``findAndModify`` command atomically modifies and
   returns a single document. The command takes the following form: ::

        { findAndModify: collection, <options> }

   The shell and many :term:`drivers <driver>` provide a
   :js:func:`findAndModify()` helper method.

   The following options are available:

   - **query**: a query selector for choosing the document to modify.

   - **sort**: if the query selects multiple documents, the first document
     given by this sort clause will be the one modified.

   - **remove**: when ``true``, causes ``findAndModify`` to remove the
     selected document.

   - **update**: an :ref:`update operator <update-operators>`.
     to modify the selected document.

   - **new**: when ``true``, returns the modified document rather than the
     original. The ``new`` option is ignored for ``remove``
     operations.

   - **fields**: a subset of fields to
     return. See ":ref:`projection operators <projection-operators>`"
     for more information.

   - **upsert**: when ``true``, creates a new document if the specified
     ``query`` returns no documents.

TODO: link to more complete documentation with common examples.

.. dbcommand:: distinct

   The ``distinct`` command returns an array of distinct values for a
   given field across a single collection. The command takes the
   following form: ::

        { distinct: collection, key: age, query: { query: { field: { $exists: true } } } }

   Here, all distinct values of the field (or "``key``") ``age`` are
   returned in documents that match the query "``{ field: { $exists:
   true }``".

   .. note::

      The query portion of the :dbcommand:`distinct` is optional.

   The shell and many :term:`drivers <driver>` provide a helper method that provides
   this functionality. You may prefer the following equivalent syntax: ::

       db.collection.distinct("age", { field: { $exists: true } } );

   The ``distinct`` command will use an index to locate and return
   data.

.. dbcommand:: eval

TODO: would it be possible to have a convention in the command forms indicating which parts
are required and which are options? For instance, required options could be in bold.

   The ``eval`` command evaluates JavaScript functions
   on the database server. Consider the following (trivial) example: ::

        { eval: function() { return 3+3 } }

   The shell also provides a helper method, so you can express the
   above like so: ::

        db.eval( function { return 3+3 } } );

   Note the shell's Java Script interpreter evaluates functions
   entered directly into the shell. If you want to use the server's
   interpreter, you must run ``eval``.

   Note the following behaviors and limitations:

   - ``eval`` does not work in :term:`sharded <sharding>`
     environments.

   - The ``eval`` operation take a write lock by default. This means
     that writes to database aren't permitted while it's running. You
     can, however, disable the lock by setting the ``nolock`` flag to
     ``true``. For example: ::

           { eval: function() { return 3+3 }, nolock: true }

TODO: add some warnings / advice about when to disable the write lock.

.. dbcommand:: dataSize

   The ``dataSize`` command returns the size data size for a set of
   data within a certian range: ::

        { dataSize: "database.collection", keyPattern: { field: 1 }, min: { field: 10 }, max: { field: 100 } }

   This will return a document that contains the size of all matching
   documents. Replace "``database.collection``" value with database
   and collection from your deployment. The ``keyPattern``, ``min``,
   and ``max`` parameters are options.

   The amount of time required to return ``dataSize`` depends on the
   amount of data in the collection.

TODO: not sure that this command should be in the docs. It's mostly for internal use, I believe.

Replication
~~~~~~~~~~~

.. seealso:: ":doc:`/core/replication`" for more information regarding
   replication.

.. dbcommand:: resync

   The ``resync`` command forces an out-of-date slave
   :option:`mongod` instance to re-synchronize itself. Note
   that this command is relevent to master-slave replication only. It does
   no apply to replica sets.

   .. write-lock, slave-ok, admin-only.

.. dbcommand:: replSetFreeze

   The ``replSetFreeze`` command prevents a replica set member from
   being elected for the specified number of seconds. This command is
   used in conjunction with the ``replSetStepDown`` command to make
   a different node in the replica set a primary.

   The ``replSetFreeze`` command uses the following syntax: ::

        { replSetFreeze: <seconds> }

   If you want to unfreeze a replica set member before the specified number
   of seconds has elapsed, you can issue the command with a seconds value of ``0``: ::

        { replSetFreeze: 0 }

   Restarting the :option:`mongod` process also unfreezes a replica
   set member.

   ``replSetFreeze`` is an administrative command that must be issued
   against the ``admin`` database.

   .. slave-ok, admin-only

.. dbcommand:: replSetGetStatus

   The ``replSetGetStatus`` command returns the status of the replica
   set from the point of view of the current server. The command must be
   run against the admin database and has the following format: ::

        { replSetGetStatus: 1 }

   However, you can also run this command from the shell like so: ::

        rs.status()

   .. slave-ok, admin-only

   .. seealso:: ":doc:`/reference/replica-status`"

.. dbcommand:: replSetInitiate

   The ``replSetInititate`` command initializes a new replica set. Use the
   following syntax: ::

         { replSetInitiate : <config_document> }

   The "``<config_document>``" is a :term:`JSON document` that specifies
   the replica set's configuration. For instance, here's a config document
   for creating a simple 3-member replica set: ::

          {
              _id : <setname>,
               members : [
                   {_id : 0, host : <host0>},
                   {_id : 1, host : <host1>},
                   {_id : 2, host : <host2>},
               ]
          }

   A typical way of running this command is to assign the config document to
   a variable and then to pass the document to the ``rs.initiate()`` helper: ::

        config = {
            _id : "my_replica_set",
             members : [
                 {_id : 0, host : "rs1.example.net:27017"},
                 {_id : 1, host : "rs2.example.net:27017"},
                 {_id : 2, host : "rs3.example.net", arbiterOnly: true},
             ]
        }

        rs.initiate(config)

    Notice that omitting the port cause the host to use the default port
    of 27017. Notice also that you can specify other options in the config
    documents such as the ``arbiterOnly`` setting in this example.

   .. slave-ok, admin-only

TODO: see also -- replica set config options.

.. dbcommand:: replSetReconfig

   The ``replSetReconfig`` command modifies the configuration of an existing
   replica set. You can use this command to add and remove members, and to
   alter the options set on existing members. Use the following syntax: ::

        { replSetReconfig: <new_config_document>, force: false }

   You may also run the command using the shell's ``rs.reconfig()`` method.

   Be aware of the following ``replSetReconfig`` behaviors:

   - You must issue this command against the admin database of the current
     primary member of the replica set.

   - You can optionally force the command to run on a non-primary member
     by specifying ``{force: true}``.

   - A majority of the set's members must be operational for the
     changes to propagate properly.

   - This command can cause downtime as the set renegotiates
     primary-status. Typically this is 10-20 seconds, but could
     be as long as a minute or more. Therefore, you should attempt
     to reconfigure only during scheduled maintenance periods.

   - In some cases, ``replSetReconfig`` forces the current primary to
     step down, initiating an election for primary among the members of
     the replica set. When this happens, the set will drop all current
     connections.

   .. slave-ok, admin-only

.. dbcommand:: replSetStepDown

   The ``replSetStepDown`` command forces a replica set primary
   to relinquish its status as primary. A primary election will then
   be initiated. You may specify a number of seconds for the node
   to reject a primary status to ensure that it will not be reelected
   during the election: ::

        { replSetStepDown: <seconds> }

   If you do not specify a value for ``<seconds>``, ``replSetStepDown`` will attempt to avoid reelection
   to primary for 60 seconds.

   .. warning:: This will force all clients currently connected to the
      database to disconnect. This help to ensure that clients maintain
      an accurate view of the replica set.

   .. slave-ok, admin-only

Geospatial Commands
~~~~~~~~~~~~~~~~~~~

.. dbcommand:: geoNear

   The ``geoNear`` command provides an alternative to the
   :dbcommand:`$near` operator. In addition to the
   functionality of ``$near``, ``geoNear`` returns the distance of
   each item from the specified point along with additional diagnostic
   information. For example: ::

         { geoNear : "places" , near : [50,50], num : 10 }

   Here, ``geoNear`` returns the 10 items nearest to the coordinates
   ``[50,50]``. ``geoNear`` provides the following options (all
   distances are specified in the same units as the document
   coordinate system:)

   - The `near`` option takes the coordinates (e.g. ``[ x,
     y ]``) to use as the center of a geospatial query.
   - The ``num`` option specifies the maximum number of documents to return.
   - The ``maxDistance`` option limits the results to those falling within
     a given distance of the center coordinate.
   - The ``query`` option further narrows the results
     using any standard MongoDB query selector.
   - The ``distanceMultiplier`` option is undocumented.

TODO distanceMultiplier research/definition

   .. read-lock, slave-ok

.. dbcommand:: geoSearch

   The ``geoSearch`` command provides an interface to MongoDB's
   :term:`haystack index` functionality. These indexes are useful for
   returning results based on location coordinates *after*
   collecting results based on some other query (i.e. a "haystack.")
   Consider the following example: ::

        { geoSearch : "foo", near : [33, 33], maxDistance : 6, search : { type : "restaurant" }, limit : 30 }

   The above command returns all documents with a ``type`` of
   ``restaurant`` having a maximum distance of 6
   units from the coordinates "``[30,33]``" up to a maximum of 30
   results.

   Unless specified otherwise, the ``geoSearch`` command limits results to 50
   documents.

   .. read-lock, slave-ok

Collections
~~~~~~~~~~~

.. dbcommand:: drop

   The ``drop`` command removes an entire collection from a
   database. The command has following syntax: ::

        { drop: <collection_name> }

   The ``mongo`` shell provides the equivalent helper
   method: ::

        db.collection.drop();

   Note that this command also removes any indexes associated with the
   dropped collection.

.. dbcommand:: cloneCollection

   The ``cloneCollection`` command copies a collection from a remote
   server to the server on which the command is run. Consider the following example:  ::

        { cloneCollection: "app.users", from: "db.example.net:27017",
             query: { active: true } }

   Here we copy the "users" collection from the "app" database on the server at ``db.example.net``.
   Only documents that satisfy the query "``{ active: true }`` are copied. Indexes are
   copied by default, but you can disable this by setting ``{copyIndexes: false}``.o
   The ``query`` and ``copyIndexes`` arguments are optional.

   ``cloneCollection`` creates a collection on the current database
   with the same name as the origin collection. If, in the above
   example, the ``users`` collection already exists, then the documents
   in the remote collection will be appended to the destination collection.

.. dbcommand:: create

   The ``create`` command explicitly creates a collection. The command
   uses the following syntax: ::

        { create: <collection_name> }

   To create a capped collection limited to 40 KB, issue command in the following form: ::

        { create: "collection", capped: true, size: 40 * 1024 }

   The options for creating capped collections are:

   - **capped**: Specify "``true``" to create a :term:`capped collection`.
   - **size**: The maximum size for the capped collection. Once a capped collection
     reaches its max size, old documents will be aged out to make way for the new.
     The ``size`` argument is requied.
   - **max**: The maximum number of documents to preserve in the capped collection.
     Note that this limit is subject to the overall size of the capped collection. If
     a capped collection reaches its max size before it contains the maximum number of
     documents, old document will still be removed. Thus, if you use this option, ensure
     that the total size for the capped collection is sufficient to contain the max.

   The :js:func:`db.createCollection` provides a wrapper function that
   provides access to this functionality.

.. dbcommand:: convertToCapped

   The ``convertToCapped`` command converts an existing, non-capped
   collection to a :term:`capped collection`. Use the following
   syntax: ::

        {convertToCapped: "collection", size: 100 * 1024 }

   Here, ``collection`` (an existing collection) is converted to a
   capped collection, with a maximum size of 100 KB. This command supports
   the ``size`` and ``max`` arguments. See the ``create`` command for details.

.. dbcommand:: emptycapped

   The ``emptycapped`` command removes all documents from a capped
   collection. Use the following syntax: ::

        { emptycapped: "events" }

   This command removes all records from the capped collection named
   ``events``.

.. dbcommand:: renameCollection

   The ``renameCollection`` command changes the name of an existing
   collection. Use the following form to rename the collection
   named "things" to "events": ::

        { renameCollection: "store.things", to: "store.events" }

   This command must be run on the admin database, and thus requires
   you to specify the complete namespace (i.e., database name and collection name).

   The shell helper "``renameCollection()``" simplifies this. The following
   is equivalent to the foregoing example:

        db.things.renameCollection( "events" )

.. dbcommand:: collStats

   The ``collStats`` command returns a variety of storage statistics
   for a given collection. Use the following syntax: ::

        { collStats: "database.collection" , scale : 1024 }

   Specify a namespace "``database.collection``" and
   use the ``scale`` argument to scale the output. The above example
   will display values in kilobytes.

   Examine the following example output, which uses the shell's equivalent helper method: ::

        > db.users.stats()
        {
                "ns" : "app.users",             // namespace
                "count" : 9,                    // number of documents
                "size" : 432,                   // collection size in bytes
                "avgObjSize" : 48,              // average object size in bytes
                "storageSize" : 3840,           // (pre)allocated space for the collection
                "numExtents" : 1,               // number of extents (contiguously allocated chunks of datafile space)
                "nindexes" : 2,                 // number of indexes
                "lastExtentSize" : 3840,        // size of the most recently created extent
                "paddingFactor" : 1,            // padding can speed up updates if documents grow
                "flags" : 1,
                "totalIndexSize" : 16384,       // total index size in bytes
                "indexSizes" : {                // size of specific indexes in bytes
                        "_id_" : 8192,
                        "username" : 8192
                },
                "ok" : 1
        }

.. dbcommand:: compact

   The ``compact`` command rewrites and defragments a single
   collection. Additionally, the command forces all indexes on the collection
   to be rebuilt. The command has the following syntax: ::

        { compact: "users" }

   In this example, the collection named "users" will be compacted.

   Note the following command behaviors:

   - During a ``compact``, the database blocks all other activity.

   - In a :term:`replica set`, ``compact`` will refuse to run on the
     primary node unless you also specify ``{force: true}``.
     For example: ::

           { compact: "collection", force: true }

   - If you have journaling enabled, your data will be safe even
     if you kill the operation or restart the server before it has
     finished. However, you may have to manually rebuild the indexes.
     Without journaling enabled, the ``compact`` command is much less safe,
     and there are no guarantees made about the safety of your data in the
     event of a shutdown or a kill.

     .. warning::

        Always have an up-to-date backup before performing server
        maintenance such as the ``compact`` operation.

   - ``compact`` requires a small amount of additional diskspace while
     running but unlike :dbcommand:`repairDatabase` it does *not* free
     space equal to the total size of the collection.

   - the ``compact`` command blocks until the operation is
     complete.

   - ``compact`` removes any :term:`padding factor` in the collection,
     which may impact performance if documents grow regularly.

   - ``compact`` commands do not replicate. They must be run on slaves
     and replica set members independently.

   - :term:`Capped collections <capped collection>` cannot be
     compacted.

Administration
~~~~~~~~~~~~~~

.. dbcommand:: fsync

   ``fsync`` is an administrative command that forces the
   :option:`mongod` process to flush all pending writes to the data
   files. The server already runs its own fsync every 60 seconds, so
   running ``fsync`` in the course of normal operations is
   not required. The primary use of this command is to flush and
   lock the database for backups.

   The ``fsync`` operation blocks all other write operations for a
   while it runs. To toggle a write-lock using ``fsync``, add a lock
   argument, as follows: ::

       { fsync: 1, lock: true }

   This will sync the data files and lock the database against writes. Later,
   you must run the following query to unlock the database: ::

       db.getSiblingDB("admin").$cmd.sys.unlock.findOne();

   In the shell, you may use the following helpers to simplify
   the process: ::

        db.fsyncLock();
        db.fsyncUnlock();

   .. versionadded:: 1.9.0
      The ``db.fsyncLock()`` and ``db.fsyncUnlock`` helpers in the
      shell.

.. dbcommand:: dropDatabase

   The ``dropDatabase`` command drops a database, deleting
   the associated data files. ``dropDatabase`` operates on the
   current database.

   In the shell issue the ``use <database>``
   command, replacing "``<database>``" with the name of the database
   you wish to delete. Then use the following command form: ::

        { dropDatabase: 1 }

   The ``mongo`` shell also provides the following equivalent helper method: ::

        db.dropDatabase();

   .. write-lock

.. dbcommand:: dropIndexes

   The ``dropIndexes`` command drops one or all indexes from the current collection.
   To drop all indexes, issue the command like so: ::

        { dropIndexes: "collection", index: "*" }

   To drop a single, issue the command by specifying the name
   of the index you want to drop. For example, to drop the index
   named "age_1", use the following command: ::

        { dropIndexes: "collection", index: "age_1" }

   The shell provides a useful command helper. Here's the equivalent command: ::

        db.collection.dropIndex("age_1");

.. dbcommand:: clone

   The ``clone`` command clone a database from a
   remote MongoDB instance to the current host. ``clone`` copies the
   database on the remote instance with the same name as the current
   database. The command takes the following form: ::

        { clone: "db1.example.net:27017" }

   Replace ``db1.example.net:27017`` above with the resolvable hostname for the
   MongoDB instance you wish to copy from. Note the following
   behaviors:

   - ``clone`` can run against a :term:`slave` or a
     non-:term:`primary` member of a :term:`replica set`.
   - ``clone`` does not snapshot the database. If the copied database
     is updated at any point during the clone operation, the resulting
     database may be inconsistent.
   - You must run ``clone`` on the **destination server**.
   - The destination server is not locked for the duration of the
     ``clone`` operation. This means that ``clone`` will occasionally yield to
     allow other operations to complete.

   See :dbcommand:`copydb`  for similar functionality.

.. dbcommand:: repairDatabase

   The ``repairDatabase`` command checks and repairs errors and
   inconsistencies with the data storage. The command is analogous to
   a ``fsck`` command for file systems.

   If your :option:`mongod` instance is not running with journaling and you experience an
   unexpected system restart or crash, you should run the
   ``repairDatabase`` command to ensure that there are no errors in
   the data storage.

   As a side effect, the ``repairDatabase`` command will
   compact the database, providing functionality equivalent to the
   :dbcommand:`compact` command. Use the following syntax.

        { repairDatabase: 1 }

   Be aware that this command can take a long time to run if your
   database is large. In addition, it requires a quantity of free disk
   space equal to the size of your database. If you lack sufficient
   free space on the same volume, you can mount a separate volume
   and use that for the repair. In this case, you must run the
   command line and use the ``--repairpath`` switch to specify
   the folder in which to store the temporary repair files.

   This command is accessible via a number of different avenues. You
   may:

   - Use the shell to run the above command, as above.

   - Run :option:`mongod` directly from your system's shell. Make sure
     that :option:`mongod` isn't already running, and that you issue
     this command as a user that has access to MongoDB's data
     files. Run as: ::

           $ mongod --repair

     To add a repair path:

           $ mongod --repair --repairpath /opt/vol2/data

     .. note::

        This command will fail if your database is not a master or
        primary. If you need to repair a secondary or slave node, first
        restart the node as a standalone mongod by omitting the
        ``--replSet`` or ``--slave`` switch, as necessary.

   - You may use the following shell helper: ::

           db.repairDatabase();

   .. note::

      When :term:`journaling` is enabled, there is almost never any need to run
      ``repairDatabase``. In the event of an unclean shutdown, the server
      will be able restore the data files to a pristine state automatically.

.. dbcommand:: shutdown

   The ``shutdown`` command cleans up all database resources and then terminates
   the process. The command has the following form: ::

        { shutdown: 1 }

   .. note::

      The ``shutdown`` command must be run against the admin
      database. Additionally, the command must either be issued
      from localhost or the connection must be
      authenticated.

   If the node you're trying to shut down is a :doc:`replica set </core/replication>`
   primary, then the command will succeed only if there exists a secondary node
   whose oplog data is within 10 seconds of the primary. You can override this protection
   using the ``force`` option: ::

        { shutdown: 1, force: true }

   Alternatively, the ``shutdown`` command also supports a ``timeoutSecs`` argument
   which allows you to specify a number of seconds to wait for other
   members of the replica set to catch up: ::

        { shutdown: 1, timeoutSecs: 60 }

   The equivalent ``mongo`` shell helper syntax looks like this: ::

        db.shutdownServer({timeoutSecs: 60});

.. dbcommand:: copydb

   The ``copydb`` command copies a database from a remote host to the
   current host. The command has the following syntax: ::

        { copydb: 1:
          fromhost: <hostname>,
          fromdb: <db>,
          todb: <db>,
          slaveOk: <bool>,
          username: <username>,
          password: <password>,
          nonce: <nonce>,
          key: <key> }

   All of the following arguments are optional:

   - slaveOK
   - username
   - password
   - nonce
   - key

   Be aware of the following behaviors:

   - ``copydb`` can run against a :term:`slave` or a
     non-:term:`primary` member of a :term:`replica set`. In this case,
     you must set the ``slaveOk`` option to ``true``.

   - ``copydb`` does not snapshot the database. If the copied database is
     updated at any point during the operation, the resulting
     database may be inconsistent.

   - You must run ``copydb`` on the **destination server**.

   - The destination server is not locked for the duration of the
     ``clone`` operation. This means that ``clone`` will occasionally yield to
     allow other operations to complete.

   - If the remote server has authentication enabled, then you must
     include a username and password. You must also include a nonce
     and a key. The nonce is a one-time password that you request from
     the remote server using the ``copydbgetnonce`` command. The ``key`` is
     a hash generated as follows: ::

         hex_md5(nonce + username + hex_md5(username + ":mongo:" + pass))

     If you need to copy a database and authenticate, it's easiest to use the
     shell helper: ::

         db.copyDatabase(<remove_db_name>, <local_db_name>, <from_host_name>, <username>, <password>)

.. dbcommand:: logout

   The ``logout`` command terminates the current authenticated session: ::

        { logout: 1 }

   .. note::

      If you're not logged in and using authentication, this command will
      have no effect.

.. dbcommand:: logRotate

   ``logRotate`` is an admin only command that allows you to rotate
   the MongoDB logs to prevent a single logfile from consuming too
   much disk space. Use the following syntax: ::

        { logRotate: 1 }

   .. note::

      Your :option:`mongod` instance needs to be running with the
      ``--logpath <file>`` option.

   You may also rotate the logs by sending a ``SIGUSR1`` signal to the :option:`mongod` process.
   If your ``mongod`` has a process ID of 2200, here's how to send the signal on Linux: ::

       $ kill -SIGUSR1 2200

   The rotated files will have a timestamp appended to the filename.

   .. note::

     The ``logRotate`` command is not available to mongod instances
     running on windows systems.

.. dbcommand:: setParameter

   ``setParameter`` is an administrative command for modifying
   options normally set on the command line. The
   ``setParameter`` command must be issued against the ``admin``
   database, and it has form: ::

        { setParameter: 1, <option>: <value> }

   Replace the ``<option>`` with one of the following options
   supported by this command:

   - **journalCommitInterval**: an integer between 1 and 500
     specifying the number of milliseconds (ms) between journal
     commits.

   - **logLevel**: an integer between ``0``
     and ``5`` signifying the verbosity of the logging, where larger
     is more verbose.

   - **notablescan**: If "``true``", queries not using an index
     will fail.

   - **quiet**: If "``true``" or "``false``", quiet logging mode will
     be enabled. This will suppress logging of the following messages:

     - Connection events: accepted and closed.
     - Commands: :dbcommand:`drop`, :dbcommand:`dropIndex`, and
       :dbcommand:`daglogging`, :dbcommand:`validate`, :command;`clean`.
     - Replication synchronization activity.

   - **syncdelay**: the interval, in seconds, between fsyncs (i.e., flushes of memory to disk).
     By default, :option:`mongod` will flush memory to disk every 60
     seconds. It isn't necessary to change this value unless you see a background flush
     average greater than 60 seconds.

   .. slave-ok, admin-only

.. dbcommand:: getParameter

   ``getParemeter`` is an administrative command for retrieving the
   value of options normally set on the command line. Issue
   commands against the ``admin`` database as follows: ::

        { getParameter: 1, <option>: 1 }

   The values specified for ``getParameter`` and ``<option>`` do not
   affect the output. The command works with the following options:

   - **quiet**
   - **notablescan**
   - **logLevel**
   - **syncdelay**

   See :dbcommand:`setParameter` for more about ese parameters.

   .. slave-ok, admin-only

Diagnostics
~~~~~~~~~~~

.. dbcommand:: dbStats

   The ``dbStats`` command returns storage statistics for a given database.
   The command takes the following syntax:

        { dbStats: 1, scale: 1 }

   The value of the argument (e.g. ``1`` above) to ``dbStats`` does
   not affect the output of the command. The "``scale``" option
   allows you to specify how the values of bytes are
   scaled. For example, a "``scale``" value of "``1024``" will
   display the results in kilobytes rather than in bytes.

   The time required to run the command depends on the total size of the database.
   Because the command has to touch all data files, the command may take several
   seconds to run.

   In the ``mongo`` shell, the :js:func:`db.stats()` function provides
   a wrapper around this functionality. See the
   ":doc:`/reference/database-statistics`" document for an overview of
   this output.

.. dbcommand:: connPoolStats

   The command ``connPoolStats`` returns information regarding the
   number of open connections to the current database instance,
   including client connections and server-to-server connections for
   replication and clustering. The command takes the following form:
   ::

        { connPoolStats: 1 }

   The value of the argument (e.g. ``1`` above) does not affect the
   output of the command.

.. dbcommand:: getCmdLineOpts

   The ``getCmdLineOpts`` command returns a document containing
   command line options used to start the given ``mongod``: ::

        { getCmdLineOpts: 1 }

   This command returns a document with two fields, "``argv``" and
   "``parsed``". The "``argv``" field contains an array with each item
   from the command string used to invoke :option:`mongod`. The document
   in the "``parsed``" field includes all runtime options, including
   those parsed from the command line and those specified in the
   configuration file (if specified.)

.. dbcommand:: validate

   The ``validate`` command checks the contents of a namespace by
   scanning a collection's data and indexes for correctness. The command
   can be slow, particularly on larger data sets: ::

        { validate: "users" }

   This command will validate the contents of the collection named
   "``users``". You may also specify one of the following
   options:

   - "``full: true``" provides a more thorough scan of the data.

   - "``scandata: false``" skips the scan of the base collection
     without skipping the scan of the index.

   The ``mongo`` shell also provides a wrapper: ::
   .. code-block:: javascript

        db.collection.validate();

   Use one of the following forms to perform the full collection
   validation:

   .. code-block:: javascript

      db.collection.validate(true)
      db.runCommand( { validate: "collection", full: true } )

   .. warning:: This command is resource intensive and may have an
      impact on the performance of your MongoDB instance.

.. dbcommand:: top

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
   - commands

   The command takes the following form: ::

        { top: 1 }

.. dbcommand:: buildInfo

   The ``buildInfo`` command returns a build summary for the current
   ``mongod``: ::

         { buildInfo: 1 }

    The information provided includes the following:

   - The version of MongoDB currently running.
   - The information about the system that built the
     ":option:`mongod`" binary, including a timestamp for the build.
   - The architecture of the binary (i.e. 64 or 32 bits)
   - The maximum allowable :term:`BSON` object size in bytes (in the field
     "``maxBsonObjectSize``".)

   ``buildInfo`` must be issued against the ``admin`` database.

.. dbcommand:: getLastError

   The ``getLastError`` command returns the error status of the last
   operation on the *current connection*: ::

        { getLastError: 1 }

   The following options are available:

   - **j**: If ``true``, wait for the next journal commit before
     returning. Applies only if journaling is enabled.
   - **w**: When running with replication, this is the number of servers to
     replica to before returning. A ``w`` value of 1 indicates the primary only.
     A ``w`` value of 2 includes the primary and at least one secondary, etc.
     In place of a number, you may also set ``w`` to "``majority``" to indicate
     that the command should wait until the latest write is reflected on a majority
     of replica set members. If using ``w``, you should also use ``wtimeout``. Specifying
     a value for ``w`` without also providing a ``wtimeout`` may cause  ``getlasterror`` to block
     indefinitely.
   - **wtimeout**: If a ``w`` value is provided, this is the number of milliseconds
     to wait for replication to the specified number of servers. If replication does not complete
     in the given timeframe, the ``getlasterror`` command will return with an error status.
   .. seealso:: ":ref:`Replica Set Write Propagation <replica-set-write-propagation>`"
      and ":js:func:`db.getLastError()`."

TODO: standardize on the way options are presented. Here, the standard is "``fsync``" but elsewhere
we see **fsync**.

.. dbcommand:: getLog

   The ``getLog`` command returns a document with a ``log`` array that
   contains recent messages from the :option:`mongod` process's
   log. Use the following syntax: ::

        { getLog: <log> }

   Replace "``<log>``" with one of the following values:

   - ``"startupWarnings"`` - to generate logs that *may* contain
     errors or warnings from MongoDB's log from the when the current
     process started.

   - ``"global"`` - to generate the most recent log events from the
     database. This is equivalent to running the "``tail``" command on
     the :option:`mongod` log in the system shell.

.. dbcommand:: listDatabases

   The ``listDatabases`` command provides a list of existing
   databases along with basic statistics about them: ::

        { listDatabases: 1 }

   The value (e.g. ``1``) does not effect the output of the
   command. ``listDatabases`` returns a document for each database
   Each document contains a "``name``" field
   with the database name, a "``sizeOnDisk``" field with the total
   size of the database file on disk in bytes, and an "``empty``"
   field specifying whether the database has any data.

.. dbcommand:: cursorInfo

   The ``cursorInfo`` command returns information about current cursor
   allotment and use. Use the following form: ::

        { cursorInfo: 1 }

   The value (e.g. ``1`` above,) does not effect the output of the
   command.

   ``cursorInfo`` returns the total number of
   open cursors ("``totalOpen``",) the size of client cursors in
   current use ("``clientCursors_size``",) and the number of timed out
   cursors since the last server restart ("``timedOut``".)

.. dbcommand:: isMaster

   The ``isMaster`` command provides a basic overview of the current
   replication configuration. This command is used by the MongoDB :term:`drivers
   <driver>` and :term:`clients <client>` to determine what kind of node
   they're connected to and to discover additional members of a :term:`replica set`.

   The command takes the following form: ::

        { isMaster: 1 }

   This command returns a JSON document containing the
   following fields:

   .. js:data:: isMaster.setname

      The name of the current replica set, if applicable.

   .. js:data:: isMaster.ismaster

      Whether this node can be written to. If "``true``", then
      the current node is either a :term:`primary` node in a
      :term:`replica set`, a `master` node in a master-slave configuration,
      of a standalone `mongod`.

   .. js:data:: isMaster.secondary

      A boolean value that, when "``true``", indicates that the
      current node is a :term:`replica set` :term:`secondary`.

   .. js:data:: isMaster.hosts

      An array of strings in the format of "[hostname]:[port]"
      listing all nodes in the
      :term:`replica set` that are not ":term:`hidden <hidden
      node>`".

   .. js:data:: isMaster.primary

      The "``[hostname]:[port]``" for the current
      :term:`replica set` :term:`primary`, if applicable.

   .. js:data:: isMaster.me

      The "``[hostname]:[port]``" of the node node responding to this command.

   .. js:data:: isMaster.maxBsonObjectSize

      The maximum permitted size of a :term:`BSON` object in bytes for this ``mongod`` process.
      If not provided, clients should assume a max size of 4 * 1024 * 1024.

.. dbcommand:: ping

   The ``ping`` command is a no-op used to test whether a server is
   responding to commands. This command will return immediately even if the server
   is write-locked: ::

        { ping: 1 }

   The value (e.g. ``1`` above,) does not impact the behavior of the
   command.

.. dbcommand:: journalLatencyTest

   ``journalLatencyTest`` is an admin command that tests the length of
   time required to write and perform a file system sync (e.g. fsync)
   for a file in the journal directory. The command syntax is: ::

         { journalLatencyTest: 1 }

   The value (i.e. ``1`` above), does not affect the operation of the
   command.

.. dbcommand:: serverStatus

   The ``serverStatus`` command returns a document that provides an
   overview of the database process's state. Most monitoring applications
   run this command at a regular interval to collection statistics about the
   instance: ::

        { serverStatus: 1 }

   The value (i.e. ``1`` above), does not affect the operation of the
   command.

   .. seealso:: :js:func:`db.serverStatus()` and ":doc:`/reference/server-status`"

.. dbcommand:: resetError

   The ``resetError`` command resets the last error status.

   .. seealso:: :js:func:`db.resetError()`

.. dbcommand:: getPrevError

   The ``getPrevError`` command returns the errors since the last
   :dbcommand:`resetError` command.

   .. seealso:: :js:func:`db.getPrevError()`

.. dbcommand:: forceerror

   The ``forceerror`` command is for testing purposes only. Use
   ``forceerror`` to force a user assertion exception. This
   command will always return with an ``ok`` value of 0.

.. dbcommand:: profile

   Use the ``profile`` command to enable, disable, or change the
   query profiling level. Use the following syntax: ::

        { profile: <level> }

   The following profiling levels are available:

   - ``0`` - off; no profiling.
   - ``1`` - on; log slow (> 100ms) operations only.
   - ``2`` - on; log all operations.
   - ``-1`` - return the current profiling level.

   You may optionally set a threshhold in milliseconds for profiling using
   the ``slowms`` option. To : ::

       { profile: 1, slowms: 200 }

   .. seealso:: Additional documentation regarding database profiling
                :ref:`Database Profiling <database-profiling>`.

   .. seealso:: ":js:func:`db.getProfilingStatus()`" and
                ":js:func:`db.setProfilingLevel()`" provide wrappers
                around this functionality in the :option:`mongo`
                shell.

.. dbcommand:: listCommands

   The ``listCommands`` command generates a list of all database
   commands implemented for the current :option:`mongod` instance.

   .. slave-ok

Other Commands
~~~~~~~~~~~~~~

.. dbcommand:: reIndex

   The ``reIndex`` command rebuilds all indexes for a
   specified collection. Use the following syntax: ::

        { reIndex: "collection" }

   Normally, indexes are compacted as they're updated. For most users,
   the ``reIndex`` is unnecessary. However, it may be worth running if the
   collection size has changed significantly or if the indexes are consuming
   a disproportionate amount of disk space.

   Note that the ``reIndex`` command will block the server against
   writes and may take a long time for large collections.

   call ``reIndex`` using the following form: ::

        db.collection.reIndex();

.. dbcommand:: filemd5

   The ``filemd5`` command returns the :term:`md5` hashes for a single
   files stored using the :term:`GridFS` specification. Client libraries
   use this command to verify that files are correctly written to MongoDB.
   The command takes the ``files_id`` of the file in question and the
   name of the GridFS root collection being used. For example: ::

        { filemd5: ObjectId("4f1f10e37671b50e4ecd2776"), root: "fs" }

:option:`mongos` commands
-------------------------

TODO document mongos commands DOCS-112

Internal Use
------------

.. dbcommand:: setShardVersion

   ``setShardVersion`` is an internal command that supports sharding
   functionality.

   .. admin-only

.. dbcommand:: getShardVersion

   ``getShardVersion`` is an internal command that supports sharding
   functionality.

   .. admin-only

.. dbcommand:: unsetSharding

   ``unsetSharding`` is an internal command that supports sharding
   functionality.

   .. slave-ok, admin-only

.. dbcommand:: whatsmyuri

   ``whatsmyuri`` is an internal command.

   .. slave-ok

.. dbcommand:: features

   ``features`` is an internal command that returns the build-level
   feature settings.

   .. slave-ok

.. dbcommand:: driverOIDTest

   ``driverOIDTest`` is an internal command.

   .. slave-ok

.. dbcommand:: diagLogging

   ``diagLogging`` is an internal command.

   .. write-lock, slave-ok,

.. dbcommand:: copydbgetnonce

   ``copydbgetnonce`` is used by client libraries to get a one-time password
   for use with the ``copydb`` command.

   .. write-lock, admin-only

.. dbcommand:: dbHash

   ``dbHash`` is an internal command.

   .. slave-ok, read-lock

.. dbcommand:: medianKey

   ``medianKey`` is an internal command.

   .. slave-ok, read-lock

.. dbcommand:: geoWalk

   ``geoWalk`` is an internal command.

   .. read-lock, slave-ok

.. dbcommand:: sleep

   ``sleep` an internal command for testing purposes. The ``sleep``
   command forces the db block all operations. It takes the following
   options: ::

        { sleep: { w: true, secs: <seconds> } }

   The above command places the :option:`mongod` instance in a
   "write-lock" state for a specified (i.e. ``<seconds>``) number of
   seconds. Without arguments, ``sleep``, causes a "read lock" for 100
   seconds.

.. dbcommand:: getnonce

   ``getnonce`` is used by client libraries to generate a one-time
   password for authentication.

   .. slave-ok

.. dbcommand:: getoptime

   ``getoptime`` is an internal command.

   .. slave-ok

.. dbcommand:: godinsert

   ``godinsert`` is an internal command for testing purposes only.

   .. write-lock, slave-ok

.. dbcommand:: clean

   ``clean`` is an internal command.

   .. write-lock, slave-ok

.. dbcommand:: applyOps

   ``applyOps`` is an internal command that supports sharding
   functionality.

   .. write-lock

.. dbcommand:: replSetElect

   ``replSetElect`` is an internal command that support replica set
   functionality.

   .. slave-ok, admin-only

.. dbcommand:: replSetGetRBID

   ``replSetGetRBID`` is an internal command that support replica set
   functionality.

   .. slave-ok, admin-only

.. dbcommand:: replSetHeartbeat

   ``replSetheThis`` is an internal command that support replica set functionality.

   .. slave-ok

.. dbcommand:: replSetFresh

   ``replSetFresh`` is an internal command that support replica set
   functionality.

   .. slave-ok, admin-only

.. dbcommand:: writeBacksQueued

   ``writeBacksQueued`` is an internal command that returns true if
   there are operations in the write back queue for the given ``mongos``.
   This command applies to sharded clusters only.

   .. slave-ok, admin-only

TODO factcheck (minor)

.. dbcommand:: connPoolSync

   ``connPoolSync`` is an internal command.

   .. slave-ok

.. dbcommand:: checkShardingIndex

   ``checkShardingIndex`` is an internal command that supports the
   sharding functionality.

   .. read-lock

.. dbcommand:: getShardMap

   ``getShardMap`` is an internal command that supports the sharding
   functionality.

   .. slave-ok, admin-only

.. dbcommand:: splitChunk

   ``splitChunk`` is an internal command. Use the
   :js:func:`sh.splitFind()` and :js:func:`splitAt()` functions in the
   :option:`mongo` shell to access this functionality.

   .. admin-only.

.. dbcommand:: writebacklisten

   ``writebacklisten`` is an internal command.

   .. slave-ok, admin-only

.. dbcommand:: replSetTest

   ``replSetTest`` is internal diagnostic command used for regression
   tests that supports replica set functionality.

   .. slave-ok, admin-only

.. dbcommand:: moveChunk

   ``moveChunk`` is an internal command that supports the sharding
   functionalty and should not be called directly. Use the
   :js:func:`sh.moveChunk()` function in the :option:`mongo` shell
   if you must move a chunk manually.

   .. admin-only

.. dbcommand:: authenticate

   ``authenticate`` is used by client to authenticate on a connection. When
   using the shell, you should use the command helper like so: ::

       db.authenticate( "username", "password" )

   .. read-lock, slave-ok

.. dbcommand:: handshake

   ``handshake`` is an internal command.

   .. slave-ok

.. dbcommand:: _isSelf

   ``_isSelf`` is an internal command.

   .. slave-ok

.. dbcommand:: _migrateClone

   ``_migrateClone`` is an internal command and should not be called
   directly.

   .. admin-only

.. dbcommand:: _recvChunkAbort

   ``_recvChunkAbort`` is an internal command and should not be called
   directly.

   .. admin-only

.. dbcommand:: _recvChunkCommit

   ``_recvChunkCommit`` is an internal command and should not be
   called directly.

   .. admin-only

.. dbcommand:: _recvChunkStatus

   ``_recvChunkStatus`` is an internal command and should not be
   called directly.

   .. admin-only

.. dbcommand:: _skewClockCommand

   ``skewClockCommand`` is an internal command and should not be
   called directly.

   .. admin-only

.. dbcommand:: _testDistLockWithSkew

   ``_testDistLockWithSkew`` is an internal command and should not be
   called directly.

   .. admin-only

.. dbcommand:: _testDistLockWithSyncCluster

   ``_testDistLockWithSyncCluster`` is an internal command and should
   not be called directly.

   .. admin-only

.. dbcommand:: _transferMods

   ``_transferMods`` is an internal command and should not be called
   directly.

   .. admin-only

.. dbcommand:: _recvChunkStart

   ``_recvChunkStart`` is an internal command and should not be called
   directly.

   .. admin-only, write-lock
