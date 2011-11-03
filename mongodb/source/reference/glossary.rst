================
MongoDB Glossary
================

.. glossary::
   :sorted:

   BSON
      Binary JSON. BSON is MongoDB's internal representation format
      and wire-trasmission format. For more information see
      `bsonspec.org <http://bsonspec.org/>`_.

   Database Commands
      MongoDB has database commands, which have a specific
      implementation, and allow you to control the database.

   Operators
      Operators provide tools for querying and manipulating
      documents.

   MongoDB
      A document-driven database.

   Document
      A record in a MongoDB database. Documents are analogous to, but
      more flexible than, a row in relational databases. Documents
      contain a number of :term:`fields`, and are members of
      :term:`collections`.

   Documents
      See :term:`document`.

   Field
      A value or item in a :term:`document`. Documents have one
      or more fields. Fields are analogous to, but more flexible than,
      columns in relational databases.

   Fields
      See :term:`field`.

   Database
      Each database is stored in a unique file on the file
      system. Databases contain a number of :term:`collections`.

   Databases
      See :term:`database`.

   Collection
      A group of :term:`document`. Collections are analogous to, but
      more flexible than, tables in relational databases. A
      :term:`database` contains a number of commands .

   Collections
      See :term:`collection`.

   Map/Reduce
      A data processing paradigm formalized at Google.

   $cmd
      This is the special :term:`collection` used to :term:`MongoDB`
      to implement database commands.

   JSON
      JavaScript Object Notation.

   JSON document
      :term:`JSON` documents are collections of fields and values in a
      structured format. JSON documents are enclosed in "curly braces."

   Admin Database
      The administration database is a privileged database named
      "``admin``" that is used to provide special administrative
      functionality. See :doc:`commands` for more information on these
      commands.

   Replica Set
      A MongoDB feature whereby a collection of hosts can, as a database
      cluster, provide replication while allowing the "master"
      instance to automatically reassign itself based on the cluster
      conditions.

   Replication
     A database architecture where the data corpus is duplicated on a
     number of machines to provide redundancy and load
     distribution. See also :term:`Sharding` and :term:`Replica set`.

   Shard
      A for a :term:`mongod` instance that only stores a portion of
      the total dataset corpus as part of a :term:`cluster`. See
      :term:`sharding`.

   Sharding
      A database architecture where the data corpus is split among
      a cluster of system to enable horizontal scaling. MongoDB added
      support for automatic shading in version 1.6 (TODO) See
      :term:`shard`.

   Sharded
      See :term:`shard` and :term:`sharding`.

   mongod
      ``mongod`` is the daemon that runs MongoDB database instances.

   mongos
      ``mongos`` is a routing and load balancing process that provides
      an interface between an application and ``mongod`` instances in
      :term

   mongo
      The MongoDB Shell. Mongo connects to the :term:`mongod`
      database and provides an interface for administration,
      management, and testing. ``mongo`` uses complete JavaScript
      interface.

   SQL
      Standard Query Language. This is the standard method for
      querying and interacting with relational databases. Often SQL is
      a metonym for relational databases.

   Cluster
      Clusters are groups of `mongod` instances running in conjunction
      to increase database availability and performance. See
      :term:`sharding` and :term:`replication` for more information on
      two different approaches to clustering with MongoDB.

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
      Capped collections, are :term:`collections` that have a maximum
      size, and an (optional) maximum number of documents. These
      collections are used to prevent collections from growing out of
      control and are useful in the context of logging or caching
      functions.

   capped collections
      See :term:`capped collection`.

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

   write-lock
      When a process needs to write to the database, a write-lock is
      used to prevent other processes from reading or producing an
      inconsistent state. These operations are typically very
      short-lived, but prevent all other operations from succeeding.

   Indexes
      Indexes provide the database with a fast and reliable way of
      accessing data without requiring full searches on data.

   Secondary Indexes
      See :term:`Indexes`.

   btree
      btree's are a fast data representation that provides for
      efficient writing and reading binary data. MongoDB uses b-trees
      for data storage.

   ISODate
      The standard date representation in database fields.

   Journaling
      MongoDB's journal provides a transnational log that provides
      durability for database operations. When using the journal, all
      data is written to disk in at least two locations, and items are
      logged to the journal *much* more frequently than the state of
      the database is flushed to the disk. The journal can thus be
      used to recover the state of the database in the event of system
      failure or glitch.

   Global Lock

   read-lock

   Lock

   padding factor

   haystack index

   geospatial

   configdb

   balancer

   fsync
