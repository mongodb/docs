==========================
 MongoDB Command Reference
==========================

.. default-domain: mongodb
.. highlight_language: javascript
.. highlight:: javascript

This document contains a reference to all :term:`database
commands`. All commands take the form of a :term:`JSON` documents
issued as a query against a special MongoDB collection named
:term:`$cmd`, however the JavaScript shell (i.e. ``mongo``,) provides
the following syntax to facilitate running commands: ::

      db.runCommand( { <commandname>: <value> [, options] } );

Similarly, you can run administrative commands using the following
syntax: ::

      db._adminCommand( { <commandname>: <value> [, options] } );

The ``_adminCommand`` helper is shorthand for "``
db.getSisterDB("admin").runCommand();``".

Your MongoDB driver may provide an alternate interface for issuing
database commands. All examples in this reference are provided as JSON
documents.

TODO factcheck introduction.

User Commands
-------------

Sharding
~~~~~~~~

TODO get background on 3 sharding commands

.. describe:: setShardVersion

   The ``setShardVersion`` command takes the following syntax. ::

        { setShardVersion: 'alleyinsider.foo' , version : 1 , configdb : '' }

   .. admin-only

.. describe:: shardingState

   .. write-lock, admin-only

.. describe:: unsetSharding

   ::

        { unsetSharding: 1 }

   .. slave-ok, admin-only

.. describe:: getShardVersion

   .. admin-only

Aggregation
~~~~~~~~~~~

.. describe:: group

   The ``group`` command returns an array of grouped items. ``group``
   provides functionality analogous to the ``GROUP BY`` statement in
   SQL. Consider the following example: ::

        db.collection.group(
                            {key: { a:true, b:true },
                             cond: { active:1 },
                             reduce: function(obj,prev) { prev.csum += obj.c; },
                             initial: { csum: 0 }
                            });

   In this command the ``group`` command is performed on the
   collection named ``collection`` and provides and aggregate sum of
   all documents with a value in the ``active`` field of ``1``. The
   parameter fields in the group command are:

   - **key** specifies the fields to group by.
   - **reduce** aggregates (i.e. reduces) the objects that the
     function iterates. Typically this counts or sums the field.
   - **initial** sets the starting value of the aggregation counter
     object.
   - **keyf** is an optional function that returns a "key object,"
     that specifies a key that is not a single field. One typical use
     of ``keyf`` is to group documents by day of week. Set ``keyf`` in
     lieu of a key.
   - **cond** specifies an optional condition that must be true for a
     document to be considered. This functions like a ``find()``
     query. If ``cond`` returns no results, the ``reduce`` function
     will run against all documents in the collection.
   - **finalize** is an optional function to run against every result
     before the item is returned, to provide additional post
     processing or transformation.

   Consider the following limitations:

   - The results of the ``group`` command are returned as a single
     BSON object. As a result you must ensure that there are fewer
     then 10,000 keys to prevent an exception.

   - The ``group`` command does not operate in :term:`sharded`
     environments. Use :command:`mapReduce` in these situations.

   .. read-lock

.. describe:: count

   The ``count`` command provides. For example: ::

        db.collection.count():

   In the JavaScript shell, this will return the number of documents
   in the collection ``collection``. You may also run this command
   using the ``runCommand`` functionality, with the following results: ::

        > db.runCommand( { count: "collection" } );
        { "n" : 10 , "ok" : 1 }

   Here, see that the collection named ``collection`` has 10
   documents.

   .. read-lock

.. describe:: mapReduce

   Run a map/reduce operation on the MongoDB server. This command is
   used for aggregating data and not query purposes. ``mapReduce``
   creates a collection holding the results of the operation. The
   ``mapReduce`` command has the following syntax: ::

        { mapreduce : <collection>,
           map : <mapfunction>,
           reduce : <reducefunction>,
           query : <query filter object>,
           sort : <sorts to limit input objects. For optimization>,
           limit : <number of objects to return>,
           out : <output>,
           keeptemp: <true|false>,
           finalize : <finalizefunction>,
           scope : <object where fields go into javascript global scope >,
           jsMode : true,
           verbose : true,
        }

   Only the ``map`` and ``reduce`` functions are required, all other
   fields are option. See :doc:`map-reduce` for more information on
   mapReduce.

   .. slave-ok

