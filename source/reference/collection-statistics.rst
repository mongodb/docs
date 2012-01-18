===============================
Collection Statistics Reference
===============================

.. default-domain:: mongodb
.. highlight:: javascript

Synopsis
--------

MongoDB can report data reflecting the current state of the current
collection. To fetch collection statistics, issue a command in the
:option:`mongod` shell that resembles the following:

.. code-block:: javascript

   db.collection.stats()
   db.runCommand( { collStats: "collection" } )

Replace "``collection``" in both examples with the name of the
colection you want to return. The above commands are equivalent. This
returns values in bytes, to convert to kilobytes, use the following
form:

.. code-block:: javascript

   db.collection.stats(1024)
   db.runCommand( { collStats: "collection", scale: 1024 } )

The above commands are equivalent. See :dbcommand:`colStats` for
more information.

Fields
------

.. status:: ns

   The value represents the namepsace of the current collection. This
   is in the format of "``[database].[collection]``".

.. status:: count

   Contains a counter of the number of objects or documents in this
   colection.

.. status:: size

   The size of the collection. This value is affected by the
   "``scale``" factor.

.. status:: avgObjSize

   The average size of an object in the collection. This value is
   affected by the "``scale``" factor.

.. status:: storageSize

   The total amount of storage size this collection occupies. This
   value is affected by the "``scale``" factor and the :term:`padding
   factor`.

.. status:: numExtents

   The total number of contiguously allocated data file space.

.. status:: nindexes

   The number of indexes on the collection. There is always at least
   one index on the primary key (i.e. ``_id``).

.. status:: lastExtentSize

   The size of the last extent allocated. This value is affected by
   the "``scale``" factor.

.. status:: paddingFactor

   Indicates the collection's padding factor. MongoDB adds a
   configurable amount of space to the end of each document to
   facilitate faster updates if documents grow.

.. status:: flags

   "flags" : 1,

TODO what are flags in collection stats.

.. status:: totalIndexSize

   The value of this field reflects the total size of all
   indexes. This value is affected by the "``scale``" factor.

.. status:: indexSizes

   This field contains an embeded document that holds the ID and size
   of every existing index on the collection. This value is affected
   by the "``scale``" factor.

   "indexSizes" : { "_id_" : 8176 },
