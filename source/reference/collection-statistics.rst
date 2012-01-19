===============================
Collection Statistics Reference
===============================

.. default-domain:: mongodb
.. highlight:: javascript

Synopsis
--------

To fetch collection statistics, use the :js:func:`issue the following
command from the :option:`mongo` shell: ::

.. code-block:: javascript

   db.collection.stats()

You may also use the literal command format:

.. code-block:: javascript

   db.runCommand( { collStats: "collection" } )

Replace "``collection``" in both examples with the name of the
colection you want statstics for. By default, the return values will
appear in terms of bytes. You can, however, enter a scaling
factor. For example, you can convert the return values to kilobytes
like so: ::

.. code-block:: javascript

   db.collection.stats(1024)

Or:

.. code-block:: javascript

   db.runCommand( { collStats: "collection", scale: 1024 } )

See :dbcommand:`colStats` for

Fields
------

.. stats:: ns

   The namepsace of the current collection, which follows the format
   "``[database].[collection]``".

.. stats:: count

   The number of objects or documents in this colection.

.. stats:: size

   The size of the collection. This value is affected by the
   "``scale``" factor.

.. stats:: avgObjSize

   The average size of an object in the collection. This value is
   affected by the "``scale``" factor.

.. stats:: storageSize

   The total amount of storage size. This is equal to the total number
   of extents allocated by this collection. This
   value is affected by the "``scale``" factor and the :term:`padding
   factor`.

.. stats:: numExtents

   The total number of contiguously allocated data file regions.

.. stats:: nindexes

   The number of indexes on the collection. On standard, non-capped collections, there is
   always at least one index on the primary key (i.e. ``_id``).

.. stats:: lastExtentSize

   The size of the last extent allocated. This value is affected by
   the "``scale``" factor.

.. stats:: paddingFactor

   The amount of space added to the end of each document at insert time.
   This padding factor is calculated automatically by the server and exists
   to prevent excessive document relocations.

.. stats:: flags

   "flags" : 1,

TODO what are flags in collection stats.

.. stats:: totalIndexSize

   The total size of all indexes. This value is affected by the "``scale``" factor.

.. stats:: indexSizes

   This field specifies the key and size
   of every existing index on the collection. This value is affected
   by the "``scale``" factor.
