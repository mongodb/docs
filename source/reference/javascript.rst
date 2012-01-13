====================
JavaScript Interface
====================

.. highlight:: javascript
.. default-domain:: mongodb

Data Manipulation
-----------------

Query and Update Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. js:function:: find(query,projection)

   :param JSON query: A :term:`JSON document` that specifies the
                     :term:`query` using valid :term:`JSON` and
                     :doc:`query operators </reference/operators>`.

   :param JSON projection: A JSON document that controls the
                           :term:`projection`, or the contents of the
                           data returned.

   :returns: All of the documents that match the ``query`` document.

   Provides access to querying functionality. The argument to
   ``find()`` takes the form of a :term:`JSON` document. See the
   ":doc:`/reference/operators`" for an overview of the available
   operators to provide query functionality.

.. js:function:: findOne(query)

   :param JSON query: A JSON document that specifies the :term:`query`
                     using valid JSON and :doc:`query operators
                     </reference/operators>`.

   :returns: One document that satisfies the query specified as the
             argument to this function.

   If multiple documents satisfy the query, this method returns the
   first document according to the :term:`natural order` or insertion
   order in :term:`capped collections <capped collection>`.

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

   :returns: A count of the number of documents that match the
             :js:func:`find()` query.

.. js:function:: explain()

   :returns: A document that describes the process used to return the
             query.

   This method may provide useful insight when attempting to optimize
   a query.

   .. seealso:: :mongodb:operator:`$explain` for related functionality
      and ":doc:`/applications/optimization`" regarding optimization
      strategies.

.. js:function:: showDiskLoc()

   :returns: A document that describes the on-disk location of the
             objects returned by the query.

   .. seealso:: :mongodb:operator:`$showDiskLoc` for related
      functionality.

.. js:function:: forEach()

   Provides the ability to loop or iterate over the cursor returned by
   a :js:func:`find()` query and returns each result on the
   shell. Specify a JavaScript function as the argument for the
   ``forEach()`` function. Consider the following example: ::

         db.users.find().forEach( function(u) { print("user: " + u.name); } );

   .. seealso:: :js:func:`map()` for similar functionality.

.. js:function:: map()

   Provides the ability to loop or iterate over the cursor returned by
   a :js:func:`find()` query and returns each result as the member of
   an array. Specify a JavaScript function as the argument for the
   ``map()`` function. Consider the following example: ::

         db.users.find().map( function(u) { print("user: " + u.name); } );

   .. seealso:: :js:func:`forEach()` for similar functionality.

.. js:function:: hasNext()

   :returns: boolean.

   ``hasNext()`` returns ``true`` if the cursor returned by the
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
   tasks. That is, query for a range of objects, using logic within
   the application to determine the pagination rather than the
   database itself. This approach features better index utilization,
   if you do not need to easily jump to a specific page.

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

   Use this function to create new database users, by specifying a
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
   command ":command:`clone`." The :command:`copydb` database command
   provide related functionality.

.. js:function:: db.commandHelp(command)

   :param command: Specifies a :doc:`database command name
                   </reference/commands>`.

   :returns: Help text for a :doc:`database commands </reference/commands>`.

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
   command ":command:`copydb`." The :command:`clone`
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
   ":command:`create`. See the ":doc:`/core/capped-collections`"
   document for more information about capped collections.

.. js:function:: db.currentOp()

   :returns: A :term:`JSON` document that contains an array named
             "``inprog``".

   The ``inprog`` array reports the current operation in the database
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

      This function does not work with sharded data. However, you may
      use :js:func:`db.eval()` with non-sharded collections and
      databases stored in :term:`shard cluster <shard clusters>`.

.. js:function:: db.getCollection(name)

   :param name: The name of a collection.

   :returns: The name of a collection.

   Use this command to describe collections that may interact with the
   shell itself, including collections with names that begin with
   "``_``" or mirror the :doc:`database commands
   </reference/commands>`.

