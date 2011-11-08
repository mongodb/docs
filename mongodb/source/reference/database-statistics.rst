=============================
Database Statistics Reference
=============================

.. default-domain: mongodb
.. highlight:: javascript

Synopsis
--------

MongoDB can report data reflecting the current state of the current
database. In this context "database," refers to a single MongoDB
database. To run ``dbStats`` issue a command in the shell that
resembles the following: ::

     db.stats()
     db.runCommand( { dbStats: 1 } )

The above commands are equivalent. This returns values in bytes, to
convert to kilobytes, use the following form: ::

     db.stats(1024)
     db.runCommand( { dbStats: 1, scale: 1024 } )

The above commands are equivalent. See :command:`dbStats` for more
information.

Fields
------

.. describe:: db

   Contains the name of the database.

.. describe:: collections

   Contains a count of the number of collections in that database.

.. describe:: objects

   Contains a count of the number of objects (i.e. JSON documents) in
   the database across all collections.

.. describe:: avgObjSize

   The average size of each object. This value is affected by the
    "``scale``" factor.

.. describe:: dataSize

   The total size of the data held in this database. This does not
   include the :term:`padding factor`, and is affected by the
   "``scale``" factor.

.. describe:: storageSize

   The total amount of allocated and preallocated storage for this
   database. This includes the :term:`padding factor` and is affected
   by the "``scale``" factor.

.. describe:: numExtents

   Contains a count of the number of extents in the database across
   all collections.

.. describe:: indexes

   Contains a count of the total number of indexes across all
   collections in the database.

.. describe:: index Size

   The total size of all indexes created on this database. This value
   is affected by the "``scale``" factor.

.. describe:: fileSize

   The total size of the data files that hold the database. This
   includes preallocated space and the :term:`padding factor`. This
   value is affected by the "``scale``" factor.

.. describe:: nsSizeMB

   The total size of the data database  files (i.e. that end with ``.ns``). This
   includes preallocated space and the :term:`padding factor`.
