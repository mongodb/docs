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
      A MongoDB feature

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

   BSON types

   geospatial

   Polygon

   Circle
      Is a shape used by the :term:`

   Box

   haystack index

   capped collection

   capped collections
      See :term:`capped collection`

   Master

   Slave

   Primary

   Secondary

   shell helper

   padding factor

   GridFS

   md5