.. js:function:: db.getCollectionNames()

   :returns: An array containing all collections in the existing
             database.

.. js:function:: db.getLastError()

   :returns: The last error message as a string.

   In many situation MongoDB drivers and users will, attach this
   command to a write operation to ensure that writes succeed. Using
   This "safe mode" is ideal for many--but not all--write operations.

   .. seealso:: ":ref:`Replica Set Write Propagation <replica-set-write-propagation>`"
      and ":command:`getLastError`."

.. js:function:: db.getLastErrorObj()

   :returns: A full JSON document with status information.

.. js:function:: db.getMongo()

   :returns: The current connection status.

   This is returned when the shell initiates. Use this command to
   ensure that your :option:`mongo` instance is connected to the
   proper database instance.

.. js:function:: db.getMongo().setSlaveOk()

   For the current session, this command permits read operations from
   non-master (i.e. :term:`slave` or :term:`secondary`) nodes.

   In essence, this indicates that "eventually consistent" read
   operations are acceptable for the current connection. This function
   Provides the same functionality as :js:func:`rs.slaveOk()`.

.. js:function:: db.getName()

   :returns: the current database name.

.. js:function:: db.getPrevError()

   :returns: A status document, containing the errors.

   This output reports all errors since the last time the
   :command:`resetError` (also :js:func:`db.resetError()`)
   command was issued.

   This command provides a wrapper around the
   :command:`getPrevError` command.

.. js:function:: db.getProfilingLevel()

   This function provides a wrapper around the database command
   ":command:`profile`" and returns the current profiling
   level.

   .. deprecated:: 1.8.4
      Use :js:func:`db.getProfilingStatus()` for related functionality.

.. js:function:: db.getProfilingStatus()

   :returns: The current :command:`profile` level and
             :mongodb:setting:`slowms` setting.

.. js:function:: db.getReplicationInfo()

   :returns: A status document.

   This output reports statistics related to replication. These values
   are documented in
   the ":doc:`/reference/replication-info`" document.

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
   ":command:`logout`".

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
   :command:`compact` command.

   This function has the same effect as using the runtier option
   ":option:`mongodb --repair`," but only operates on the current
   database.

   This command provides a wrapper around the database command
   ":command:`repairDatabase`".

.. js:function:: db.resetError()

   Resets the error message returned by :js:func:`db.getPrevError` or
   :command:`getPrevError`. Provides a wrapper around the
   :command:`resetError` command.

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
   :command:`serverStatus`.

   .. seealso:: ":doc:`/reference/server-status`" for complete
      documentation of the output of this function.

.. js:function:: db.setProfilingLevel(level, [slowms])

   :param level: Specify a profiling level, see list of possible
                 values below.

   :param slowms: Optionally modify the threshold for a query or
                  operation to be considered "slow."

   Modifies the current :term:`database profiler` level. This allows
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
   :command:`profile`.

   The output of the database profiler is written to the
   ``system.profile`` collection.

.. js:function:: db.shutdownServer()

   Shuts down the current :option:`mongod` or :option:`mongos`
   process cleanly and safely.

   This function will fail if the current database *is not* the admin
   database.

   This command provides a wrapper around the :command:`shutdown`.

.. js:function:: db.stats(scale)

   :param optional scale: Specifies the scale to deliver
                          results. Unless specified, all data are
                          reported in bytes.

   :returns: A :term:`JSON document` that contains statistics
             reflecting the database system's state.

   This function provides a wrapper around the database command
   ":command:`dbstats`". The "``scale``" option allows you to
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

   :returns: A :term:`JSON document` containing statistics that
             reflecting the state of the specified collection.

   This function provides a wrapper around the database command
   :command:`collstats`. The "``scale``" option allows you to
   configure how the values of bytes are scaled. For example, specify
   a "``scale``" value of "``1024``" to display kilobytes rather than
   bytes.

   See the ":doc:`/reference/collection-statistics`" document for an
   overview of this output.

