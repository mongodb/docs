===========================
 MongoDB Command Reference
===========================

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

TODO factcheck above

User Commands
=============

Sharding
--------

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
-----------

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
   used for aggregation and not query purposes.. ``mapReduce`` creates
   a collection holding the results of the operation. The
   ``mapReduce`` command has the following syntax: ::

        { mapreduce : <collection>,
           map : <mapfunction>,
           reduce : <reducefunction>
           [, query : <query filter object>]
           [, sort : <sorts the input objects using this key. Useful for optimization, like sorting by the emit key for fewer reduces>]
           [, limit : <number of objects to return from collection>]
           [, out : <see output options below>]
           [, keeptemp: <true|false>]
           [, finalize : <finalizefunction>]
           [, scope : <object where fields go into javascript global scope >]
           [, jsMode : true]
           [, verbose : true]
        }

   See :doc:`map-reduce` for more information on mapReduce.

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

TODO does distinct return a list or an array?


Replicationj
-----------

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
-----------

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
   - The ``distanceMultiplier`` option IS UNDOCUMENTED.

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

Indexes
-------

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


Collections
-----------

.. describe:: drop

   The ``drop`` command removes an entire collection from a
   database. Consider the following syntax: ::

        { drop: "collection" }

   This drops entire collection named ``collection`` from the
   database. In the shell, the following helper method is equivalent:
   ::

        db.collection.drop();

TODO factcheck

emptycapped
captrunc
convertToCapped
renameCollection
collStats

.. describe:: create

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

Operations
----------
eval
filemd5
dataSize


Administration
--------------
fsync
copydbgetnonce
dropDatabase
dropIndexes
clone
closeAllDatabases
repairDatabase
dbHash
shutdown
ping
copydb
logout
logRotate
compact
- force
- validate

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
-----------
dbStats
listDatabases
connPoolStats

isMaster
whatsmyuri

getCmdLineOpts
features
validate
driverOIDTest
top
serverStatus
buildInfo
getLastError
getLog
diagLogging
cursorInfo

.. describe:: journalLatencyTest

.. describe:: availableQueryOptions

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

Internal Use
============

.. describe:: medianKey

   ``medianKey`` is an internal command.

   .. slave-ok, read-lock

.. describe:: geoWalk

   ``geoWalk`` is an internal command.

   .. read-lock, slave-ok

.. describe:: sleep

   ``sleep` an internal command for testing purposes. The ``sleep``
   comand forces the db block all operations. It takes the following
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

   ``replSetheThis is an internal command that support replica set functionality.

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

   ``checkShardingIndex is an internal command that supports the
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
