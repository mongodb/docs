.. |query_operations| replace:: query operations on an array of nested documents

This page provides examples of |query_operations| using the
`com.mongodb.reactivestreams.client.MongoCollection.find <http://mongodb.github.io/mongo-java-driver-reactivestreams/1.6/javadoc/com/mongodb/reactivestreams/client/MongoCollection.html#find()>`_
method in the MongoDB `Java Reactive Streams Driver <http://mongodb.github.io/mongo-java-driver-reactivestreams/1.6/>`_.

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 29
   :end-before: End Example 29

Query for a Document Nested in an Array
---------------------------------------

The following example selects all documents where an element in the
``instock`` array matches the specified document:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 30
   :end-before: End Example 30

Equality matches on the whole embedded/nested document require an
*exact* match of the specified document, including the field order. For
example, the following query does not match any documents in the
``inventory`` collection:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 31
   :end-before: End Example 31

Specify a Query Condition on a Field in an Array of Documents
-------------------------------------------------------------

Specify a Query Condition on a Field Embedded in an Array of Documents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you do not know the index position of the document nested in the
array, concatenate the name of the array field, with a dot (``.``) and
the name of the field in the nested document.

The following example selects all documents where the ``instock`` array
has at least one embedded document that contains the field ``qty``
whose value is less than or equal to ``20``:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 33
   :end-before: End Example 33

Use the Array Index to Query for a Field in the Embedded Document
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Using :term:`dot notation`, you can specify query conditions for a
field in a document at a particular index or position of the array.
The array uses zero-based indexing.

.. note::

   When querying using dot notation, the field and index must be
   inside quotation marks.

The following example selects all documents where the ``instock`` array
has as its first element a document that contains the field ``qty``
whose value is less than or equal to ``20``:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 32
   :end-before: End Example 32

Specify Multiple Conditions for Array of Documents
--------------------------------------------------

When you specify conditions on more than one field nested in an array
of documents, you can specify the query such that either a single
document meets these conditions or any combination of documents in the
array meets the conditions.

A Single Nested Document Meets Multiple Query Conditions on Nested Fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$elemMatch` operator to specify multiple criteria on
an array of embedded documents such that at least one embedded
document satisfies all the specified criteria.

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains both the field
``qty`` equal to ``5`` and the field ``warehouse`` equal
to ``A``:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 34
   :end-before: End Example 34

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains the field ``qty`` that
is greater than ``10`` and less than or equal to ``20``:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 35
   :end-before: End Example 35

Combination of Elements Satisfies the Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If the compound query conditions on an array field do not use the
:query:`$elemMatch` operator, the query selects those documents whose
array contains any combination of elements that satisfies the
conditions.

For example, the following query matches documents where any document
nested in the ``instock`` array has the ``qty`` field greater than
``10`` and any document (but not necessarily the same embedded
document) in the array has the ``qty`` field less than or equal to
``20``:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 36
   :end-before: End Example 36

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains the field ``qty``
equal to ``5`` and at least one embedded document (but not necessarily
the same embedded document) that contains the field ``warehouse`` equal
to ``A``:

.. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 37
   :end-before: End Example 37
