=============================
Database Statistics Reference
=============================

.. default-domain:: mongodb
.. highlight:: javascript

Synopsis
--------

TODO: not so sure about my working change below...
MongoDB can report data reflecting the current state of the currently
"active" database. In this context "database," refers to a single MongoDB
database. To run :dbcommand:`dbStats` issue this command in the shell:

.. code-block:: javascript

   db.runCommand( { dbStats: 1 } )

The :program:`mongo` shell provides the helper function :func:`db.stats()`. 
Use the following form:

.. code-block:: javascript

   db.stats()

The above commands are equivalent. Without any arguments,
:func:`db.stats()` returns values in bytes. To convert the returned
values to kilobytes, use the following form:

.. code-block:: javascript

   db.stats(1024)

Or:

.. code-block:: javascript

   db.runCommand( { dbStats: 1, scale: 1024 } )

.. note::

   Because scaling rounds values to whole number, scaling may return
   unlikely or unexpected results.

The above commands are equivalent.

.. seealso:: See :dbcommand:`dbStats`, :func:`db.stats()`
   additional more information.

Fields
------

.. stats:: db

   Contains the name of the database.

.. stats:: collections

   Contains a count of the number of collections in that database.

.. stats:: objects

   Contains a count of the number of objects (i.e. :term:`documents <document>`) in
   the database across all collections.

.. stats:: avgObjSize

   The average size of each object. The scaling factor affects this
   value.

.. stats:: dataSize

   The total size of the data held in this database. This does not
   include the :term:`padding factor`. The scaling factor affects this
   value.

.. stats:: storageSize

   The total amount of allocated and preallocated storage for this
   database. This includes the :term:`padding factor`. The scaling
   factor affects this value.

.. stats:: numExtents

   Contains a count of the number of extents in the database across
   all collections.

.. stats:: indexes

   Contains a count of the total number of indexes across all
   collections in the database.

.. stats:: indexSize

   The total size of all indexes created on this database. The scaling
   factor affects this value.

.. stats:: fileSize

   The total size of the data files that hold the database. This
   includes preallocated space and the :term:`padding factor`. The
   scaling factor affects this value.

.. stats:: nsSizeMB

TODO: this definition isn't right
   The total size of the data database files (i.e. that end with
   ``.ns``). This includes preallocated space and the :term:`padding
   factor`.
