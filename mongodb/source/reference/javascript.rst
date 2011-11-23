====================
JavaScript Interface
====================

.. highlight_language: javascript
.. highlight:: javascript

Data Manipulation
-----------------

Query and Update Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. js:function:: find(query,projection)

   :param JSON query: A JSON document that specifies the :term:`query`
                     using valid JSON and :doc:`query operators
                     </reference/operators>`.

   :param JSON projection: A JSON document that controls the
                           :term:`projection`, or the contents of the
                           data returned.

   Provides access to querying functionality. The argument to
   ``find()`` takes the form of a :term:`JSON` document. See the
   ":doc:`/reference/operators`" for an overview of the available
   operators to provide query functionality.

.. js:function:: findOne()

   Returns only one document that satisfies the query specified as the
   argent to this function. If there are multiple documents that
   satisfy the query, this method returns the first document according
   to the :term:`natural order` or insertion order in :term:`capped
   collections`.

.. js:function:: save()

   Provides the ability to create a new document in the current
   database and collection. The argument to ``save()`` takes the form
   of a :term;`JSON` document. See ":ref:`update-operators`" for a
   reference of all operators that affect updates.

.. js:function:: update()

   Provides the ability to update an existing document in the current
   database and collection. The argument to ``update()`` takes the
   form of a :term;`JSON` document. See ":ref:`update-operators`" for
   a reference of all operators that affect updates.

Query Modifiers
~~~~~~~~~~~~~~~

.. js:function:: next()

   Returns the next document in the cursor returned by the
   :js:func:`find()` function. See :js:func:`hasNext()` for related
   functionality.

TODO expand with greater understanding of cursors

.. js:function:: size()

   Returns a count of the number of documents that match the
   :js:func:`find()` query.

.. js:function:: explain()

   Returns a document that describes the process used to return the
   query. This may provide useful insight when attempting to optimize
   a query.

   See :mongodb:operator:`$explain` for related functionality.

.. js:function:: showDiskLoc()

   Returns a document that describes the on-disk location of the
   objects returned by the query. See :mongodb:operator:`$showDiskLoc`
   for related functionality.

.. js:function:: forEach()

   Provides the ability to loop or iterate over the cursor returned by
   a :js:func:`find()` query and returns each result on the
   shell. Specify a JavaScript function as the argument for the
   ``forEach()`` function. Consider the following example: ::

         db.users.find().forEach( function(u) { print("user: " + u.name); } );

   See :js:func:`map()` for similar functionality.

.. js:function:: map()

   Provides the ability to loop or iterate over the cursor returned by
   a :js:func:`find()` query and returns each result as the member of
   an array. Specify a JavaScript function as the argument for the
   ``map()`` function. Consider the following example: ::

         db.users.find().map( function(u) { print("user: " + u.name); } );

   See :js:func:`forEach()` for similar functionality.

.. js:function:: hasNext()

   This function returns ``true``, if the cursor returned by the
   :js:func:`find()` query contains documents that can be iterated
   over to return results.

TODO expand with greater understanding of cursors

Query Cursor Methods
~~~~~~~~~~~~~~~~~~~~

.. js:function:: count()

   Append the ``count()`` method to a ":js:func:`.find()`" query to
   return the number of matching objects for any query. ``count()`` is
   optimized to perform this operation on the MongoDB server rather
   than in the application code.

   In normal operation, ``count()`` ignores the effects of the
   :js:func:`skip()` and :js:func:`limit()`. To consider these
   effects specify "``count(true)``".

.. js:function:: limit()

   Append the ``limit()`` method to a ":js:func:`find()`" query to
   specifies the maximum number of documents a query will
   return. ``limit()`` is analogous to the ``LIMIT`` statement in a
   SQL database.

   Use ``limit()`` to maximize performance and avoid having MongoDB
   return more results than are required for processing.

   A ``limit()`` value of 0 (e.g. "``.limit(0)``") is equivalent to
   setting no limit.

