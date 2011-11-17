====================
JavaScript Interface
====================

.. highlight_language: javascript
.. highlight:: javascript

Data Manipulation
-----------------

Query and Update Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. js:function:: find()

   Provides access to querying functionality. The argument to
   ``find()`` takes the form of a :term:`JSON` document. See the
   ":doc:`/reference/operators`" for an overview of the available
   operators to provide query functionality.

.. js:function:: findOne()

   Returns only one document that satisfies the query specified as the
   argent to this function. If there are multiple documents that
   satisfy the query, this method returns the first document according
   to the :term:`natural order`.

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
    maximum document count. Documents will be truncated if a
    collection reaches the maximum size limit before the maximum
    document count, documents will be truncated. Consider the
    following example: ::

        db..createCollection(log, { size : 5120, capped : true, max : 5000 } )

    This command creates a collection named log with a maximum size of
    5 megabytes (5120 bytes,) or a maximum of 5000 documents.

    This command provides a wrapper around the database command
    ":mongodb:command:`create`. See the ":doc:`capped-collections`"
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

   :param JavaScript function:
   :param arguments:

.. js:function:: db.getCollection()

   db.getCollection(cname) same as db['cname'] or db.cname

.. js:function:: db.getCollectionNames()

.. js:function:: db.getLastError()

   just returns the err msg string

.. js:function:: db.getLastErrorObj()

   return full status object

.. js:function:: db.getMongo()

   get the server connection object

.. js:function:: db.getMongo().setSlaveOk()

   allow this connection to read from the nonmaster member of a replica pair

.. js:function:: db.getName()

.. js:function:: db.getPrevError()

.. js:function:: db.getProfilingLevel()

   deprecated

.. js:function:: db.getProfilingStatus()

   returns if profiling is on and slow threshold

.. js:function:: db.getReplicationInfo()

.. js:function:: db.getSiblingDB()

   db.getSiblingDB(name) get the db at the same server as this one

.. js:function:: db.killOP()

   db.killOp(opid) kills the current operation in the db.

.. js:function:: db.listCommands()

   lists all the db commands

.. js:function:: db.logout()

.. js:function:: db.printCollectionStats()

.. js:function:: db.printReplicationInfo()

.. js:function:: db.printSlaveReplicationInfo()

.. js:function:: db.printShardingStatus()

.. js:function:: db.removeUser()

   db.removeUser(username)

.. js:function:: db.repairDatabase()

.. js:function:: db.resetError()

.. js:function:: db.runCommand()

   db.runCommand(cmdObj) run a database command.  if cmdObj is a string, turns it into { cmdObj : 1 }

.. js:function:: db.serverStatus()

.. js:function:: db.setProfilingLevel()

   db.setProfilingLevel(level,<slowms>) 0=off 1=slow 2=all

.. js:function:: db.shutdownServer()

.. js:function:: db.stats()

.. js:function:: db.version()

   current version of the server

.. js:function:: db.fsyncLock()

   flush data to disk and lock server for backups

.. js:function:: db.fsyncUnock()

   unlocks server following a db.fsyncLock()


Sharding
~~~~~~~~

.. js:function:: sh.addShard()

   sh.addShard( host )                       server:port OR setname/server:port

.. js:function:: sh.enableSharding()

   sh.enableSharding(dbname)                 enables sharding on the database dbname

.. js:function:: sh.shardCollection()

   sh.shardCollection(fullName,key,unique)   shards the collection

.. js:function:: sh.splitFind()

   sh.splitFind(fullName,find)               splits the chunk that find is in at the median

.. js:function:: sh.splitAt()

   sh.splitAt(fullName,middle)               splits the chunk that middle is in at middle

.. js:function:: sh.moveChunk()

   sh.moveChunk(fullName,find,to)            move the chunk where 'find' is to 'to' (name of shard)

.. js:function:: sh.setBalancerState()

   sh.setBalancerState( <bool on or not> )   turns the balancer on or off true=on, false=off

.. js:function:: sh.getBalancerState()

   sh.getBalancerState()                     return true if on, off if not

.. js:function:: sh.isBalancerRunning()

   sh.isBalancerRunning()                    return true if the balancer is running on any mongos

.. js:function:: sh.status()

   sh.status()                               prints a general overview of the cluster

Replica Sets
~~~~~~~~~~~~

.. js:function:: rs.help()

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


