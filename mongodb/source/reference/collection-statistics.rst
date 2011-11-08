===============================
Collection Statistics Reference
===============================

.. default-domain: mongodb
.. highlight:: javascript

Synopsis
--------

MongoDB can report data reflecting the current state of the current
collection. To dbstats ``run`` issue a command in the shell that
resembles the following: ::

     db.collection.stats()
     db.runCommand( { collStats: "collection" } )

Replace "``collection``" in both examples with the name of the
colection you want to return. The above commands are equivalent. This
returns values in bytes, to convert to kilobytes, use the following
form: ::

     db.collection.stats(1024)
     db.runCommand( { collStats: "collection", scale: 1024 } )

The above commands are equivalent. See :command:`colStats` for more
information.

Fields
------

.. describe:: ns

   The value represents the namepsace of the current collection. This
   is in the format of "``[database].[collection]``".

.. describe:: count

   Contains a counter of the number of objects or documents in this
   colection.

.. describe:: size

   The size of the collection. This value is affected by the
   "``scale``" factor.

.. describe:: avgObjSize

   The average size of an object in the collection. This value is
   affected by the "``scale``" factor.

.. describe:: storageSize

   The total amount of storage size this collection occupies. This
   value is affected by the "``scale``" factor and the :term:`padding
   factor`.

.. describe:: numExtents

   The total number of contiguously allocated data file space.

.. describe:: nindexes

   The number of indexes on the collection. There is always at least
   one index on the primary key (i.e. ``_id``).

.. describe:: lastExtentSize

   The size of the last extent allocated. This value is affected by
   the "``scale``" factor.

.. describe:: paddingFactor

   Indicates the collection's padding factor. MongoDB adds a
   configurable amount of space to the end of each document to
   facilitate faster updates if documents grow.

.. describe:: flags

   "flags" : 1,

TODO what are flags in collection stats.

.. describe:: totalIndexSize

   The value of this field reflects the total size of all
   indexes. This value is affected by the "``scale``" factor.

.. describe:: indexSizes

   This field contains an embeded document that holds the ID and size
   of every existing index on the collection. This value is affected
   by the "``scale``" factor.

   "indexSizes" : { "_id_" : 8176 },
