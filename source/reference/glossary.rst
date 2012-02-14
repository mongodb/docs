========
Glossary
========

.. default-domain:: mongodb

.. glossary::
   :sorted:

   BSON
      Binary JSON. BSON is MongoDB's internal representation format
      and wire-trasmission format. For more information see
      `bsonspec.org <http://bsonspec.org/>`_.

   database command
      Database commands are a special type of operation within MongoDB
      that make it possible to interact with the database system
      directly. MongoDB implements database commands as a form of
      query against the special ":term:`$cmd`" collection. These
      commands provide a number of administrative and other special
      operations.

      .. seealso:: ":doc:`/reference/commands`" for a

   operator
      Operators provide tools for querying and manipulating
      documents. See the ":doc:`/reference/operators`" for more
      information about the available operators.

      .. seealso:: ":doc:`/reference/operators`."

   MongoDB
      A document-driven database documented in this manual.

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
      Each database resides in a unique file on the file
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
      to implement :term:`database commands <database command>`.

   JSON
      JavaScript Object Notation. A format for expressing structured
      data in human readable plain text.

   JSON document
      :term:`JSON` documents are collections of fields and values in a
      structured format. JSON encloses documents in "curly braces."

   Admin Database
      The administration database is a privileged database named
      "``admin``", which provide special administrative
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
     A database architecture that replicates the data corpus on a
     number of machines to provide redundancy and load
     distribution.

      .. seealso:: :term:`replica set`, :term:`sharding`,
         ":doc:`/replication`." and ":doc:`/core/replication`."

   Shard
      A for a :term:`mongod` instance that only stores a portion of
      the total dataset corpus as part of a :term:`cluster`. See
      :term:`sharding`.

      .. seealso:: ":doc:`/core/sharding`."

   Sharding
      A database architecture that splist the data corpus among
      a cluster of system to enable horizontal scaling. MongoDB added
      support for automatic shading in version 1.6 See :term:`shard`.

      .. seealso:: ":doc:`/core/sharding`."

   shard cluster
      A collection of MongoDB instances with a dataset partitioned
      or ":term:`sharded <sharding>`" among a set of instances.

      .. seealso:: ":doc:`/core/sharding`."

   partition
      A distributed system architecture that splits resources
      (i.e. the entire contents of a database between a number of
      independent systems. :term:`Sharding` is an example of
      partitioning.

   mongod
      :program:`mongod` is the :term:`daemon` that runs MongoDB database
      instances.

      .. seealso:: ":doc:`/reference/mongod`."

   mongos
      :program:`mongos` is a routing and load balancing process that
      provides an interface between an application and
      :program:`mongod` instances in a :term:`shard cluster`. See
      ":doc:`/reference/mongos`" for more information.

      .. seealso:: ":doc:`/reference/mongos`."

   mongo
      The MongoDB Shell. Mongo connects to the :program:`mongod`
      database and provides an interface for administration,
      management, and testing. :program:`mongo` uses complete JavaScript
      interface.

      .. seealso:: ":doc:`/reference/mongo`" and
         ":doc:`/reference/javascript`."

   SQL
      Standard Query Language. This is the standard method for
      querying and interacting with relational databases. Often SQL is
      a metonym for relational databases.

   Cluster
      Clusters are groups of :program:`mongod` instances running in
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
      the :operator:`$within` operator and a sequence of points that define
      the corners of the polygon. MongoDB assumes the connection
      between the first and last point.

   Circle
      MongoDB's :term:`geospatial` indexes and querying system
      provides the ability to build queries around circles on 2
      dimensional coordinate systems. These queries use the
      :operator:`$circle` operator to define circle using the center
      and the radius of the circle.

   Box
      MongoDB's :term:`geospatial` indexes and querying system
      provides the ability to build queries around rectangles on 2
      dimensional coordinate systems. These queries use the :operator:`$box`
      operator to define a shape using the lower-left and the upper
      right coordinates.

   capped collection
      Capped collections, are :term:`collections <collection>` that
      have a maximum size, and an (optional) maximum number of
      documents. These kinds of collections prevent collections
      from growing out of control and are useful in the context of
      logging or caching functions.

      .. seealso:: ":doc:`/core/capped-collections`."

   BSON types
      BSON types describe the kind of data encoded in the objects
      themselves. The following types are available:

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
      In conventional master/:term:`slave` replication, the master
      database receives all writes, which ensures consistency. The
      slave instances replicate the entire contents of the master
      instance.

   Slave
      In conventional :term:`master`/slave replication, the slave
      instances replicate operations from the master database. While,
      clients and applications can read from slave databases, they
      must direct all write operations to the master database. Data
      read from slave instances may not be consistent with the master,
      depending on the database's consistency pattern.

   Primary
      In a :term:`replica set` the primary member is the current
      ":term:`master`," of the set that receives write operations and
      ensures that the set maintains a consistent state. These instances
      can assume :term:`secondary` status at a later point.

   Secondary
      In a :term:`replica set` the secondary members are the current
      :term:`slave` instances that replicate the content of the
      database and may assume :term:`primary` status at a later
      point. Secondary members may handle read requests, but only the
      :term:`primary` members can handle write operations.

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
      When a process writes to the database, a it takes a write-lock
      to  prevent other processes from writing or reading, which would
      produce an inconsistent state. These operations are typically
      very short-lived, but block all other operations while active.

   index
      Indexes provide the database with a fast and reliable way of
      accessing data without requiring full reads of all data in a
      collection.

      .. seealso:: ":doc:`/core/indexing`"

   compound index
      An :term:`index` that contains more than one key, and may more
      effectively support a number of different queries.

      .. seealso:: ":doc:`/core/indexing`"

   btree
      btree's provide a very efficient data representation that
      provides for efficient writing and reading binary data. MongoDB
      uses b-trees for indexes.

   ISODate
      The standard date representation fields that hold data of the
      date type.

   journaling
      MongoDB's journal provides a transnational log that
      provides durability for database operations. When using the
      journal, MongoDB writes all data to disk both in the journal and
      in the database. MongoDB writes operations to the journal *much*
      more frequently it flushes the state of the database to the
      disk. The journal makes it possible to recover the state of the
      database in the event of system failure or other non-clean
      shutdown without data corruption.

      .. seealso:: ":doc:`/core/journaling`."

   pcap
      A packet capture format used by a number of tools to record
      packets captured from network interfaces. Used by
      :program:`mongosniff` in the MongoDB package as well as a
      variety of other programs.

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
      An operation that ensures that flushes all data to disk to
      ensure that the data is durable.

   chunk
      In the context of a :term:`shard cluster`, chunks are contiguous
      (relative to their :term:`shard key`) sections of data. Sharding
      distributes these chunks evenly among shards. In the default
      configuration chunks are 64 megabytes or less.

   geospatial
      Data that relates to geographical location. In MongoDB, you may
      index or store geospatial data according to geographical
      parameters and reference specific coordinates in queries.

   checksum
      Checksums ensure data integrity, by providing a reliable fixed
      sequence calculated from a set of data that is easily affected
      by even small changes in the document. :term:`md5` is an example
      of a checksum.

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

      .. seealso:: ":ref:`Oplog Sizes <replica-set-oplog-sizing>`" and
         ":doc:`/tutorial/change-oplog-size`."

   control script
      A simple shell script, typically located in the ``/etc/rc.d`` or
      ``/etc/init.d`` directory and used by the system's initialization
      process to start, stop and stop a :term:`daemon` process.

   daemon
      The conventional name for a background, non-interactive
      process.

   pid
      The process ID, on Unix-like systems. This number makes it
      possible to find and identify running :term:`daemon` processes.

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
      Refers to the location of MongoDB's data file storage. The
      default :setting:`dbpath` is ``/data/db``. Though some users may
      store data files in ``/srv/mongodb`` or ``/var/lib/mongodb``.

      .. seealso:: ":setting:`dbpath`" or ":option:`--dbpath
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
      Relational databases use primary keys to guarantee unique
      identifiers for a specific data instance: for each row in a
      relational table. In MongoDB, :term:`unique indexes <unique
      index>` can enforce uniqueness for a field. :term:`_id` is an
      example of a primary key.

   unique index
      An index that enforces uniqueness, to guarantee that only one
      document within the indexed collection has any particular
      key. Unique indexes prevent write operations that would cause
      a collision.

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
      the database system. Specify MongoDB, queries using :term:`JSON`
      documents and the :term:`database operators <operator>` to
      describe documents. In the :program:`mongo` shell, issue queries
      using the :func:`find()` and :func:`findOne()` functions.

   projection
      A component of complex queries that controls the content that a
      a :term:`query` returns, in cases when the entire contents of a
      :term:`document` is not required.

   pre-splitting
      When deploying a :term:`shard cluster`, it is sometimes
      necessary to expedite the initial distribution of documents
      among shards, by manually dividing the collection into chunks.

   SSD
      Solid State Disk. A modern alternative to a disk with rotating
      platters, SSDs offer high performance read and write
      performance.

   resident memory
      An application's working memory that is currently stored in the
      system's RAM.

   virtual memory
      An application's working memory or data that no longer resides
      in RAM, which is fast and in limited supply. Virtual memory is a
      disk-based cache, which is slower but is in comparatively unlimited
      supply.

   piped
      Directed through a UNIX pipe. In these operations the output of
      one operation or command passes from one operation to the input
      of the next.

   IPv6
      A revision to the IP (Internet Protocol) standard that, among
      many features, provides a significantly larger address space to
      more effectively support the number of hosts on the contemporary
      internet.

   draining
      The process of removing, or "shedding" :term:`chunks <chunk>`
      from one :term:`shard` to another. Administrators must drain
      shards before removing them from the cluster.

      .. seealso:: :dbcommand:`removeshard`, :term:`sharding`.

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
      consistent state. This typically applies to data sets
      replicated on multiple systems, but can also refer to the
      consistency of the on-disk representation of the data set.

   strict consistency
      The :term:`consistency` condition which ensures that write or
      update operations *do not* succeed before the data set has
      reached a consistent state. This typically applies to data sets
      replicated on multiple systems, but can also refer to the
      consistency of the on-disk representation of the data set.

   write concern
      The process where updates pass from the primary node to the
      :term:`secondary` members of the replica set. Write concern
      is an important consideration when distributing read operations
      to secondary nodes that are :term:`eventually consistent
      <eventual consistency>` with the primary.

      .. seealso:: ":ref:`Write Concern for Replica Sets
         <replica-set-write-concern>`."

   priority
      In the context of :term:`replica sets <replica set>`, priority
      refers to the setting that administrators can use to control the
      outcome of elections for :term:`primary` status.

      .. seealso:: ":ref:`Replica Set Node Priority
         <replica-set-node-priority>`"

   election
      In the context of :term:`replica sets <replica set>`, election
      refers to the process by which members of a replica set select
      primary nodes in response to network availability and node
      capability.

      .. seealso:: ":ref:`Replica Set Elections
         <replica-set-elections>`" and ":term:`priority`."

   hidden member
      A member of a :term:`replica set` that cannot become primary and
      is not advertised as part of the set in the :term:`database
      command` :dbcommand:`isMaster`, which prevents it from
      receiving read-only queries depending on :term:`read
      preference`.

      .. seealso:: ":ref:`Hidden Member <replica-set-hidden-members>`,"
         :dbcommand:`isMaster`, :func:`db.isMaster`, and
         :data:`members[n].hidden`.

   delayed member
      A member of a :term:`replica set` that cannot become primary and
      applies operations at a specified delay. This delay is useful
      for protecting data from human error (i.e. unintentionally
      deleted databases) or updates that have unforeseen effects on
      the production database.

      .. seealso:: ":ref:`Delayed Members <replica-set-delayed-members>`"

   arbiter
      A member of a :term:`replica set` that does not hold a copy of
      the data and only votes in elections.

      .. seealso:: ":ref:`Delayed Nodes <replica-set-delayed-members>`"

   read preference
      Describes the behavior of a :term:`replica set` to past some
      queries to :term:`secondary` nodes when possible to distribute
      load from the :term:`primary` node. Read preference and
      :term:`write concern` combine to determine the level of
      set-wide :term:`consistency`.

      .. seealso:: ":ref:`Read Preference <replica-set-read-preference>`"

   replication lag
      The length of time between the last operation in the operation
      log, and the last operation applied to a particular
      :term:`secondary` or :term:`slave` database. High replication
      makes it impossible for non-:term:`primary` members of the set
      to become primary.

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

      .. seealso:: ":data:`members[n].tags`" and ":ref:`data center
         awareness <replica-set-data-center-awareness>`."

   recovering
      A :term:`replica set` status, that reflects nodes which are in
      the process of synchronizing or re-synchronizing their data
      collection, before becoming proper :term:`secondary` nodes.

   configsrv
      The "configuration server," are special :term:`mongod`
      instances that hold metadata for the shard cluster. That is,
      they provide a mapping between each :term:`chunk` and the
      :term:`shard` upon which it resides.

   control script
      A script used by a UNIX like operating system to start, stop,
      or restart, a :term:`daemon` process. On most Unix-like systems
      you can find these scripts in the ``/etc/init.d/`` or
      ``/etc/rc.d/`` directories.

   election
      The process that replica sets use to choose which member will be
      :term:`primary`.

      .. seealso:: ":ref:`Replica Set Elections
         <replica-set-elections>`" and ":ref:`Replica Set Node
         Priority <replica-set-node-priority>`."

   map reduce
      A data and processing and aggregation modality containing a
      "map" phase that selects data, and a "reduce" phase that
      transforms the data. In MongoDB, map/reduce provides support for
      smaller and more complex aggregation requirements.

      .. seealso:: ":doc:`/core/map-reduce`" for more information
         regarding MongoDB's map/reduce implementation, and
         ":doc:`/applications/aggregation`" for another approach to data
         aggregation in MongoDB.

   SQL
      Standard Query Langauge. A declarative statement syntax typically
      used with relational databases to insert, query, and perform
      simple aggregation operations. SQL is the standard interface for
      all or most contemporary relational databases.

   projection
      Projections control the format and output of a query. While the
      query itself selects the documents, the projection controls which
      parts of the document the query returns.

   aggregation
      Aggregation is the process of taking a large amount of data and
      performing a transformation or processing step.

   aggregation framework
      The MongoDB subsystem that makes it possible to perform basic
      data aggregation functions as part of the query process.

      .. seealso:: ":doc:`/applications/aggregation`."

   pipeline
      Describes the series of operations in the :term:`aggregation`
      process.

      .. seealso:: ":doc:`/applications/aggregation`."

   expression
      In the context of the :term:`aggregation framework`, expressions
      are the stateless transformations that operate on the data that
      passes through the :term:`pipeline`.

      .. seealso:: ":doc:`/applications/aggregation`."

   accumulator
      An :term:`expression` in the :term:`aggregation framework` that
      maintains state and used by the :operator:`$group` to maintain
      data between documents in the :term:`aggregation`
      :term:`pipeline`.

   crud
      Create, read, update, and delete. This acronym represents all
      major functions present in database systems.

   JavaScript
      An object oriented scripting language used in MongoDB's shell
      environment.

   idempotent
      When calling an idempotent operation on a value or state, the
      operation only affects the value once and the operation can
      safely run multiple times without affecting the outcome. In the
      context of MongoDB, :term:`oplog` entries are idempotent and do
      not have any effect if applied more than once.