.. js:function:: skip()

   Append ``skip()`` to a ":js:func:`.find()`" query to control where
   MongoDB begins returning results. This approach may be useful in
   implementing "paged" results. Consider the following JavaScript
   function as an example of the sort function: ::

        function printStudents(pageNumber, nPerPage) {
           print("Page: " + pageNumber);
           db.students.find().skip((pageNumber-1)*nPerPage).limit(nPerPage).forEach( function(student) { print(student.name + "<p>"); } );
        }

   The ``skip()`` method can be quite costly because it requires the
   serer to walk from the beginning of the collection or index to get
   the offset or skip position before beginning to return result. As
   offset (e.g. ``pageNumber`` above) increases, ``skip()`` will
   become slower and more CPU intensive. With larger collections,
   ``skip()`` may become IO bound.

   Consider using range-based pagination for these kinds of
   tasks. This approach features better index utilization, if you do
   not need to easily jump to a specific page.

TODO the above is mostly stolen from the wiki, and I'm not sure I understand what range-based paging is or where to link to an appropriate section.

.. js:function:: snapshot()

   Append the ``snapshot()`` method to the :js:func:`find()` query to
   toggle the "snapshot" mode. This ensures that the query will not
   miss any documents and return no duplicates, when objects are
   updated while the query runs. Snapshot mode does not impact the
   handling of documents which are added or removed during the query.

   Queries with results of less less than 1 megabyte are effectively
   snapshotted.

TODO verify clarity of sort explanation.

.. js:function:: sort()

   Append the ``sort()`` method to the :js:func:`find()`" queries to control
   the order that matching documents are returned by the
   operation. Consider the following example: ::

        db.collection.find().sort( { age: -1 } );

   Here, all documents in ``collection`` are returned ordered based on
   the ``age`` field in descending order. Specify a value of negative
   one (e.g. "``-1``", as above) to sort in descending order or a
   positive value (e.g. "``1``") to sort in ascending order.

   Unless you have a index for the specified key pattern, use
   ``sort()`` in conjunction with :js:func:`limit()` to avoid
   requiring MongoDB to perform a large in-memory
   sort. :js:func:`limit()` increases the speed and reduce the amount
   of memory required to return this query by way of an optimized
   algorithm.

Administrative Functions
------------------------

Database
~~~~~~~~

.. js:function:: db.addUser("username", "password"[, readOnly])

   :param string username: Specifies a new username.

   :param string password: Specifies the corresponding password.

   :param boolean readOnly: Optionally restricts a user to read-privileges
                            only. Defaults to false.

   Use this command to create new database users, by specifying a
   username, password as arguments to the command. If you want to
   restrict this user to only have read-only privileges; however, this
   defaults to false.

.. js:function:: db.auth("username", "password")

   :param string username: Specifies an existing username with access
                           privileges for this database.

   :param string password: Specifies the corresponding password.

   Allows a user to authenticate to the database from within the
   shell. Alternatively use :option:`mongo --username` and
   :option:`--password <mongo --password>` to specify authentication
   credentials.

.. js:function:: db.cloneDatabase("hostname")

   :param string hostname: Specifies the hostname to copy the current
                           node.

   Use this function to copy a database from a remote to the current
   database. The command assumes that the remote database has the same
   name as the current database. Use the following command to change
   to the database "``importdb``": ::

        use importdb

   New databases are implicitly created, so the current host does not
   need to have a database named ``importdb`` for this command to
   succeed.

   This function provides a wrapper around the MongoDB database
   command ":mongodb:command:`clone`." The :mongodb:command:`copydb`
   database command provide related functionality.

.. js:function:: db.commandHelp(command)

   :param command: Specifies a :doc:`database command name
                   </reference/commands>`.

   Returns help text for a :doc:`database commands
   </reference/commands>`.

