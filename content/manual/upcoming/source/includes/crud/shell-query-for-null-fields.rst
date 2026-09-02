This page provides examples of |query_operations| using the
:method:`db.collection.find()` method in :binary:`mongosh`.

.. important::
   Use ``null`` with the MongoDB Shell to
   query for ``null`` or missing fields in MongoDB.

.. include:: /includes/sample-data-usage.rst

.. _faq-comparison-with-null:

Equality Filter
---------------

The ``{ metacritic : null }`` query matches documents that
contain the ``metacritic`` field with a ``null`` value **or**
do not contain the ``metacritic`` field.

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-for-null-fields/find-null-or-missing.snippet.find-null-or-missing.js
   :language: javascript
   :category: usage example

The query returns all documents in the ``movies``
collection where the ``metacritic`` field contains a
``null`` value or does not exist.

.. note:: Dotted Paths That Traverse Arrays

   Starting in MongoDB 9.0, a dotted path that does not resolve to a
   non-null value evaluates as ``null``. The behavior applies when a
   field in the path holds an empty array, an array of scalar values,
   or an array that contains a nested array. For example, the
   ``{ "item.name": null }`` query matches a document where ``item``
   holds the array ``[ 1 ]``. Because MongoDB does not traverse into
   nested arrays, the query also matches a document where ``item``
   holds the array ``[ [ { name: "notebook" } ] ]``. In earlier
   versions, the query does not match either document. For details,
   see :ref:`9.0-compatibility`.

.. _non-equality-filter:

Non-Equality Filter
-------------------

To query for fields that **exist** and are **not null**, use the
``{ $ne : null }`` filter.

.. note:: Dotted Paths That Traverse Arrays

   Starting in MongoDB 9.0, the ``{ $ne : null }`` filter excludes
   documents where a dotted path does not resolve to a non-null
   value. The behavior applies when a field in the path holds an
   empty array, an array of scalar values, or an array that contains
   a nested array. In earlier versions, the filter matches those
   documents, which returns documents that ``{ $exists: true }``
   excludes. For details, see :ref:`9.0-compatibility`.

The ``{ metacritic : { $ne : null } }`` query matches
documents where the ``metacritic`` field exists **and**
has a non-null value.

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-for-null-fields/find-ne-null.snippet.find-ne-null.js
   :language: javascript
   :category: usage example

.. _null-semantics-arrays:

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

The empty array and the arrays of scalar values are the cases that
changed in MongoDB 9.0. In earlier versions, the documents with
``_id`` values ``2``, ``3``, and ``4`` did not match. For details,
see :ref:`9.0-compatibility`.

Type Check
----------

The ``{ metacritic : { $type: 10 } }`` query matches
*only* documents that contain the ``metacritic`` field
with a ``null`` value. The value of the ``metacritic``
field is of :ref:`BSON Type <bson-types>` ``Null``
(BSON Type 10):

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-for-null-fields/find-null-type.snippet.find-null-type.js
   :language: javascript
   :category: usage example

The query returns only the documents from the ``movies``
collection where the ``metacritic`` field has a ``null``
value.

Existence Check
---------------

The following example queries for documents that do not contain a
field.

The ``{ metacritic : { $exists: false } }`` query matches
documents that do not contain the ``metacritic`` field:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-for-null-fields/find-missing-field.snippet.find-missing-field.js
   :language: javascript
   :category: usage example

The query returns only the documents from the ``movies``
collection that do not contain the ``metacritic`` field.

.. include:: /includes/reference/exist-op-support-expressions.rst

.. seealso::

   Reference documentation for the :query:`$type` and
   :query:`$exists` operators.