.. describe:: mapreduce.shardedfinish

   See :doc:`map-reduce` for more information on mapReduce
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
     to modify the returned documents

   - **new**, when set, returns the modified object rather than the
     original. The ``new`` option is ignored for ``remove``
     operations. To set, specify "``new: true``".

   - **fields**, specifies a limited selection of fields to
     return. See ":ref:`projection operators <projection-operators>`"
     for more information.

   - **upsert**, when set, creates an object if the specified
     ``query`` returns no objects. To set, specify "``upsert: true``".

.. describe:: distinct

   The ``distinct`` command returns a list of distinct values for a
   given field across a single collection. The command takes the
   following form: ::

        { distinct: collection, key: age, query: { query: { field: { $exists: true } } } }

   Here, all distinct values of the field (or "``key``") ``age`` are
   returned in documents that match the query "``{ field: { $exists:
   true }``". The query is optional.

   The shell and many drivers provide a helper method that provides this
   functionality. Used in the following syntax: ::

       db.collection.distinct("age", { field: { $exists: true } } );

   The ``distinct`` command can use an index to locate and return
   data.

TODO does distinct return a list or an array?

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

   .. ask

TODO document this

Replication
~~~~~~~~~~~

.. describe:: resync

   The ``resync`` command forces an out-of-date non-primary/master
   ``mongod`` instance to resynchronize itself.

   .. write-lock, slave-ok, admin-only.

.. describe:: replSetFreeze

   To the greatest extent possible, the ``replSetFreeze`` command
   freezes the state of a member. Use the following syntax: ::

        { replSetFreeze: <seconds> }

   This will prevent the MongoDB instance from attempting to become
   primary until the time specified by "``<seconds>``". To reverse
   this operation, issue the following command: ::

        { replSetFreeze: 0 }

   You can call again with {replSetFreeze:0} to reverse the operation
   of ``replSetFreeze``. Restarting the ``mongod`` process also
   unfreezes a replica set member, allowing the ``mongod`` instance to
   become primary again. This command is safe to run on slave
   instances and must be run on the admin database.

   .. slave-ok, admin-only

   See :doc:`replication` for more information about replication.

.. describe:: replSetGetStatus

   The ``replSetGetStatus`` command returns the status of the replica
   set form the point of view of the current server. To get this
   status, Issue the following command on the :term:`admin database`:
   ::

        { replSetGetStatus: 1 }

   .. slave-ok, admin-only

   See :doc:`replication` for more information about replication.

.. describe:: replSetInitiate

   The ``replSetInititate`` command is used to create a replica
   set. Use the following syntax: ::

         { replSetInitiate : <config_object> }

   The "``<config_object>``" is a :term:`JSON document` containing the
   configuration of the replica set. The configuration takes the form
   of a JSON document. Consider the following model of the most basic
   configuration for a 3-member replica set: ::

          {
              _id : <setname>,
               members : [
                   {_id : 0, host : <host0>},
                   {_id : 1, host : <host1>},
                   {_id : 2, host : <host2>},
               ]
          }

   The JavaScript shell provides a shortcut for ``replSetInititate``
   in the following form: ::

        rs.initiate()

   .. slave-ok, admin-only

   See :doc:`replication` for more information about replication.

.. describe:: replSetReconfig

   The ``replSetReconfig`` command provides the capability of changing
   the current replica set configuration. Use the following syntax to
   add configuration to a replica set: ::

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
     should always perform these operations during scheduled downtime.

   - In some situations, a ``replSetReconfig`` can cause the current
     shell to disconnect. Don't be alarmed.

   See :doc:`replication` for more information about replication.

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

   See :doc:`replication` for more information about replication.

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

   The above command returns all restaurants with a maximum distance
   of 6 units from the coordinates "``[30,33]``" up to a with a
   maximum of 30 results.

   Unless specified the ``geoSearch`` command has a 50 document result
   limit.

   .. read-lock, slave-ok


Collections
~~~~~~~~~~~

.. describe:: drop

   The ``drop`` command removes an entire collection from a
   database. Consider the following syntax: ::

        { drop: "collection" }

   This drops entire collection named ``collection`` from the
   database. In the shell, the following helper method is equivalent:
   ::

        db.collection.drop();