.. js:function:: db.copyDatabase(origin, destination, hostname)

   :param database origin: Specifies the name of the database on the
                           origin system.

   :param database destination: Specifies the name of the database
                                that you wish to copy the origin
                                database into.

   :param origin hostname: Indicate the hostname of the origin database
                           host.

   Use this function to copy a specific database, named "``origin``"
   running on the system accessible via "``hostname``" into the local
   database named "``destination``". The destination database will be
   created implicitly if it does not already exit.

   This function provides a wrapper around the MongoDB database
   command ":mongodb:command:`copydb`." The :mongodb:command:`clone`
   database command provide related functionality.

.. js:function:: db.createCollection(name [{size: <value>, capped: <boolean> , max <bytes>}] )

   :param string name: Specifies the name of a collection to create.

   :param JSON capped: Optional. If specified this document creates a
                       capped collection. The capped argument is a
                       JSON document that contains the following three
                       fields:

   :param bytes size: Specifies a maximum size in bytes, for the as a
                      ":term:`cap <capped collection>` for the
                      collection.

   :param boolean capped: Enables a :term:`collection cap <capped
                          collection>`. False by default. If enabled,
                          you must specify a ``size`` parameter.

   :param int max: Optional. Specifies a maximum "cap," in number of
                   documents for capped collections. You must also
                   specify ``size`` when specifying ``max``.

   Explicitly creates a new collation. Because collections are
   created implicitly when referenced, this command is primarily used
   for creating new capped collections.

   Capped collections have maximum size or document counts that limit
   their ability to grow beyond maximum thresholds. All capped
   collections must specify a maximum size, but may also specify a
   maximum document count. Documents will be truncated if a collection
   reaches the maximum size limit before the maximum document count,
   documents will be truncated. Consider the following example: ::

        db..createCollection(log, { size : 5120, capped : true, max : 5000 } )

   This command creates a collection named log with a maximum size of
   5 megabytes (5120 bytes,) or a maximum of 5000 documents.

   This command provides a wrapper around the database command
   ":mongodb:command:`create`. See the ":doc:`/core/capped-collections`"
   document for more information about capped collections.

.. js:function:: db.currentOp()

   Returns a document containing the field "``inprog``" which contains
   an array that reports the current operation in the database
   instance.

.. js:function:: db.dropDatabase()

   Removes (and deletes) the current database. Does not change the
   current database, so the creation of any documents in this database
   will create.

.. js:function:: db.eval(function, arguments)

   :param JavaScript function: A JavaScript function.

   :param arguments: A list of arguments to be passed to the
                     JavaScript function.

   Makes it possible to execute JavaScript codes using the JavaScript
   interpreter embeded in the database server. In this environment the
   "``db``" variable on the server is set to the name of the current
   database.

   .. warning::

      Do not use :js:func:`db.eval()` for long running operations, as
      :js:func:`db.eval()` blocks all other operations. Consider using
      :doc:`map reduce </core/map-reduce>` for similar functionality in
      these situations.

.. js:function:: db.getCollection(name)

   :param name: the name of a collection.

   Returns the name of a collection. This is useful collections that
   may interact with the shell itself, including collections with
   names that begin with "``_``" or mirror the :doc:`database commands
   </reference/commands>`.

.. js:function:: db.getCollectionNames()

   Returns an array containing all collections in the existing
   database.

.. js:function:: db.getLastError()

   Returns the last error message as a string.

   In many situation MongoDB drivers and users will, attach this
   command to a write operation to ensure that writes succeed. Using
   This "safe mode" is ideal for many--but not all--write operations.

.. js:function:: db.getLastErrorObj()

   Returns a full JSON document with status information.

.. js:function:: db.getMongo()

   Returns the current connection status. This is returned when the
   MongoDB starts. Use this command to ensure that your
   :option:`mongo` instance is connected to the proper database
   instance.

.. js:function:: db.getMongo().setSlaveOk()

   For the current session, this command permits read operations from
   non-master (i.e. :term:`slave` or :term:`secondary`) nodes.

   In essence, this indicates that "eventually consistent" read
   operations are acceptable for the current connection. This function
   Provides the same functionality as :js:func:`rs.slaveOk()`.

