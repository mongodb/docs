========
Glossary
========

.. glossary::
   :sorted:

   BSON
      Binary JSON. BSON is MongoDB's internal representation format
      and wire-trasmission format. For more information see
      `bsonspec.org <http://bsonspec.org/>`_.

   database command
      MongoDB has database commands, which have a specific
      implementation, and allow you to control the database.

      .. seealso:: ":doc:`/reference/commands`."

   operator
      Operators provide tools for querying and manipulating
      documents. See the ":doc:`/reference/operators`" for more
      information about the available operators.

      .. seealso:: ":doc:`/reference/operators`."

   MongoDB
      A document-driven database.

   document
      A record in a MongoDB database. Documents are analogous to, but
      more flexible than, a row in relational databases. Documents
      contain a number of :term:`fields <field>`, and are members of
      :term:`collections <collection>`.

   field
      A value or item in a :term:`document`. Documents have one
      or more fields. Fields are analogous to, but more flexible than,
      columns in relational databases.

   database
      Each database is stored in a unique file on the file
      system. Databases contain a number of :term:`collections
      <collection>`.

   collection
      A group of :term:`document`. Collections are analogous to, but
      more flexible than, tables in relational databases. A
      :term:`database` contains a number of commands .

   Map/Reduce
      A data processing paradigm formalized at Google.

   $cmd
      This is the special :term:`collection` used to :term:`MongoDB`
      to implement database commands.

   JSON
      JavaScript Object Notation. A format for expressing structured
      data in human readable plain text.

   JSON document
      :term:`JSON` documents are collections of fields and values in a
      structured format. JSON documents are enclosed in "curly braces."

   Admin Database
      The administration database is a privileged database named
      "``admin``" that is used to provide special administrative
      functionality. See :doc:`commands` for more information on these
      commands.

   replica set
      A MongoDB feature whereby a collection of hosts can, as a database
      cluster, provide replication while allowing the "master"
      instance to automatically reassign itself based on the cluster
      conditions.

      .. seealso:: :term:`replication`, ":doc:`/replication`" and
         ":doc:`/core/replication`."

   Replication
     A database architecture where the data corpus is duplicated on a
     number of machines to provide redundancy and load
     distribution. See also :term:`sharding` and :term:`Replica set`.

      .. seealso:: :term:`replica set`, ":doc:`/replication`." and
         ":doc:`/core/replication`."

   Shard
      A for a :term:`mongod` instance that only stores a portion of
      the total dataset corpus as part of a :term:`cluster`. See
      :term:`sharding`.

      .. seealso:: ":doc:`/core/sharding`."

   Sharding
      A database architecture where the data corpus is split among
      a cluster of system to enable horizontal scaling. MongoDB added
      support for automatic shading in version 1.6 (TODO) See
      :term:`shard`.

      .. seealso:: ":doc:`/core/sharding`."

   shard cluster
      A collection of MongoDB instances with a dataset partitioned
      or ":term:`sharded <sharding>`" among a set of nodes.

      .. seealso:: ":doc:`/core/sharding`."

   mongod
      :option:`mongod` is the :term:`daemon` that runs MongoDB database
      instances.

      .. seealso:: ":doc:`/reference/mongod`."

   mongos
      ``mongos`` is a routing and load balancing process that provides
      an interface between an application and ``mongod`` instances in
      a :term:`shard cluster`. See ":doc:`/reference/mongos`" for more
      information.

      .. seealso:: ":doc:`/reference/mongos`."

   mongo
      The MongoDB Shell. Mongo connects to the :term:`mongod`
      database and provides an interface for administration,
      management, and testing. ``mongo`` uses complete JavaScript
      interface.

      .. seealso:: ":doc:`/reference/mongo`" and
         ":doc:`/reference/javascript`."

   SQL
      Standard Query Language. This is the standard method for
      querying and interacting with relational databases. Often SQL is
      a metonym for relational databases.

   Cluster
      Clusters are groups of :option:`mongod` instances running in
      conjunction to increase database availability and
      performance. See :term:`sharding` and :term:`replication` for
      more information on two different approaches to clustering with
      MongoDB.

      Typically groups of replicating nodes are "*set*" while
      "*cluster*" refers primarily to :term:`sharding`.

   Polygon
      MongoDB's :term:`geospatial` indexes and querying system
      provides the ability to build queries around multi-sided
      polygons on 2 dimensional coordinate systems. These queries use
      the ``$within`` operator and a sequence of points that define
      the corners of the polygon. MongoDB assumes that the first point
      is connected to the last.

   Circle
      MongoDB's :term:`geospatial` indexes and querying system
      provides the ability to build queries around circles on 2
      dimensional coordinate systems. These queries use the ``$circle``
      operator to define circle using the center and the radius of the
      circle.

   Box
      MongoDB's :term:`geospatial` indexes and querying system
      provides the ability to build queries around rectangles on 2
      dimensional coordinate systems. These queries use the ``$box``
      operator to define a shape using the lower-left and the upper
      right coordinates.

   capped collection
      Capped collections, are :term:`collections <collection>` that
      have a maximum size, and an (optional) maximum number of
      documents. These collections are used to prevent collections
      from growing out of control and are useful in the context of
      logging or caching functions.

      .. seealso:: ":doc:`/core/capped-collections`."

   BSON types
      BSON objects are typed. The following types are available:

      =======================  ==========
      **Type**                 **Number**
      -----------------------  ----------
      Double                       1
      String                       2
      Object                       3
      Array                        4
      Binary data                  5
      Object id                    7
      Boolean                      8
      Date                         9
      Null                        10
      Regular Expression          11
      JavaScript                  13
      Symbol                      14
      JavaScript (with scope)     15
      32-bit integer              16
      Timestamp                   17
      64-bit integer              18
      Min key                    255
      Max key                    127
      =======================  ==========

   Master
      In conventional master/:term:`slave` replication, all writes
      are sent to the master database which ensures consistency. The
      entire contents of the master instance are replicated to the
      slave instance.

   Slave
      In conventional :term:`master`/slave replication, the contents
      of the database are replicated on the secondary database. Read
      operations can be directed at the slave database, but all write
      operations must be directed to the master database.

   Primary
      In a :term:`replica set` the primary node is the current
      ":term:`master`," of the set that receives write operations and
      ensures that the set maintains a consistent state. These nodes
      can assume :term:`secondary` status at a later point.

   Secondary
      In a :term:`replica set` the secondary nodes are the current
      :term:`slave` instances that replicate the content of the
      database and may assume :term:`primary` status at a later
      point. Secondary nodes can handle read requests, but all write
      operations are handled by the primary node.

   GridFS
      A method for storing files in a MongoDB database that exceed the
      16 megabyte limit for :term:`BSON` objects.

   md5
      ``md5`` is a hashing algorithm used to efficiently provide
      reproducible unique strings to identify and :term:`checksum`
      data. MongoDB uses md5 to identify chunks of data for
      :term:`GridFS`.

   shell helper
      A number of :doc:`database commands <commands>` have "helper"
      methods in the ``mongo`` shell that provide a more concise
      syntax and improve the general interactive experience.

      .. seealso:: ":doc:`/reference/mongo`" and
         ":doc:`/reference/javascript`."

   write-lock
      When a process needs to write to the database, a write-lock is
      used to prevent other processes from reading or producing an
      inconsistent state. These operations are typically very
      short-lived, but prevent all other operations from succeeding.

   indexes
      Indexes provide the database with a fast and reliable way of
      accessing data without requiring full searches on data.

   btree
      btree's are a fast data representation that provides for
      efficient writing and reading binary data. MongoDB uses b-trees
      for data storage.

   ISODate
      The standard date representation in database fields. MongoDB's
      date type derives from the JavaScript date representation.

   journaling
      MongoDB's journal provides a transnational log that provides
      durability for database operations. When using the journal, all
      data is written to disk in at least two locations, and items are
      logged to the journal *much* more frequently than the state of
      the database is flushed to the disk. The journal can thus be
      used to recover the state of the database in the event of system
      failure or glitch.

      .. seealso:: ":doc:`/core/journaling`."

   pcap
      A packet capture format used by a number of tools to record
      packets captured from network interfaces. Used by
      :option:`mongosniff`.

   upsert
      A method of inserting a document into a MongoDB database that,
      optionally updates the values of an existing document if a
      matching document already exists.

   csv
      Comma Separated Values. A common structured data storage format
      used for inter-application interchange purposes.

   tsv
      Tab Separated Values. A common structured data storage format
      used for inter-application interchange purposes.

   mime
      "Multipurpose Internet Mail Extensions." a standard set of type
      and encoding definitions used to declare the encoding and type
      of data in multiple data storage, transmission and email
      contexts.

   padding factor
      MongoDB adds a configurable amount of space to the end of each
      document to facilitate faster updates if documents grow.

   lock
      An approach to concurrency where a single process or thread
      prevents sibling process from accessing or changing a value
      until the original process or thread has completed its
      operation.

   Global Lock
      A :term:`lock` that prevents all other operations for the
      duration of its existence.

   read-lock
      A :term:`lock` that prevents write operations while a read
      operation is in progress.

   configdb
      A special database instance used by MongoDB to track data
      and its relationship to specific instances in a :term:`shard
      cluster`.

   balancer
      An internal MongoDB process that runs in the context of a
      :term:`shard cluster` that distributes :term:`chunks <chunk>` of
      data amongst the shards.

   fsync
      An operation that ensures that all data has been written to data
      files to ensure that the data is durable.

   chunk
      In the context of a :term:`shard` cluster, chunks are contiguous
      (relative to their :term:`shard key`) sections of data that are
      distributed evenly among shards. In the default configuration
      chunks are 64 megabytes or less.

   geospatial
      Data that relates to geographical location. Geospatial data may
      be indexed according to geographical parameters, reference
      specific coordinates, or simply describe geographical locations
      Geospatial indexes use a coordinate system.

   checksum
      Checksums are used to ensure data integrity, by providing a
      reliable fixed sequence calculated from a set of data that is
      easily affected by even small changes in the
      document. :term:`md5` is an example of a checksum.

   haystack index
      In the context of :term:`geospatial` queries, haystack indexes
      are useful for providing a more limited searches by creating a
      "buckets," of objects within a smaller geographical
      area. Haystack indexes are ideal for finding a number of objects
      near a particular set of coordinates, but not finding a single
      object that's closest to another object, if the distance between
      the two objects is greater than the size of the bucket.

   oplog
      A special :term:`capped collection` that stores database
      operations to facilitate :term:`replication` in the context of a
      :term:`replica set`.

   control script
      A simple shell script, typically located in the ``/etc/rc.d`` or
      ``/etc/init.d`` directory and used by the system's initialization
      process to start, stop and stop a :term:`daemon` process.

   daemon
      The conventional name for a background, non-interactive
      process.

   pid
      The process ID, on Unix-like systems. This number can be used to
      find and identify currently running :term:`daemon` processes.

   config database
      The database that contains the map of database objects to
      location in a :term:`shard cluster`.

   JSONP
      :term:`JSON` with Padding. Refers to a method of injecting JSON
      into applications. Presents potential security concerns.

   REST
      Representational State Transfer. Describes a distributed
      paradigm for client-server applications, which influenced the
      design of the HTTP protocol. In recent usage REST has come to
      represent protocols and interface that make use of the HTTP
      protocol and adhere to the HTTP idiom.

   dbpath
      Refers to the location of MongoDB's data file storage. Typically
      these files are stored in ``/srv/mongodb`` or
      ``/var/lib/mongodb``.

      .. seealso:: ":mongodb:setting:`dbpath`" or ":option:`--dbpath
         <mongod --dbpath>`."

   setname
      In the context of :term:`replica set`, the ``setname`` refers to
      the configured

      .. seealso:: :term:`replication`, ":doc:`/replication`" and
         ":doc:`/core/replication`."

   _id
      The unique identifier for each identifier. This value is
      automatically assigned and included in the document. This
      analogous to the :term:`primary key` in the context of MongoDB.

   lvm
      Logical volume manager. LVM is a method of abstracting disk
      images from physical devices, and provides a number of raw disk
      manipulation and snapshot capabilities useful for system
      management.

   natural order
      This refers to the order that MongoDB stores documents in the
      database. Typically this order is nearly the same as the
      insertion order, but this order is not guaranteed, except in the
      case of :term:`capped collections <capped collection>`.

   primary key
      In relational databases, primary keys are guaranteed to be unique
      identifiers for a specific data instance: for each row in a
      relational table, or for each document in a MongoDB document.

   firewall
      A system level networking filter that limits higher-level
      applications and servers from accessing larger networks and
      interfaces. Firewalls are part of effective network security
      strategy.

   database profiler
      A diagnostic system used to analyze database performance and
      used to help optimize queries.

   shard key
      The unique key used to distribute documents among members of the
      :term:`shard cluster`.

   query
      Queries are requests that return a selection of documents from
      the database system. For MongoDB, queries are specified using
      :term:`JSON` documents and the :term:`database operators
      <operator>` to describe documents. In the :option:`mongo`
      shell, queries are issued using the :js:func:`find()` and
      :js:func:`findOne()` functions.

   projection
      A component of complex queries that controls the content that a
      a :term:`query` returns, in cases when the entire contents of a
      :term:`document` is not required.

   pre-splitting
      When deploying a :term:`shard cluster`, it is sometimes
      necessary to expedite the initial distribution of documents
      among shards. This process is referred to as "pre-splitting."

   SSD
      Solid State Disk. A modern alternative to a disk with rotating
      platters, SSDs offer high performance read and write
      performance.

   resident memory
      An application's working memory that is currently stored in the
      system's RAM.

   virtual memory
      An application's working memory or data that has been moved out
      of RAM, which is fast and in limited supply, and into a
      disk-based cache, which is slower but in comparatively unlimited
      supply.

   piped
      Directed through a UNIX pipe. In these operations the output of
      one operation or command is directed to the input of next.

   IPv6
      A revision to the IP (Internet Protocol) standard that, among
      many features, provides a significantly larger address space to
      more effectively support the number of hosts on the contemporary
      internet.

   draining
      The process of removing, or "shedding" :term:`chunks <chunk>`
      from one :term:`shard` to another. Shards must be drained before
      they can be removed from the cluster.

      .. seealso:: :mongodb:command:`removeshard``

   single master replication
      A :term:`replication` method where only a single database
      instance can accept write operations and act as
      ":term:`primary`" or ":term:`master` at any given moment. Single
      master replication ensures data set consistency. This is the
      kind of replication that MongoDB uses.

   multi-master replication
      A :term:`replication` method where multiple database instances
      can accept write operations to the same data set at a
      time. While this approach promises significant potential in
      terms of increased concurrency, it necessarily produces
      significant challenges in terms of data consistency and
      integrity.

   rollback
      An operation where the data set revers cleanly to a previous
      state if an update occurred in error.

   consistency
      The condition "up to date," and reliable quality of a database
      system with multiple nodes and multiple instances of the same
      data. A system may be ":term:`eventually consistent <eventual
      consistency>`," with write or update operations returning
      successfully before all copies of the data are in a consistent
      state, or ":term:`strictly consistent <strict consistency>`,"
      with no write or update operations returning before all copies of
      the data are in a consistent state.

   eventual consistency
      The :term:`consistency` condition which allows write or update
      operations to succeed before the data set has reached a
      consistent state. This typically applies to data sets that are
      replicated on multiple systems, but can also refer to the
      consistency of the on-disk representation of the data set.

   strict consistency
      The :term:`consistency` condition which ensures that write or
      update operations *do not* succeed before the data set has
      reached a consistent state. This typically applies to data sets
      that are replicated on multiple systems, but can also refer to
      the consistency of the on-disk representation of the data set.

   write propagation
      The process by which updates are passed from the primary node to
      the :term:`secondary` members of the replica set. Write
      propagation is a concern when distributing read operations to
      secondary nodes that are :term:`eventually consistent <eventual
      consistency>` with the primary.

      .. seealso:: ":ref:`Write Propagation for Replica Sets
         <replica-set-write-propagation>`."

   priority
      In the context of :term:`replica sets <replica set>`, priority
      refers to the setting that administrators can use to control the
      preference with which nodes will be elected to primary status.

      .. seealso:: ":ref:`Replica Set Node Priority
         <replica-set-node-priority>`"

   election
      In the context of :term:`replica sets <replica set>`, election
      refers to the process by which members of a replica set select
      primary nodes in response to network availability and node
      capability.

      .. seealso:: ":ref:`Replica Set Elections
         <replica-set-elections>`" and ":term:`priority`."

   hidden node
      A member of a :term:`replica set` that cannot become primary and
      is not advertised as part of the set in the :term:`database
      command` :mongodb:command:`isMaster`, which prevents it from
      receiving read-only queries depending on :term:`read
      preference`.

      .. seealso:: ":ref:`Hidden Nodes <replica-set-hidden-nodes>`,"
         and :js:data:`member.hidden`.

   delayed node
      A member of a :term:`replica set` that cannot become primary and
      applies operations at a specified delay. This delay is useful
      for protecting data from human error (i.e. unintentionally
      deleted databases) or updates that have unforeseen effects on
      the production database.

      .. seealso:: ":ref:`Delayed Nodes <replica-set-delayed-nodes>`"

   arbiter
      A member of a :term:`replica set` that does not hold a copy of
      the data and only votes in elections.

      .. seealso:: ":ref:`Delayed Nodes <replica-set-delayed-nodes>`"

   read preference
      Describes the behavior of a :term:`replica set` to past some
      queries to :term:`secondary` nodes when possible to distribute
      load from the :term:`primary` node. Read preference and
      :term:`write propagation` combine to determine the level of
      set-wide :term:`consistency`.

      .. seealso:: ":ref:`Read Preference <replica-set-read-preference>`"

   replication lag
      The length of time between the last operation in the operation
      log, and the last operation applied to a particular
      :term:`secondary` or :term:`slave` database. High replication
      lag makes a non-:term:`primary` node ineligible to be elected
      primary.

   driver
      Drivers provide an interface level between the :term:`MongoDB`
      database system and client applications. Drivers are language
      specific and provide a language-idiomatic method for interfacing
      with data from MongoDB.

   client
      The application layer that uses a database for data persistence
      and storage. :term:`Drivers <driver>` provide the interface
      level between the application layer and the database level.

   failover
      The process that allows one of the :term:`secondary` nodes in a
      :term:`replica set` to become :term:`primary` in the event of
      some operational disturbance.

      .. seealso:: ":ref:`Replica Set Failover <replica-set-failover>`."

   data center awareness
      The facility to manage :term:`replica sets <replica set>` or
      :term:`shard clusters <shard cluster>` an awareness of the
      infrastructure (e.g. data center, rack, network up-link, storage
      array) that hosts the database instance.

      .. seealso:: ":js:data:`members.tags`" and ":ref:`data center awareness
         <replica-set-data-center-awareness>`."

   recovering
      A :term:`replica set` status, that reflects nodes which are in
      the process of synchronizing or re-synchronizing their data
      collection, before becoming proper :term:`secondary` nodes.
