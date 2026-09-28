.. |query_operations| replace:: query operations on embedded/nested documents

This page provides examples of |query_operations| by using the
`MongoCollection.find() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/find.html>`__ method in the MongoDB
:driver:`Kotlin Coroutine Driver </kotlin/coroutine/current/>`.

.. tip::

   The driver provides `com.mongodb.client.model.Filters <{+java-api-docs+}/driver-core/com/mongodb/client/model/Filters.html>`__
   helper methods to facilitate the creation of filter
   documents. The examples on this page use these methods to
   create the filter documents.

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 14
   :end-before: End Example 14

Query Nested Fields with Dot Notation
-------------------------------------

Specify query conditions on fields in an embedded/nested document with
:term:`dot notation` ``"field.nestedField"``.

.. note::

  When you query with dot notation, the field and nested field must be
  inside quotation marks.

Specify Equality Match on a Nested Field
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example selects all documents where the field ``uom``
nested in the ``size`` field equals ``"in"``:

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 17
   :end-before: End Example 17

Specify Match using Query Operator
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to the equality condition, MongoDB provides
various :ref:`query operators <query-selectors>` to specify
filter conditions. Use the `com.mongodb.client.model.Filters <{+java-api-docs+}/driver-core/com/mongodb/client/model/Filters.html>`__ helper methods to
facilitate the creation of filter documents. For example:

.. code-block:: kotlin

   and(gte(<field1>, <value1>), lt(<field2>, <value2>), eq(<field3>, <value3>))

The following query uses the less than operator (:query:`$lt`) on
the field ``h`` embedded in the ``size`` field:

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 18
   :end-before: End Example 18

Specify ``AND`` Condition
~~~~~~~~~~~~~~~~~~~~~~~~~

The following query selects all documents where the nested field ``h``
is less than ``15``, the nested field ``uom`` equals ``"in"``, and the
``status`` field equals ``"D"``:

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 19
   :end-before: End Example 19

Match an Embedded/Nested Document
---------------------------------

To specify an equality condition on a field that is an
embedded document, use the `Document
<{+java-api-docs+}/bson/org/bson/Document.html>`__ class or
`eq()
<{+java-api-docs+}/driver-core/com/mongodb/client/model/Filters.html#eq(java.lang.String,TItem)>`__
method where ``<value>`` is the document to match:

.. code-block:: kotlin

   eq(<field>, Document()
      .append("nestedField1", value1)
      .append("nestedField2", value2))

For example, the following query selects all documents where the field
``size`` equals the document ``{ h: 14, w: 21, uom: "cm" }``:

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 15
   :end-before: End Example 15

.. warning::

   MongoDB does not recommend :ref:`comparisons <query-comparison>` on embedded
   documents because the operations require an *exact* match of the specified
   ``<value>`` document, including the field order.

   For example, the following query does not match any documents in the
   ``inventory`` collection:

   .. literalinclude:: /driver-examples/kotlin_examples.kt
      :language: kotlin
      :dedent:
      :start-after: Start Example 16
      :end-before: End Example 16

   Queries that use comparisons on embedded documents can result in
   unpredictable behavior when used with a driver that does not use ordered data
   structures for expressing queries. 