.. js:function:: db.getName()

   Returns the current database name.

.. js:function:: db.getPrevError()

   Returns a status document, containing the errors since the last
   time the :mongodb:command:`resetError` (also
   :js:func:`db.resetError()`) command was issued.

   This command provides a wrapper around the
   :mongodb:command:`getPrevError` command.

.. js:function:: db.getProfilingLevel()

   This function provides a wrapper around the database command
   ":mongodb:command:`profile`" and returns the current profiling
   level.

   .. deprecated:: 1.8.4
      Use :js:func:`db.getProfilingStatus()` for related functionality.

.. js:function:: db.getProfilingStatus()

   Returns a document with two fields that contain the current
   :mongodb:command:`profile` level and the current
   :mongodb:setting:`slowms` setting.

.. js:function:: db.getReplicationInfo()

   Returns a status document that contains statistics related to
   replication documented in the ":doc:`/reference/replication-info`"
   document.

.. js:function:: db.getSiblingDB()

   Used to return another database without modifying the current
   "``db``" setting in the shell environment.

.. js:function:: db.killOP(opid)

   :param oppid: Specify an operation ID.

   Terminates the specified operation. Use :js:func:`db.currentOp()`
   to determine the current operation.

.. js:function:: db.listCommands()

   Provides a list of all database commands. See the
   ":doc:`/reference/commands`" document for a more extensive index of
   these options.

.. js:function:: db.logout()

   Forces the current session to end the current authentication
   session. This function has no effect if the current session is not
   authenticated.

   This function provides a wrapper around the database command
   ":mongodb:commands:`logout`".

.. js:function:: db.printCollectionStats()

   Provides a wrapper around the :js:func:`db.[collection].stats()` and
   returns statistics from every collection separated by three hyphen
   characters.

   .. seealso:: ":doc:`/reference/collection-statistics`"

.. js:function:: db.printReplicationInfo()

   Provides a formatted report of the status of a :term:`replica set`
   from the perspective of the :term:`primary` node. See the
   ":doc:`/reference/replica-status`" for more information regarding
   the contents of this output.

   This function will return :js:func:`printSlaveReplicationInfo()` if
   issued against a :term:`secondary` node.

.. js:function:: db.printSlaveReplicationInfo()

   Provides a formatted report of the status of a :term:`replica set`
   from the perspective of the :term:`secondary` node. See the
   ":doc:`/reference/replica-status`" for more information regarding
   the contents of this output.

.. js:function:: db.printShardingStatus()

   Provides a formatted report of the status of the shards and the
   information regarding the chunks of the database for the current
   :term:`shard cluster`.

   .. seealso:: :js:func:`sh.status()`

.. js:function:: db.removeUser(username)

   :param username: Specify a database username.

   Removes the specified username from the database.

.. js:function:: db.repairDatabase()

   Checks and repairs errors and inconsistencies with the data
   storage. This function is analogous to a ``fsck`` operation for
   file systems. Additionally, the function compacts the database to
   optimize the current database's storage utilization, as with the
   :mongodb:command:`compact` command.

   This function has the same effect as using the runtier option
   ":option:`mongodb --repair`," but only operates on the current
   database.

   This command provides a wrapper around the database command
   ":mongodb:command:`repairDatabase`".

.. js:function:: db.resetError()

   Resets the error message returned by :js:func:`db.getPrevError` or
   :mongodb:command:`getPrevError`. Provides a wrapper around the
   :mongodb:command:`resetError` command.

