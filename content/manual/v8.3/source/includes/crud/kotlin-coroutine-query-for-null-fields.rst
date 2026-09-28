This page provides examples of |query_operations| by using the
`MongoCollection.find() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/find.html>`__ method in the MongoDB
:driver:`Kotlin Coroutine Driver </kotlin/coroutine/current/>`.

.. tip::

   The driver provides `com.mongodb.client.model.Filters <{+java-api-docs+}/driver-core/com/mongodb/client/model/Filters.html>`__
   helper methods to facilitate the creation of filter
   documents. The examples on this page use these methods to
   create the filter documents.

.. include:: /includes/driver-examples/examples-intro.rst

.. important::
   Use ``null`` with the Kotlin Coroutine driver to
   query for ``null`` or missing fields in MongoDB.

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 38
   :end-before: End Example 38

Equality Filter
---------------

The ``eq("item", null)`` query matches documents that contain
the ``item`` field with a ``null`` value **or** do not contain
the ``item`` field.

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 39
   :end-before: End Example 39

The query returns both documents in the collection.

Non-Equality Filter
-------------------

To query for fields that **exist** and are **not null**, use the
``{ $ne : null }`` filter.

The ``{ item : { $ne : null } }`` query matches
documents where the ``item`` field exists **and** has a
non-null value.

.. code-block:: kotlin

   collection.find(ne("item", null))

Null Comparisons on Array Fields
--------------------------------

When a field holds an array, MongoDB compares the query value against
each element of the array and against the array itself. As a result,
comparisons to ``null`` on array fields produce results that you
might not expect. The examples in this section use :binary:`mongosh`
syntax.

Consider a collection that contains the following documents:

.. code-block:: javascript

   { _id: 1, a: null }
   { _id: 2, a: [ ] }
   { _id: 3, a: [ 1, "string", 4 ] }
   { _id: 4, a: [ 1, null, 4 ] }
   { _id: 5, a: [ { b: 1 }, { b: 3 } ] }
   { _id: 6, a: [ { b: 3 }, { } ] }
   { _id: 7 }

Equality on an Array Field
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``{ a: null }`` query matches a document when the ``a`` field is
``null``, when the ``a`` field is missing, or when the ``a`` array
contains at least one ``null`` element. The query matches the
documents with ``_id`` values ``1``, ``4``, and ``7``.

An empty array and an array without a ``null`` element do not match.
The ``a`` field exists in both cases, and neither array contains a
``null`` element, so the documents with ``_id`` values ``2`` and
``3`` are not returned.

The ``{ a: { $ne: null } }`` query returns the complement, which is
every document that ``{ a: null }`` does not match. The query matches
the documents with ``_id`` values ``2``, ``3``, ``5``, and ``6``,
including the document that holds an empty array.

Equality on a Dotted Path
~~~~~~~~~~~~~~~~~~~~~~~~~

Starting in MongoDB 9.0, the ``{ "a.b": null }`` query matches a
document in any of these cases:

- The ``a`` field holds a value that is neither an object nor an
  array.
- The ``a`` field holds an object where ``b`` is missing or ``null``.
- The ``a`` field holds an empty array.
- The ``a`` field holds an array of scalar values.
- The ``a`` field holds an array with at least one object where ``b``
  is missing or ``null``.

Against the sample documents, the query matches the ``_id`` values
``1``, ``2``, ``3``, ``4``, ``6``, and ``7``. The document with
``_id: 5`` does not match, because every object in the array has a
non-null ``b`` value.

The ``{ "a.b": { $ne: null } }`` query returns the documents that
``{ "a.b": null }`` does not return, which is only the document with
``_id: 5``. That result is not the same as the set of documents that
have a non-null value for ``a.b``. The document with ``_id: 6``
contains an object with a ``b`` value of ``3``, but the query does
not return that document, because the array also contains an object
where ``b`` is missing.

Type Check
----------

The ``type("item", BsonType.NULL)`` query matches *only*
documents that contain the ``item`` field with a ``null``
value. The value of the ``item`` field is of
:ref:`BSON Type <bson-types>` ``Null`` (BSON Type 10):

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 40
   :end-before: End Example 40

The query returns only the document where the ``item``
field has a value of ``null``.

Existence Check
---------------

The following example queries for documents that do not contain a
field.

The ``exists("item", false)`` query matches documents that
do not contain the ``item`` field:

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 41
   :end-before: End Example 41

The query only returns the document that does *not*
contain the ``item`` field.

.. include:: /includes/reference/exist-op-support-expressions.rst

.. seealso::

   Reference documentation for the :query:`$type` and
   :query:`$exists` operators.
