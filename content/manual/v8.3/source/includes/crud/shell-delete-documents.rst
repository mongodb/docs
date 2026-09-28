This page uses the following :binary:`~bin.mongosh` methods:

- :method:`db.collection.deleteMany()`
- :method:`db.collection.deleteOne()`

.. include:: /includes/sample-data-usage.rst

.. _write-op-deleteMany:

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter <document-query-filter>` document ``{}`` to the
:method:`db.collection.deleteMany()` method.

The following example deletes all documents from the ``movies``
collection:

.. code-block:: javascript

   db.movies.deleteMany({})

The method returns a document with the status of the operation. For
more information and examples, see
:method:`~db.collection.deleteMany()`.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use ``<field>:<value>``
expressions in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: javascript

   { <field1>: <value1>, ... }

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: javascript

   { <field1>: { <operator1>: <value1> }, ... }

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:method:`~db.collection.deleteMany()` method.

The following example removes all documents from the ``movies``
collection where ``year`` equals ``2023``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/crud-tutorials/delete/delete-many-movies.snippet.delete-many-movies.js
   :language: javascript
   :copyable: true

The method returns a document with the status of the operation. For
more information and examples, see
:method:`~db.collection.deleteMany()`.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :method:`db.collection.deleteOne()` method.

The following example deletes the first document from the ``movies``
collection where the ``title`` field equals ``"Dune: Part Two"``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/crud-tutorials/delete/delete-one-movie.snippet.delete-one-movie.js
   :language: javascript
   :copyable: true

.. seealso::

   - :method:`db.collection.deleteMany()`
   - :method:`db.collection.deleteOne()`
   - :ref:`additional-deletes`