.. js:function:: db.runCommand(command)

   :param JSON command: Specifies a :term:`database command` in the
                        form of a JSON document.

   :param string command: Alternatively, if a :doc:`command
                          </reference/commands>` is specified as a
                          string it is transformed to "``{ command: 1 }``".

   Provides a method to run :doc:`database commands
   </reference/commands>` that are specified in the form a
   :term:`JSON` document. If the command is specified as a string
   (e.g. "``cmd``") then this function will run a command equivalent
   to "``{ cmd : 1 }``".

   This is the preferred method to issue database commands, as it
   provides a consistent interface between the shell and drivers.

.. js:function:: db.serverStatus()

   Returns a JSON document that provides an over view of the database
   process' state.

   This command provides a wrapper around the database command
   :mongodb:command:`serverStatus`.

   .. seealso:: ":doc:`/reference/server-status`" for complete
      documentation of the output of this function.

.. js:function:: db.setProfilingLevel(level,slowms)

   :param level: Specify a profiling level, see list of possible
                 values below.

   :param slowms: Optionally modify the threshold for a query or
                  operation to be considered "slow."

   Modifies the current :term:`database profiling` level which allows
   administrators to capture data regarding performance. The database
   profiling system can impact performance and can allow the server to
   write the contents of queries to the log, which might information
   security implications for your deployment.

   The following profiling levels are available:

   =========  ==================================
   **Level**  **Setting**
   ---------  ----------------------------------
      0       Off. No profiling.
      1       On. Only includes slow operations.
      2       On. Includes all operations.
   =========  ==================================

   Also configure the ``slowms`` option to set the threshold for the
   profiler to consider a query "slow." This value is specified in
   milliseconds and overrides the default
   :mongodb:setting:`configuration value <slowms>` or :option:`runtime
   option <mongod --slowms>`.

   This command provides a wrapper around the database command
   :mongodb:command:`profile`.

   The output of the database profiler is written to the
   ``system.profile`` collection.

.. js:function:: db.shutdownServer()

   Shuts down the current :option:`mongod` or :option:`mongos`
   process cleanly and safely.

   This function will fail if the current database *is not* the admin
   database.

   This command provides a wrapper around the :mongodb:command:`shutdown`.

.. js:function:: db.stats(scale)

   :param optional scale: Specifies the scale to deliver
                          results. Unless specified, all data are
                          reported in bytes.

   Returns a document containing statistics that reflect the state of
   the entire database system.

   This function provides a wrapper around the database command
   ":mognodb:command:`dbstats`". The "``scale``" option allows you to
   configure how the values of bytes are scaled. For example, specify
   a "``scale``" value of "``1024``" to display kilobytes rather than
   bytes.

   See the ":doc:`/reference/database-statistics`" document for an
   overview of this output.

.. js:function:: db.collection.stats(scale)

   :param optional scale: Specifies the scale to deliver
                          results. Unless specified, all data are
                          reported in bytes.

   :param collection: Specify the name of the collection in the
                      function call.

   Returns a document containing statistic that reflect the state of
   the specified collection.

   This function provides a wrapper around the database command
   :mongodb:command:`collstats`. The "``scale``" option allows you to
   configure how the values of bytes are scaled. For example, specify
   a "``scale``" value of "``1024``" to display kilobytes rather than
   bytes.

   See the ":doc:`/reference/collection-statistics`" document for an
   overview of this output.

.. js:function:: db.version()

   Returns the version of the :option:`mongod` instance.

.. js:function:: db.fsyncLock()

   Forces the database to flush all write operations to the disk and
   locks the database to prevent additional writes until the lock is
   released using the :js:func:`db.fsyncUnlock()` command.

   This command provides a simple wrapper around a
   :mongodb:command:`fsync` database command with the following
   syntax: ::

        { fsync: 1, lock: true }

   This function is used to lock the database and create a window for
   :doc:`backup operations </administration/backups>`.

.. js:function:: db.fsyncUnock()

   Unlocks a database server to allow writes to reverse the operation
   of a :js:func:`db.fsyncLock()` operation. Typically used to allow
   writes following a database :doc:`backup operation
   </administration/backups>`.

Sharding
~~~~~~~~

