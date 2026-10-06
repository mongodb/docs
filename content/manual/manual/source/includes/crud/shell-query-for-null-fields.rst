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

   A dotted path can produce results you might not expect when the
   path traverses an array. For details, see
   :ref:`null-semantics-arrays`.

.. _non-equality-filter:

Non-Equality Filter
-------------------

To query for fields that **exist** and are **not null**, use the
``{ $ne : null }`` filter.

.. note:: Dotted Paths That Traverse Arrays

   The ``{ $ne : null }`` filter on a dotted path can match a
   document even when ``{ path : { $exists: true } }`` does not,
   when the path traverses an array. For details, see
   :ref:`null-semantics-arrays`.

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

The ``{ "a.b": null }`` query matches a document in any of these
cases:

- The ``a`` field is missing, or holds a value that is neither an
  object nor an array.
- The ``a`` field holds an object where ``b`` is missing or ``null``.
- The ``a`` field holds an array with at least one object where ``b``
  is missing or ``null``.

Against the sample documents, the query matches the ``_id`` values
``1``, ``6``, and ``7``. The document with ``_id: 6`` matches because
one of its array elements, ``{ }``, is missing ``b``, even though the
other element has a non-null ``b`` value.

An empty array, an array of scalar values, and an array that
contains a literal ``null`` do not match, because none of these
array shapes contains an object for ``b`` to be missing from. The
documents with ``_id`` values ``2``, ``3``, and ``4`` do not match
for this reason. The document with ``_id: 5`` does not match either,
because every object in its array has a non-null ``b`` value.

The ``{ "a.b": { $ne: null } }`` query returns the complement, which
is every document that ``{ "a.b": null }`` does not match: the
documents with ``_id`` values ``2``, ``3``, ``4``, and ``5``. That
result is not the same as the set of documents that have a non-null
value for ``a.b``. Neither ``_id: 2`` nor ``_id: 3`` has any value
at ``a.b``, yet the ``{ $ne: null }`` filter still matches them. A
``{ $ne: null }`` filter on a dotted path does not necessarily
return the same documents as an :query:`$exists` check on that path.

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
