========
Glossary
========

.. default-domain:: mongodb

.. glossary::
   :sorted:

   BSON
      A serialization format used to store documents and make remote
      procedure calls in MongoDB. "BSON" is a a portmanteau of the words
      "binary" and "JSON". BSON can be thought of as a binary representation
      of JSON (JavaScript Object Notation) documents. For a detailed spec,
      see `bsonspec.org <http://bsonspec.org/>`_.

   database command
      Any MongoDB operation other than an insert, update, remove,
      or query. MongoDB exposes commands as queries
      query against the special ":term:`$cmd`" collection. For example,
      ``count`` is run as a command.

      .. seealso:: ":doc:`/reference/commands`" for a

   operator
      A keyword beginning with a ``$`` used to express a complex
      query, update, or data transformation. For example, ``$gt``
      is the query language's "greater than" operator.
      See the ":doc:`/reference/operators`" for more
      information about the available operators.

      .. seealso:: ":doc:`/reference/operators`."

   MongoDB
      The document-based database server described in this manual.

   document
      A record in a MongoDB collection, and the basic unit of data
      in MongoDB. Documents are analogous to JSON object, but are
      stored in a more type-rich format known as BSON.

   field
      A name-value pair in a term:`document`. Documents have zero
      or more fields. Fields are analogous to
      columns in relational databases.

   database
      A physical container for :term:`collections <collection>`.
      Each database gets its own set of files on the file
      system. A single MongoDB server typically servers multiple
      databases.

   collection
      A namespace within a database for containing :term:`documents <document>`.
      Collections do not enforce a schema, but they are otherwise
      mostly analogous to RDBMS tables.

   map-reduce
      A paradigm from functional programming used to implement aggregation
      in a number of popular database servers. MongoDB uses map-reduce
      in a command called ``mapreduce`` for basic aggregation.

   $cmd
      A virtual :term:`collection` that exposes :term:`MongoDB`'s
      term:`database commands <database command>`.

   JSON
      JavaScript Object Notation. A human-readable, plain text format
      for expressing structured data.

   JSON document
      A :term:`JSON` documents are collections of fields and values in a
      structured format. The following is a sample JSON document with
      two fields::

          { name: "MongoDB",
            type: "database" }

   admin database
      A privileged database named "``admin``". Users must have access
      to this database to run certain administrative commands.
      See :doc:`commands` for more information on these commands.

   replica set
      A cluster of MongoDB servers that implements master-slave
      replication and automated failover. MongoDB's recommended
      replication strategy.

      .. seealso:: :term:`replication`, ":doc:`/replication`" and
         ":doc:`/core/replication`."

   replication
     A feature allowing multiple database servers to share the same
     data, thereby ensuring redundancy and facilitating load balancing.
     MongoDB supports two flavors of replication: master-slave replication
     and replica sets

      .. seealso:: :term:`replica set`, :term:`sharding`,
         ":doc:`/replication`." and ":doc:`/core/replication`."

   shard
      A single replica set that stores some portion of a shard cluster's
      total data set. See :term:`sharding`.

      .. seealso:: ":doc:`/core/sharding`."

   sharding
      A database architecture that enable horizontal scaling by splitting
      data into key ranges among two or more replica sets. This architecture
      is also known as "range-based partitioning." See :term:`shard`.

      .. seealso:: ":doc:`/core/sharding`."

   shard cluster
      The set of nodes comprising a :term:`sharded <sharding>` MongoDB deployment. A shard cluster
      consists of three config processes, one or more replica sets, and one or more
      ``mongos`` routing processes.

      .. seealso:: ":doc:`/core/sharding`."

   partition
      A distributed system architecture that splits data into ranges.
      :term:`Sharding` is a kind of partitioning.

   mongod
      The program implemeting the MongoDB database server. This server
      typically runs as a :term:`daemon`.

      .. seealso:: ":doc:`/reference/mongod`."

   mongos
      The routing and load balancing process that
      acts an interface between an application and
      a MongoDB :term:`shard cluster`. See
      ":doc:`/reference/mongos`" for more information.

      .. seealso:: ":doc:`/reference/mongos`."

   mongo
      The MongoDB Shell. ``mongo`` connects to :program:`mongod`
      and :program:`mongos` instances, allowing administration,
      management, and testing. :program:`mongo` has a JavaScript
      interface.

      .. seealso:: ":doc:`/reference/mongo`" and
         ":doc:`/reference/javascript`."

   SQL
      Standard Query Language. SQL is the language used to interacting
      with nearly all relational databases. Because of this, ``SQL`` is
      a metonym for relational databases.

   cluster
      A set of :program:`mongod` instances running in
      conjunction to increase database availability and
      performance. See :term:`sharding` and :term:`replication` for
      more information on the two different approaches to clustering with
      MongoDB.

   polygon
      MongoDB's :term:`geospatial` indexes and querying system
      allow you to build queries around multi-sided
      polygons on two-dimensional coordinate systems. These queries use
      the :operator:`$within` operator and a sequence of points that define
      the corners of the polygon.

   circle
      MongoDB's :term:`geospatial` indexes and querying system
      allow you to build queries around circles on two-dimensional
      coordinate systems. These queries use the
      :operator:`$circle` operator to define circle using the center
      and the radius of the circle.

   box
      MongoDB's :term:`geospatial` indexes and querying system
      allow you to to build queries around rectangles on two-dimensional
      coordinate systems. These queries use the :operator:`$box`
      operator to define a shape using the lower-left
      and the upper-right coordinates.

   capped collection
      A fixed-sized :term:`collection <collection>`. Once they reach
      their fixed size, capped collections
      automatically overwrite their oldest entries. These collections
      are used to implement replication, but they may also be created
      by application developers.

      .. seealso:: ":doc:`/core/capped-collections`."

   BSON types
      The set of types supported by the :term:`BSON` serialization
      format. The following types are available:

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

   master
      In conventional master/:term:`slave` replication, the master
      database receives all writes. The
      :term:`slave` instances replicate from the master instance
      in real time.

   slave
      In conventional :term:`master`/slave replication, the `slave`s
      are read-only instances that replicate operations from the
      :term:`master` database. Data read from slave instances may
      not be completely consistent with the master. Therefore, applications
      requiring consistent reads must read from the master database instance.

   primary
      In a :term:`replica set`, the primary member is the current
      ":term:`master`" instance, which receives all write operations.

   secondary
      In a :term:`replica set`, the ``secondary`` members are the current
      :term:`slave` instances that replicate the contents of the
      master database. Secondary members may handle read requests, but only the
      :term:`primary` members can handle write operations.

   GridFS
      A convention for storing large files in a MongoDB database. All
      of the official MongoDB drivers support this convention, as
      does the ``mongofiles`` program.

      .. seealso:: ":doc:`/reference/mongofiles`".

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
      A lock on the database for a given writer.
      When a process writes to the database, it takes an exlcusive write-lock
      to prevent other processes from writing or reading.

   index
      A data structure that optimizes queries.

      .. seealso:: ":doc:`/core/indexing`"

   compound index
      An :term:`index` consisting of two or more keys.

      .. seealso:: ":doc:`/core/indexing`"

   btree
      A data structure used by most database management systems
      for to store indexes. MongoDB also uses b-trees for its indexes.

   ISODate
     The international date format used by the MongoDB JavaScript shell
     to display dates.

TODO: continue here

   journal
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

   syslog
      A standard system logging process that provides a uniform way
      for serves and process to submit logging information.

   namespace
      The concatenation of the database and index name that takes the
      form of "``[database].[collection]``". All documents belong to a
      namespace.

   writeBacks