.. js:function:: db.version()

   :returns: The version of the :option:`mongod` instance.

.. js:function:: db.fsyncLock()

   Forces the database to flush all write operations to the disk and
   locks the database to prevent additional writes until the lock is
   released using the :js:func:`db.fsyncUnlock()` command.

   This command provides a simple wrapper around a
   :command:`fsync` database command with the following
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
   sharding technology and methods for creating :term:`shard clusters
   <shard cluster>`.

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
   :command:`addShard`.

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
   :command:`moveChunk`. In most circumstances, migration of
   chunks should be automatically handled by the :term:`balancer` and
   should *not* be called manually.

.. js:function:: sh.setBalancerState(state)

   :param boolean state: ``true`` enables the balancer if disabled,
                         and ``false`` disables the balancer.

   Enables or disables the :term:`balancer`. Use
   :js:func:`sh.getBalancerState()` to determine if the balancer is
   currently enabled or disabled and :js:func:`sh.isBalancerRunning()`
   to check its current state.

.. js:function:: sh.getBalancerState()

   :returns: boolean.

   ``sh.getBalancerState()`` returns true if the :term:`balancer` is
   enabled and false if the balancer is disabled. This does not
   reflect the current state of balancing operations: use
   :js:func:`sh.isBalancerRunning()` to check the balancer's current
   state.

.. js:function:: sh.isBalancerRunning()

   :returns: boolean.

   Returns true if the :term:`balancer` process is currently running
   and migrating chunks and false if the balancer process is not
   running. Use :js:func:`sh.getBalancerState()` to determine if the
   balancer is enabled or disabled.

.. js:function:: sh.status()

   :returns: a formatted report of the status of the :term:`shard
             cluster`, including data regarding the distribution of
             chunks.

.. js:function:: sh.help()

   :returns: a basic help text for all sharding related shell
             functions.

.. _replica-set-functions:

Replica Sets
~~~~~~~~~~~~

.. seealso:: ":doc:`/core/replication`" for more information regarding
   replication.

.. js:function:: rs.status()

   :returns: A :term:`JSON document` with status information.

   This output reflects the current status of the replica set, using
   data derived from the heartbeat packets sent by the other members
   of the replica set.

   This command provides a wrapper around the
   :command:`replSetGetStatus` :term:`database command`.

   .. seealso:: ":doc:`/reference/replica-status`" for documentation
                of this output.

.. js:function:: rs.initiate(configuration)

   :param JSON,optional configuration: A :term:`JSON document` that
                                       specifies the configuration of
                                       a replica set. If not
                                       specified, a default
                                       configuration is used.

   Initiates a replica set. Optionally takes a configuration argument
   in the form of a :term:`JSON document` that holds the configuration
   of a replica set. Consider the following model of the most basic
   configuration for a 3-member replica set: ::

          {
              _id : <setname>,
               members : [
                   {_id : 0, host : <host0>},
                   {_id : 1, host : <host1>},
                   {_id : 2, host : <host2>},
               ]
          }

   This function provides a wrapper around the
   ":command:`replSetInitiate`" :term:`database command`.

.. js:function:: rs.conf(configuration)

   :returns: a :term:`JSON document` that contains the current
             :term:`replica set` configuration object.

.. js:function:: rs.reconfig(configuration)

   :param JSON configuration: A :term:`JSON document` that specifies
                              the configuration of a replica set.

   Initializes a new :term:`replica set` configuration. This function
   will disconnect the shell briefly and forces a reconnection as the
   replica set renegotiates negotiates which node will be
   :term:`primary`. As a result, the shell will display an error even
   if this command succeeds.

   This function will overwrite the existing replica set
   configuration. Use :js:func:`rs.status()` to retrieve the current
   status, and consider the following procedure for modifying a

   This function provides a wrapper around the
   ":command:`replSetReconfig`" :term:`database command`.