.. seealso:: ":doc:`/core/sharding`" for more information on the
   sharding technology and methods for creating :term:`shard
   clusters`.

.. js:function:: sh.addShard(host)

   :param hostname host: Specify the hostname of a new shard server.

   Use this to add shard instances to the present :term:`shard
   cluster`. The ``host`` parameter can be in any of the following
   forms: ::

        [hostname]
        [hostname]:[port]
        [set]/[hosname]
        [set]/[hosname],[hostname]:port

   You can specify shards using the hostname, or a hostname and port
   combination if the shard is ruining on a non-standard port. A
   :term:`replica set` can also function as a shard member. In these
   cases supply ``addShard`` with the set name, followed by at least
   one existing member of the set as a seed in a comma separated list,
   as in the final two examples.

   This function provides a wrapper around the administrative command
   :mognodb:command:`addShard`.

.. js:function:: sh.enableSharding(database)

   :param name database: Specify a database name to shard.

   Enables sharding on the specified database. This does not
   automatically shard the database, but makes it possible to begin
   sharding collections using :js:func:`sh.shardCollection()`.

.. js:function:: sh.shardCollection(collection,key,unique)

   :param name collection: The name of the collection to shard.

   :param JSON key: A JSON document containing :term:`shard key` that
                    will be used to shard and distribute objects among
                    the shards.

   :param boolean unique: Set true.

   Shards the named collection, according to the specified
   :term:`shard key`. Shard keys are presented in the form of a
   :term:`JSON` and can specify either a single shard key, or more
   typically a compound shard key.

TODO it looks like unique has no impact.

.. js:function:: sh.splitFind(collection, query)

   :param string collection: Specify the sharded collection containing
                             the chunk to migrate.

   :param JSON query: Specify a query to identify a document in a
                      specific chunk. Typically specify the
                      :term:`shard key` for a document as the query.

   Splits the chunk containing the document specified by the ``query``
   at its median point, creating two roughly equal chunks. Use
   :js:func:`sh.splitAt()` to split a collection in a specific point.

   In most circumstances, chunk splitting should be left to the
   automated processes. However, when initially deploying a
   :term:`shard cluster` it is necessary to perform some measure of
   :term:`pre-splitting` using manual methods including
   ``sh.splitFind()``.

.. js:function:: sh.splitAt(collection, query)

   :param string collection: Specify the sharded collection containing
                             the chunk to migrate.

   :param JSON query: Specify a query to identify a document in a
                      specific chunk. Typically specify the
                      :term:`shard key` for a document as the query.

   Splits the chunk containing the document specified by the ``query``
   as if that document is at the "middle" of the collection, even if
   the specified document is not the actual median of the
   collection. Use this command to manually split chunks unevenly. Use
   the ":js:func:`sh.splitFind()`" function to split a chunk at the
   actual median.

   In most circumstances, chunk splitting should be left to the
   automated processes. However, when initially deploying a
   :term:`shard cluster` it is necessary to perform some measure of
   :term:`pre-splitting` using manual methods including
   ``sh.splitAt()``.

.. js:function:: sh.moveChunk(collection, query, destination)

   :param string collection: Specify the sharded collection containing
                             the chunk to migrate.

   :param JSON query: Specify a query to identify a document in a
                      specific chunk. Typically specify the
                      :term:`shard key` for a document as the query.

   :param string destination: Specify the name of the shard that you
                              wish to move the designated chunk to.

   Moves the chunk containing the document specified by the ``query``
   to the shard described by ``destination``.

   This function provides a wrapper around the
   :mongodb:command:`moveChunk`. In most circumstances, migration of
   chunks should be automatically handled by the :term:`balancer` and
   should *not* be called manually.

.. js:function:: sh.setBalancerState(state)

   :param boolean state: ``true`` enables the balancer if disabled,
                         and ``false`` disables the balancer.

   Enables or disables the :term:`balancer`. Use
   :js:func:`sh.getBalancerState()` to check the current state of the
   balancer.

