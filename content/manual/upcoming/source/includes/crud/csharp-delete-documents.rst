This page uses the following :driver:`MongoDB C# Driver </csharp/>`
methods:

- :csharp-api:`IMongoCollection.DeleteMany()
  <M_MongoDB_Driver_IMongoCollection_1_DeleteMany>`
- :csharp-api:`IMongoCollection.DeleteOne()
  <M_MongoDB_Driver_IMongoCollection_1_DeleteOne>`

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/DocumentationExamples.cs
   :language: csharp
   :dedent: 12
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter<document-query-filter>`
``Builders<BsonDocument>.Filter.Empty`` to the
:csharp-api:`IMongoCollection.DeleteMany()
<M_MongoDB_Driver_IMongoCollection_1_DeleteMany>` method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/DocumentationExamples.cs
   :language: csharp
   :dedent: 12
   :start-after: Start Example 56
   :end-before: End Example 56

Upon successful execution, the
:csharp-api:`IMongoCollection.DeleteMany()
<M_MongoDB_Driver_IMongoCollection_1_DeleteMany>` method returns an
instance of :csharp-api:`DeleteResult
<T_MongoDB_Driver_DeleteResult>` whose ``DeletedCount`` property
contains the number of documents that matched the filter.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, construct a filter using the
:csharp-api:`Eq
<Overload_MongoDB_Driver_FilterDefinitionBuilder_1_Eq>` method:

.. code-block:: csharp

   Builders<BsonDocument>.Filter.Eq(<field>, <value>);

In addition to the equality filter, MongoDB provides
various :ref:`query operators <query-selectors>` to specify
filter conditions. Use the
:csharp-api:`FilterDefinitionBuilder
<T_MongoDB_Driver_FilterDefinitionBuilder_1>` methods to
create a filter document. For example:

.. code-block:: csharp

   var builder = Builders<BsonDocument>.Filter;
   builder.And(builder.Eq(<field1>, <value1>), builder.Lt(<field2>, <value2>));

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:csharp-api:`IMongoCollection.DeleteMany()
<M_MongoDB_Driver_IMongoCollection_1_DeleteMany>` method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationExamples.cs
   :language: csharp
   :dedent: 12
   :start-after: Start Example 57
   :end-before: End Example 57

Upon successful execution, the
:csharp-api:`IMongoCollection.DeleteMany()
<M_MongoDB_Driver_IMongoCollection_1_DeleteMany>` method returns an
instance of :csharp-api:`DeleteResult
<T_MongoDB_Driver_DeleteResult>` whose ``DeletedCount`` property
contains the number of documents that matched the filter.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :csharp-api:`IMongoCollection.DeleteOne()
<M_MongoDB_Driver_IMongoCollection_1_DeleteOne>` method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationExamples.cs
   :language: csharp
   :dedent: 12
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - :csharp-api:`IMongoCollection.DeleteMany()
     <M_MongoDB_Driver_IMongoCollection_1_DeleteMany>`
   - :csharp-api:`IMongoCollection.DeleteOne()
     <M_MongoDB_Driver_IMongoCollection_1_DeleteOne>`
   - :ref:`additional-deletes`