.. js:function:: rs.add(host,configuration)

   Specify one of the following forms:

   :param string host: Specifies a host (and optionally port-number)
                       for a new host member for the replica set. This
                       host will be added with the default
                       configuration.

   :param JSON configuration: A :term:`JSON document` that specifies a
                              new replica set member, with a custom
                              configuration.

   Provides a simple method to add a member to an existing
   :term:`replica set`. You can specify new hosts in one of two ways:
   as a "hostname" with an optional port number to use the default
   configuration, or a as a JSON configuration object.

   This function will disconnect the shell briefly and forces a
   reconnection as the replica set renegotiates negotiates which node
   will be :term:`primary`. As a result, the shell will display an
   error even if this command succeeds.

   ``rs.add()`` provides a wrapper around some of the functionality of
   the ":command:`replSetReconfig`" :term:`database command`.

.. js:function:: rs.addArb(hostname)

   :param string host: Specifies a host (and optionally port-number)
                       for a arbiter member for the replica set.

   Adds a new :term:`arbiter` to an existing replica set.

   This function will disconnect the shell briefly and forces a
   reconnection as the replica set renegotiates negotiates which node
   will be :term:`primary`. As a result, the shell will display an
   error even if this command succeeds.

.. js:function:: rs.stepDown(seconds)

   :param init seconds: Specify the duration of this operation. If not
                        specified the command uses the default value
                        of 60 seconds.

   :returns: disconnects shell.

   Forces the current replica set member to step down as
   :term:`primary` and then attempt to avoid election as primary for
   the designated number of seconds. Produces an error if the current
   node is not primary.

   This function will disconnect the shell briefly and forces a
   reconnection as the :term:`replica set` renegotiates which node
   will be :term:`primary`. As a result, the shell will display an
   error even if this command succeeds.

   ``rs.step()`` provides a wrapper around the :term:`database
   command` :command:`replSetStepDown`.

.. js:function:: rs.freeze(seconds)

   :param init seconds: Specify the duration of this operation.

   Forces the current node to become ineligible to become primary for
   the period specified.

   ``rs.freeze()`` provides a wrapper around the :term:`database
   command` :command:`replSetFreeze`.

.. js:function:: rs.remove(hostname)

   :param hostname: Specify one of the existing hosts to remove from
                    the current replica set.

   Removes the node described by the "``hostname`` parameter from the
   current :term:`replica set`. This function will disconnect the
   shell briefly and forces a reconnection as the :term:`replica set`
   renegotiates negotiates which node will be :term:`primary`. As a
   result, the shell will display an error even if this command
   succeeds.

.. js:function:: rs.slaveOk()

   Provides a shorthand for :js:func:`db.getMongo().setSlaveOK()`,
   which allows the current connection to allow read operations to run
   on :term:`secondary` nodes.

.. js:function:: db.isMaster()

   Returns a status document with fields that includes the
   "``ismaster`` field that reports if the current node is the
   :term:`primary` node, as well as a report of the current
   replication configuration.

   This function provides a wrapper around the :term:`database
   command` :command:`isMaster`

.. js:function:: rs.help()

   Returns a basic help text for all of the :doc:`replication
   </core/replication>` related shell functions.

Native Shell Functions
----------------------

These functions provide a number of low level and internal functions
that may be useful in the context of some advanced operations in the
shell. The JavaScript standard library is accessible in the
:program:`mongo` shell.

User Functions
--------------

.. js:function:: load("file")

   :para string file: Specify a path and file name containing
                      JavaScript.

   This native function loads and runs a JavaScript file into the
   current shell environment. To run JavaScript with the mongo shell,
   you can either:

   - use the ":option:`--eval <mongo --eval>`" option when invoking
     the shell to evaluate a small amount of JavaScript code, or

   - specify a file name with ":ref:`mongo <mongo-shell-file>`".
     :option:`mongo` will execute the script and then exit. Add the
     :option:`--shell <mongo --shell>` option to return to the shell after
     running the command.

   Files loaded with the ``load()`` function are specified relative to
   the directory context of the current :option:`mongo` shell
   session. Check this context with the ":js:func:`pwd()`" function.

