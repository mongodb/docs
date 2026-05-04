This page uses the following :driver:`Kotlin Coroutine Driver
</kotlin/coroutine/current/>` methods:

- `MongoCollection.deleteOne()
  <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-one.html>`__
- `MongoCollection.deleteMany()
  <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-many.html>`__

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty ``Bson``
object as the :ref:`filter <document-query-filter>` to the
`MongoCollection.deleteMany()
<{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-many.html>`__
method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 56
   :end-before: End Example 56

The `MongoCollection.deleteMany()
<{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-many.html>`__
method returns an instance of `com.mongodb.client.result.DeleteResult
<{+java-api-docs+}/driver-core/com/mongodb/client/result/DeleteResult.html>`__
that describes the status of the operation and count of deleted
documents.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use the
`Filters.eq()
<{+java-api-docs+}/driver-core/com/mongodb/client/model/Filters.html#eq(java.lang.String,TItem)>`__
method to create the
:ref:`query filter document <document-query-filter>`:

.. code-block:: kotlin

   and(eq(<field1>, <value1>), eq(<field2>, <value2>) ...)

In addition to the equality condition, MongoDB provides
various :ref:`query operators <query-selectors>` to specify
filter conditions. Use the
`com.mongodb.client.model.Filters
<{+java-api-docs+}/driver-core/com/mongodb/client/model/Filters.html>`__
helper methods to facilitate the creation of filter documents.
For example:

.. code-block:: kotlin

   and(gte(<field1>, <value1>), lt(<field2>, <value2>), eq(<field3>, <value3>))

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
`MongoCollection.deleteMany()
<{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-many.html>`__
method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 57
   :end-before: End Example 57

The `MongoCollection.deleteMany()
<{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-many.html>`__
method returns an instance of `com.mongodb.client.result.DeleteResult
<{+java-api-docs+}/driver-core/com/mongodb/client/result/DeleteResult.html>`__
that describes the status of the operation and count of deleted
documents.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter,
even if multiple documents match the specified filter, use the
`MongoCollection.deleteOne()
<{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-one.html>`__
method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. seealso::

   - `MongoCollection.deleteOne()
     <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-one.html>`__
   - `MongoCollection.deleteMany()
     <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/delete-many.html>`__
   - :driver:`Kotlin Coroutine Driver Delete Documents Guide
     </kotlin/coroutine/current/fundamentals/crud/write-operations/delete/>`
