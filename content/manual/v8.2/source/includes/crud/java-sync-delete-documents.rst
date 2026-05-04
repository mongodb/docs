This page uses the following `Java Synchronous Driver`_ methods:

- com.mongodb.client.MongoCollection.deleteMany_
- com.mongodb.client.MongoCollection.deleteOne_

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
org.bson.Document_ object as the
:ref:`filter<document-query-filter>` to the
com.mongodb.client.MongoCollection.deleteMany_ method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 56
   :end-before: End Example 56

The com.mongodb.client.MongoCollection.deleteMany_ method returns an
instance of com.mongodb.client.result.DeleteResult_ with the status
of the operation.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use the
``com.mongodb.client.model.Filters.eq_`` method to create the
:ref:`query filter document <document-query-filter>`:

.. code-block:: java

   and(eq(<field1>, <value1>), eq(<field2>, <value2>) ...)

In addition to the equality condition, MongoDB provides
various :ref:`query operators <query-selectors>` to specify
filter conditions. Use the
com.mongodb.client.model.Filters_ helper methods to
facilitate the creation of filter documents. For example:

.. code-block:: java

   and(gte(<field1>, <value1>), lt(<field2>, <value2>), eq(<field3>, <value3>))

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
com.mongodb.client.MongoCollection.deleteMany_ method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 57
   :end-before: End Example 57

The com.mongodb.client.MongoCollection.deleteMany_ method returns an
instance of com.mongodb.client.result.DeleteResult_ with the status
of the operation.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the com.mongodb.client.MongoCollection.deleteOne_ method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationSamples.java
   :language: java
   :dedent: 8
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - com.mongodb.client.MongoCollection.deleteMany_
   - com.mongodb.client.MongoCollection.deleteOne_
   - `Additional Java Synchronous Driver Write Examples`_
