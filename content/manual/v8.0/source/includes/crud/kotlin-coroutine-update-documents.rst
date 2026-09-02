This page uses the following
:driver:`Kotlin Coroutine Driver </kotlin/coroutine/current/>` methods:

- `MongoCollection.updateOne() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/update-one.html>`__
- `MongoCollection.updateMany() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/update-many.html>`__
- `MongoCollection.replaceOne() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/replace-one.html>`__

|populate-inventory|

.. note::

   The examples in this guide use the ``Updates`` and ``Filters`` builder factory classes. These classes
   provide helper methods to construct update documents and filter documents. To learn more about the
   ``Updates`` builder, see the :ref:`kotlin-updates-builders` guide. To learn more about the ``Filters``
   builder, see the :driver:`Filters Builders </kotlin/coroutine/upcoming/builders/filters/>` guide.

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 51
   :end-before: End Example 51

Update Documents in a Collection
--------------------------------

To modify field values, use :ref:`field-update-operators` 
such as :update:`$set`.

The driver provides the `com.mongodb.client.model.Updates
<{+java-api-docs+}/driver-core/com/mongodb/client/model/Updates.html>`__
class to build update documents. The following code shows an update 
document that uses methods from the ``Updates`` builder class:

.. code-block:: kotlin

   combine(set(<field1>, <value1>), set(<field2>, <value2>))

.. include:: /includes/fact-update-set-create-fields.rst

Update a Single Document
~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
`MongoCollection.updateOne()
<{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/update-one.html>`__
method on the ``inventory`` collection to update the *first*
document where ``item`` equals ``"paper"``:

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 52
   :end-before: End Example 52

.. include:: /includes/fact-update-operation-uses.rst

Update Multiple Documents
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
`MongoCollection.updateMany()
<{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/update-many.html>`__
method on the ``inventory`` collection to update all documents
where ``qty`` is less than ``50``:

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 53
   :end-before: End Example 53

.. include:: /includes/fact-update-many-operation-uses.rst

Replace a Document
~~~~~~~~~~~~~~~~~~

To replace the entire content of a document except for the ``_id``
field, pass an entirely new document as the second argument to
the `MongoCollection.replaceOne() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/replace-one.html>`__ method.

.. include:: /includes/fact-update-replace-example.rst

.. literalinclude:: /driver-examples/kotlin_examples.kt
   :language: kotlin
   :dedent:
   :start-after: Start Example 54
   :end-before: End Example 54

Behavior
--------

Atomicity
~~~~~~~~~

All write operations are atomic at the document level. For more information,
see :ref:`transactions-write-atomicity`.

``_id`` Field
~~~~~~~~~~~~~

Once set, you cannot update the ``_id`` field value nor can you replace a
document with one that has a different ``_id`` value.

Idempotent Operations 
~~~~~~~~~~~~~~~~~~~~~

Use ``updateMany()`` only for :term:`idempotent` operations.

Field Order
~~~~~~~~~~~

.. include:: /includes/fact-update-field-order.rst

Upsert Option
~~~~~~~~~~~~~

If the update and replace methods include the
`com.mongodb.client.model.UpdateOptions
<{+java-api-docs+}/driver-core/com/mongodb/client/model/UpdateOptions.html>`__
parameter that specifies ``upsert(true)``,
**and** no documents match the specified filter, then the
operation creates a new document and inserts it. If there are
matching documents, then the operation modifies or replaces
the matching document or documents.

For details on the new document created, see the individual
reference pages for the methods.

Write Acknowledgement
~~~~~~~~~~~~~~~~~~~~~

Specify the level of acknowledgment requested from MongoDB for write operations
with :ref:`write concerns <write-concern>`.

.. seealso::

   - `MongoCollection.updateOne() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/update-one.html>`__
   - `MongoCollection.updateMany() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/update-many.html>`__
   - `MongoCollection.replaceOne() <{+java-api-docs+}/driver-kotlin-coroutine/mongodb-driver-kotlin-coroutine/com.mongodb.kotlin.client.coroutine/-mongo-collection/replace-one.html>`__
   - :driver:`Kotlin Coroutine Driver Modify Documents Guide </kotlin/coroutine/current/fundamentals/crud/write-operations/modify/>`
