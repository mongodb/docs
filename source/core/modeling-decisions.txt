.. _data-modeling-decisions:

=======================
Data Modeling Decisions
=======================

.. default-domain:: mongodb

Data modeling decisions involve determining how to structure the
documents to model the data effectively. The primary decision is
whether to :ref:`embed <data-modeling-embedding>` or to :ref:`use
references <data-modeling-referencing>`.

.. _data-modeling-embedding:

Embedding
---------

To de-normalize data, store two related pieces of data in a single
:term:`document`.

Operations within a document are less expensive for the server than
operations that involve multiple documents.

In general, use embedded data models when:

- you have "contains" relationships between entities. See
  :ref:`data-modeling-example-one-to-one`.

- you have one-to-many relationships where the "many" objects always
  appear with or are viewed in the context of their parent documents.
  See :ref:`data-modeling-example-one-to-many`.

Embedding provides the following benefits:

- generally better performance for read operations.

- the ability to request and retrieve related data in a single
  database operation.

Embedding related data in documents, can lead to situations where
documents grow after creation. Document growth can impact write
performance and lead to data fragmentation. Furthermore, documents in
MongoDB must be smaller than the :limit:`maximum BSON document size
<BSON Document Size>`. For larger documents, consider using
:doc:`GridFS </core/gridfs>`.

.. seealso::

   - :term:`dot notation` for information on "reaching into" embedded
     sub-documents.

   - :ref:`read-operations-arrays` for more examples on accessing arrays.

   - :ref:`read-operations-subdocuments` for more examples on accessing
     subdocuments.

.. _data-modeling-referencing:

Referencing
-----------

To normalize data, store :doc:`references
</reference/database-references>` between two documents to indicate
a relationship between the data represented in each document.

In general, use normalized data models:

- when embedding would result in duplication of data but would not
  provide sufficient read performance advantages to outweigh the
  implications of the duplication.

- to represent more complex many-to-many relationships.

- to model large hierarchical data sets. See :ref:`data-modeling-trees`.

Referencing provides more flexibility than embedding; however, to
resolve the references, client-side applications must issue follow-up
queries. In other words, using references requires more roundtrips to
the server.

See :ref:`data-modeling-publisher-and-books` for an example of
referencing.

.. _data-modeling-atomicity:

Atomicity
---------

MongoDB only provides atomic operations on the level of a single
document. [#record-atomicity]_ As a result needs for atomic operations
influence decisions to use embedded or referenced relationships when
modeling data for MongoDB.

Embed fields that need to be modified together atomically in the same
document. See :ref:`data-modeling-atomic-operation` for an example of
atomic updates within a single document.

.. [#record-atomicity] Document-level atomic operations include all
   operations within a single MongoDB document record: operations that
   affect multiple sub-documents within that single record are still
   atomic.