TODO factcheck

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

        { create: collection }

   To create a capped collection  command in the following form.

        { create: collection, capped: true, size: 40000, max: 9000 }

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
   in bytes is reached, older documents will be removed.

   You can use the ``.createCollection()`` method in the shell to
   access this functionality.

TODO factcheck

.. describe:: convertToCapped

   The ``convertToCapped`` command providdes the ability to convert an
   existing, non-capped collection to a :term:`capped collection`. Use
   the following syntax: ::

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

TODO factcheck

.. describe:: emptycapped

   The ``emptycapped`` command removes all documents from a capped
   collection. Use the following syntax: ::

        { emptycapped: "events" }

   In this example, the capped collection named ``events`` is
   emptied.

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
   will display values in kilobytes. Consider the following example
   output: ::

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

   The ``mongo`` shell also provides a helper. You can also return
   stats using the following command: ::

        db.collection.stats();

.. describe:: compact

   The ``compact`` command optimizes the storage for a single
   :term:`capped collection`. This is similar in function to the
   :command:`repairDatabase`, except that ``compact`` operates on a
   single collection. The command uses the following syntax: ::

        { compact: "collection" }

   In this example, ``collection`` will be compacted. Generally, this
   operation compacts and defragments the collection as well as
   rebuilds and compacts indexes. Consider the following behaviors:

   - During a ``compact`` will block all other activity.

   - In a :term:`replica set`, ``compact`` will refuse to run on the
     master node in a replica set unless the "``force: true``" option
     is specified. For example: ::

           { compact: "collection", force: true }

   - If you have journeying enabled and "kill" a compact option or the
     database restarts during a ``compact`` operation, no data will be
     lost, although indexes will be absent. Running ``compact``
     without journaling may risk data loss.

     .. warning::

        Always have a backup before performing server maintenance such
        as the ``compact`` operation.

   - ``compact`` requires a small amount of additional diskspace while
     running but unlike :command:`repairDatabase` it does *not* free
     space equal to the total size of the collection.

   - the ``compact`` command will not return until the operation is
     complete.

   - ``compact`` removes any :term:`padding factor` in the collection,
     which may impact performance if documents regularly grow.

   - ``compact`` commands do not replicate and can be run on slaves
     and replica set members.

   - :term:`Capped collections` cannot be compacted.

Administration
~~~~~~~~~~~~~~

.. describe:: fsync

   ``fsync`` is an admin only command that forces the ``mongod``
   process to flush all pending writes to the data files. In default
   operation, a full flush runs every sixty seconds. Running ``fsync``
   in the course of normal operations is not required. The command
   takes the following form: ::

        { fsync: 1 }

   The ``fsync`` command is synchronous and returns only after the
   operation has completed. To run the command asynchronously, use the
   following syntax: ::

        { fsync: 1, async: true }

   The ``fsync`` operation blocks all other write operations for a
   while it runs. To toggle a write-lock using ``fsync``, add a lock
   argument, as follows: ::

        { fsync: 1, lock: true }

   You must issue a command to unlock the database. This command will
   block until the operation is complete: when the command returns the
   database is unlocked. Such a command would resemble: ::

        { fsync: 1, lock: false }

   In the shell, the following helpers exist to simplify this
   process: ::

        db.fsyncLock();
        db.fsyncUnlock();

.. describe:: dropDatabase

   The ``dropDatabase`` command drops the database and deletes the
   associated data files. ``dropDatabase`` operates on the current
   database. In the shell issue the ``use [database]`` command,
   replacing "``[database]``" with the name of the database you wish
   to delete. Then use the following command form: ::

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

   Specify the field in the "index" parameter, to drop indexes with a
   specific key pattern. For example, to drop all indexes of the
   "``age``" field, use the following command format: ::

        { dropIndexes: "collection", index: "age: 1" }

   The shell also provides the following command helper: ::

        db.collection.dropIndex();

   Use as above to drop all indexes in ``collection``, and specify
   fields to only drop specific indexes.

TODO verify the behavior here. or at least understand how this works