.. js:function:: sh.getBalancerState()

   Returns true if the :term:`balancer` is enabled and false if the
   balancer is disabled. This does not reflect the current state of
   balancing operations: use :js:func:`sh.isBalancerRunning()` to
   check current state.

.. js:function:: sh.isBalancerRunning()

   Returns true if the :term:`balancer` process is currently running
   and migrating chunks and false if the balancer process is not
   running. Use :js:func:`sh.getBalancerState()` to determine if the
   balancer is enabled or disabled.

.. js:function:: sh.status()

   Provides a formatted report of the status of the shards and the
   information regarding the chunks of the database for the current
   :term:`shard cluster`.

.. js:function:: sh.help()

   Returns a basic help text.

Replica Sets
~~~~~~~~~~~~

.. js:function:: rs.status()
   rs.status()                     { replSetGetStatus : 1 } checks repl set status

.. js:function:: rs.initiate()

   rs.initiate()                   { replSetInitiate : null } initiates set with default settings
   rs.initiate(cfg)                { replSetInitiate : cfg } initiates set with configuration cfg

.. js:function:: rs.conf()

   rs.conf()                       get the current configuration object from local.system.replset

.. js:function:: rs.reconfig()

   rs.reconfig(cfg)                updates the configuration of a running replica set with cfg (disconnects)

   reconfiguration helpers disconnect from the database so the shell will display
   an error, even if the command succeeds.

.. js:function:: rs.add()

   rs.add(hostportstr)             add a new member to the set with default attributes (disconnects)
   rs.add(membercfgobj)            add a new member to the set with extra attributes (disconnects)

.. js:function:: rs.addArb()

   rs.addArb(hostportstr)          add a new member which is arbiterOnly:true (disconnects)

.. js:function:: rs.stepDown()

   rs.stepDown([secs])             step down as primary (momentarily) (disconnects)

.. js:function:: rs.freeze()

   rs.freeze(secs)                 make a node ineligible to become primary for the time specified

.. js:function:: rs.remove()

   rs.remove(hostportstr)          remove a host from the replica set (disconnects)

.. js:function:: rs.slaveOk()

   rs.slaveOk()                    shorthand for db.getMongo().setSlaveOk()

.. js:function:: db.isMaster()

   db.isMaster()                   check who is primary

.. js:function:: rs.help()



Native Shell Functions
----------------------

These functions provide a number of low level and internal functions
that may be useful in the context of some advanced operations in the
shell.

.. js:function:: load()

.. js:function:: quit()

.. js:function:: getMemInfo()

.. js:function:: _srand()

   ( "_srand" , JSSrand );

.. js:function:: _rand()

   ( "_rand" , JSRand );

.. js:function:: _isWindows()

.. js:function:: _startMognoProgram()

   ( "_startMongoProgram", StartMongoProgram );

.. js:function:: runProgram()

   ( "runProgram", RunProgram );

.. js:function:: run()

   ( "run", RunProgram );

.. js:function:: runMongoProgram()

   ( "runMongoProgram", RunMongoProgram );

.. js:function:: stopMongod()

   ( "stopMongod", StopMongoProgram );

.. js:function:: stopMongoProgram()

   ( "stopMongoProgram", StopMongoProgram );

.. js:function:: stopMongoProgramByPid()

.. js:function:: rawMongoProgramOutput()

.. js:function:: clearRawMongoProgramOutput()

.. js:function:: waitProgram()

.. js:function:: waitMongoProgramOnPort()

.. js:function:: getHostName()

.. js:function:: removeFile()

.. js:function:: fuzzFile()

.. js:function:: listFiles()

.. js:function:: ls()

.. js:function:: pwd()

.. js:function:: cd()

.. js:function:: cat()

.. js:function:: hostname()

.. js:function:: resetDbpath()

.. js:function:: copyDbpath()

.. js:function:: md5sumFile()

.. js:function:: mkdir()
