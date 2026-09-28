This page uses the
following `Java Synchronous Driver`_ methods:

- com.mongodb.client.MongoCollection.updateOne_
- com.mongodb.client.MongoCollection.updateMany_
- com.mongodb.client.MongoCollection.replaceOne_

|populate-inventory|

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 51
   :end-before: End Example 51

Update Documents in a Collection
--------------------------------

To modify field values, use :ref:`field-update-operators`
such as :update:`$set`.

The driver provides the `com.mongodb.client.model.Updates 
<http://mongodb.github.io/mongo-java-driver/3.4/javadoc/com/mongodb/client/model/Updates.html>`__
class to build update documents:

.. code-block:: java

   combine(set(<field1>, <value1>), set(<field2>, <value2>))

For a list of the update helpers, see
`com.mongodb.client.model.Updates
<http://mongodb.github.io/mongo-java-driver/3.4/javadoc/com/mongodb/client/model/Updates.html>`__.

.. include:: /includes/fact-update-set-create-fields.rst

Update a Single Document
~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
com.mongodb.client.MongoCollection.updateOne_ method on the
``inventory`` collection to update the *first* document where
``item`` equals ``"paper"``:

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 52
   :end-before: End Example 52

.. include:: /includes/fact-update-operation-uses.rst

Update Multiple Documents
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
com.mongodb.client.MongoCollection.updateMany_ method on
the ``inventory`` collection to update all documents where
``qty`` is less than ``50``:

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 53
   :end-before: End Example 53

.. include:: /includes/fact-update-many-operation-uses.rst

Replace a Document
~~~~~~~~~~~~~~~~~~

To replace the entire content of a document except for the ``_id``
field, pass an entirely new document as the second argument to
com.mongodb.client.MongoCollection.replaceOne_.

.. include:: /includes/fact-update-replace-example.rst

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
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
com.mongodb.client.model.UpdateOptions_ parameter that
specifies `com.mongodb.client.model.UpdateOptions.upsert(true)`_
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

   - com.mongodb.client.MongoCollection.updateOne_
   - com.mongodb.client.MongoCollection.updateMany_
   - com.mongodb.client.MongoCollection.replaceOne_
   - `Additional Java Synchronous Driver Write Examples`_