.. describe:: clone

   The ``clone`` command makes it possible to clone a database from a
   remote host to the current host. The database on the remote host
   with the same name as the current database is copied. The command
   takes the following form: ::

        { clone: "example.com" }

   Modify ``example.com`` in this example with the resolvable hostname
   for the MongoDB instance you wish to copy from. Note the following
   behaviors:

   - ``clone`` can run against a :term:`slave` or a
     non-:term:`primary` member of a :term:`replica set`.
   - ``clone`` does not snapshot the database. If the copied database is
     updated at any point during the clone operation the resulting
     database may be inconsistent.
   - You must run ``clone`` on the **destination server**.
   - The destination server is not locked during the duration of the
     ``clone`` operation, and ``clone`` will occasionally yield to
     other operations.

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
   a ``fsck`` command for a file system. If your ``mongod`` instance
   is not running with journaling and you experience an unexpected
   system restart or crash, you should run the ``repairDatabase``
   command to ensure that there are no errors in the data
   storage. Additionally, the ``repairDatabase`` command will compact
   the database similar to the functioning of
   :command:`compact`. Issue the command with the following syntax.

        { repairDatabase: 1 }

   Be aware that this command can take a long time to run depending on
   the size of your database.

   This command is accessible via a number of different avenues. You
   may:

   - Use the shell as above.

   - Run it directly from your system's shell. Make sure that
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
      repairDatabase

.. describe:: shutdown

   The ``shutdown`` command shuts down the database process. The
   command takes the following form: ::

        { shutdown: 1 }

   .. note::

      The ``shutdown`` command must be run against the admin
      database. Additionally, the command must be issued from a
      connection on localhost, or the connection must be
      authenticated.

   For :doc:`replica set <replication>` users, if the current node is
   primary and no other members of the set are less than 10 seconds
   behind the node then the server will not shut down without a

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

   Be aware of the following behaviors: ::

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

   If you're not logged on using authentication this command will not
   have any effect.

.. describe:: logRotate

   ``logRotate`` is an admin only command that allows you to rotate
   the MongoDB commands to prevent a single logfile from consuming too
   much disk space. Use the following syntax: ::

        { logRotate: 1 }

   You may also rotate the logs by sending the ``mongod`` process the
   ``SIGUSR1`` signal.

   .. note::

      Your ``mongod`` instance needs to be running with the
      ``--logpath <file>`` option for the ``logRotate`` command.

   .. note::

      The ``logRotate`` command is not available to mongod instances
      running on windows systems.

TODO does logRotate remove the old files or rename them?

   .. force/validate options (?)

.. describe:: setParameter

   The ``setParementer`` command takes the following arguments:

   - journalCommitInterval
   - logLevel
   - notablescan
   - quiet
   - syncdelay

   .. slave-ok, admin-only

.. describe:: getParameter

   The ``getParemeter`` command takes the following arguments:

   - quiet
   - notablescan
   - logLevel
   - syncdelay

   .. slave-ok, admin-only


Diagnostics
~~~~~~~~~~~

.. describe:: dbStats
.. describe:: listDatabases
.. describe:: connPoolStats

   .. maybe

.. describe:: getCmdLineOpts
.. describe:: validate
.. describe:: top
.. describe:: buildInfo
.. describe:: getLastError
.. describe:: getLog

   .. ask

.. describe:: cursorInfo


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

   The value (e.g. ``1`` above,) doe not have an impact on the
   behavior of the command.

.. describe:: journalLatencyTest

   ``journalLatencyTest`` is an admin command that tests the length of
   time required to write and perform a file system sync (e.g. fsync)
   for a file in the journal directory. The command syntax is:

         { journalLatencyTest: 1 }

   The value (i.e. ``1`` above), does not affect the operation of the
   command.

.. describe:: availableQueryOptions

   { "options" : 254, "ok" : 1 }

TODO no documentation exists, and the response I get is the above

.. describe:: serverStatus

   The ``serverStatus`` command returns a document that provides an
   overview of the database process' state. The command takes the
   following form: ::

        { serverStatus: 1 }

   The value (i.e. ``1`` above), does not affect the operation of the
   command. You may also access this command with the following shell
   helper: ::

        db.serverStatus();

   For more information about the values provided by this command see
   the :doc:`server-status`.

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
   operations it is unnecessary; however, you may wish if the
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