.. js:function:: quit()

   Exits the current shell session.

.. js:function:: getMemInfo()

   Returns a document with two fields that report the amount of memory
   used by the shell process. The fields returned are :term:`resident
   <resident memory>` and :term:`virtual <virtual memory>`.

TODO confirm that it it's the shell process. as values don't match serverStatus()

.. js:function:: _srand()

   For internal use.

   .. I can't get this function to work, but it's imported in the source. -sk

.. js:function:: _rand()

   :returns: A random number between ``0`` and ``1``.

   This function provides functionality similar to the
   "``Math.rand()``" function from the standard library.

.. js:function:: _isWindows()

   :returns: boolean.

   Returns "true" if the server is running on a system that is
   Windows, or "false"  if the server is running on a Unix or Linux
   systems.

.. js:function:: ls()

   Returns a list of the files in the current directory.

   This function returns with output relative to the current shell
   session, and does not impact the server.

.. js:function:: pwd()

   Returns the current directory.

   This function returns with output relative to the current shell
   session, and does not impact the server.

.. js:function:: cd("path")

   :param string file: Specify a path on the local file system.

   Changes the current context to the specified path.

   This function returns with output relative to the current shell
   session, and does not impact the server.

   .. note:: This feature is not yet implemented.

.. js:function:: cat("filename")

   :param string filename: Specify a path and file name on the local file
                          system.

   Returns the contents of the specified file.

   This function returns with output relative to the current shell
   session, and does not impact the server.

.. js:function:: md5sumFile("filename")

   :param string filename: a file name.

   :returns: The :term:`md5` hash of the specified file.

   .. note:: The specified filename must refer to a file located on
             the system running the :option:`mongo` shell.

.. js:function:: mkdir("path")

   :param string path: A path on the local filesystem.

   Creates a directory at the specified path. This command will create
   the entire path specified, if the enclosing directory or
   directories do not already exit.

   Equivalent to :option:`mkdir -p` with BSD or GNU utilities.

.. js:function:: hostname()

   :returns: The hostname of the system running the :option:`mongo`
              shell process.

.. js:function:: getHostName()

   :returns: The hostname of the system running the :option:`mongo`
             shell process.

.. js:function:: removeFile("filename")

   :param string filename: Specify a filename or path to a local
                           file.

   :returns: boolean.

   Removes the specified file from the local file system.

.. js:function:: fuzzFile("filename")

   :param string filename: Specify a filename or path to a local
                           file.

   :returns: null

   For internal use.

.. js:function:: listFiles()

   Returns an array, containing one document per object in the
   directory. This function operates in the context of the
   :option:`mongo` process. The included fields are:

   .. describe:: name

      Returns a string which contains the name of the object.

   .. describe:: isDirectory

      Returns true or false if the object is a directory.

   .. describe:: size

      Returns the size of the object in bytes. This field is only
      present for files.

Internal Functions
~~~~~~~~~~~~~~~~~~

These functions are accessible in the shell but exist to support other
functionality in the environment. Do not call these functions
directly.

.. js:function:: _startMognoProgram()

   For internal use.

.. js:function:: runProgram()

   For internal use.

.. js:function:: run()

   For internal use.

.. js:function:: runMongoProgram()

   For internal use.

.. js:function:: stopMongod()

   For internal use.

.. js:function:: stopMongoProgram()

   For internal use.

.. js:function:: stopMongoProgramByPid()

   For internal use.

.. js:function:: rawMongoProgramOutput()

   For internal use.

.. js:function:: clearRawMongoProgramOutput()

   For internal use.

.. js:function:: waitProgram()

   For internal use.

.. js:function:: waitMongoProgramOnPort()

   For internal use.

.. js:function:: resetDbpath()

   For internal use.

.. js:function:: copyDbpath()

   For internal use.
