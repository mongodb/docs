This page uses the following `MongoDB Scala Driver
<http://mongodb.github.io/mongo-scala-driver/>`_ methods:

- :scala-api:`collection.deleteMany()
  <deleteMany(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
- :scala-api:`collection.deleteOne()
  <deleteOne(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
   :language: scala
   :dedent: 4
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter<document-query-filter>` ``Document()`` to the
:scala-api:`collection.deleteMany()
<deleteMany(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
   :language: scala
   :dedent: 4
   :start-after: Start Example 56
   :end-before: End Example 56

Upon successful execution, the
:scala-api:`collection.deleteMany()
<deleteMany(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
method returns an
`Observable <http://mongodb.github.io/mongo-scala-driver/2.1/reference/observables/>`_
with a single element with a ``DeleteResult`` type parameter or with
an ``com.mongodb.MongoException``.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use the
``com.mongodb.client.model.Filters.eq_`` method to create the
:ref:`query filter document <document-query-filter>`:

.. code-block:: scala

   and(equal(<field1>, <value1>), equal(<field2>, <value2>) ...)

In addition to the equality condition, MongoDB provides
various :ref:`query operators <query-selectors>` to specify
filter conditions. Use the
``com.mongodb.client.model.Filters_`` helper methods to
facilitate the creation of filter documents. For example:

.. code-block:: scala

   and(gte(<field1>, <value1>), lt(<field2>, <value2>), equal(<field3>, <value3>))

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:scala-api:`deleteMany()
<deleteMany(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
   :language: scala
   :dedent: 4
   :start-after: Start Example 57
   :end-before: End Example 57

Upon successful execution, the
:scala-api:`collection.deleteMany()
<deleteMany(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
method returns an
`Observable <http://mongodb.github.io/mongo-scala-driver/2.1/reference/observables/>`_
with a single element with a ``DeleteResult`` type parameter or with
an ``com.mongodb.MongoException``.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :scala-api:`collection.deleteOne()
<deleteOne(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
   :language: scala
   :dedent: 4
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - :scala-api:`collection.deleteMany()
     <deleteMany(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
   - :scala-api:`collection.deleteOne()
     <deleteOne(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>`
   - :ref:`additional-deletes`
