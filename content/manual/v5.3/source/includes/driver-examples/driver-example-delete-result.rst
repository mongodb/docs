.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         The method returns a document with the status of the operation. For
         more information and examples, see
         :method:`~db.collection.deleteMany()`.

     - id: python
       content: |
         The :py:meth:`~pymongo.collection.Collection.delete_many`
         method returns an instance of
         :py:class:`pymongo.results.DeleteResult` with the status of the
         operation.

     - id: motor
       content: |
         The :py:meth:`~motor.motor_asyncio.AsyncIOMotorCollection.delete_many`
         coroutine asynchronously returns an instance of
         :py:class:`pymongo.results.DeleteResult` with the status of the
         operation.

     - id: java-sync
       content: |
         The com.mongodb.client.MongoCollection.deleteMany_
         method returns an instance of
         com.mongodb.client.result.DeleteResult_
         with the status of the
         operation.

     - id: java-async
       content: |
         `com.mongodb.reactivestreams.client.MongoCollection.deleteMany
         <http://mongodb.github.io/mongo-java-driver-reactivestreams/1.6/javadoc/com/mongodb/reactivestreams/client/MongoCollection.html#deleteMany(org.bson.conversions.Bson)>`_
         returns a `Publisher <http://www.reactive-streams.org/reactive-streams-1.0.1-javadoc/org/reactivestreams/Publisher.html>`_
         object of type com.mongodb.client.result.DeleteResult_ if
         successful. Returns an instance of ``com.mongodb.MongoException`` if unsuccessful.

     - id: nodejs
       content: |
         :node-api:`deleteMany() <Collection.html#deleteMany>` returns a
         promise that provides a ``result``. The ``result.deletedCount``
         property contains the number of documents that matched the
         filter.

     - id: php
       content: |
         Upon successful execution, the
         :phpmethod:`deleteMany() <phpmethod.MongoDB\\Collection::deleteMany>`
         method returns an instance of
         :phpclass:`MongoDB\\DeleteResult <phpclass.MongoDB\\DeleteResult>`
         whose :phpmethod:`getDeletedCount()<phpmethod.MongoDB\\DeleteResult::getDeletedCount>`
         method returns the number of documents that matched the filter.

     - id: perl
       content: |
         Upon successful execution, the
         :perl-api:`delete_many()<Collection#delete_many>` method
         returns an instance of
         :perl-api:`MongoDB::DeleteResult<DeleteResult>` whose
         ``deleted_count`` attribute contains the number of documents
         that matched the filter.

     - id: ruby
       content: |
         Upon successful execution, the
         :ruby-api:`delete_many()<Collection.html#delete_many-instance_method>` method
         returns an instance of
         :ruby-api:`Mongo::Operation::Result<Operation/Result.html>`, whose
         ``deleted_count`` attribute contains the number of documents
         that matched the filter.

     - id: scala
       content: |
         Upon successful execution, the
         :scala-api:`collection.deleteMany()<deleteMany(filter:org.mongodb.scala.bson.conversions.Bson,options:org.mongodb.scala.model.DeleteOptions):org.mongodb.scala.SingleObservable[org.mongodb.scala.result.DeleteResult]>` method
         returns an
         `Observable <http://mongodb.github.io/mongo-scala-driver/2.1/reference/observables/>`_
         with a single element with a ``DeleteResult`` type parameter or with
         an ``com.mongodb.MongoException``.

     - id: csharp
       content: |
         Upon successful execution, the
         :csharp-api:`IMongoCollection.DeleteMany() <M_MongoDB_Driver_IMongoCollection_1_DeleteMany>`
         method returns an instance of
         :csharp-api:`DeleteResult <T_MongoDB_Driver_DeleteResult>` whose
         ``DeletedCount`` property contains the number of documents
         that matched the filter.

     - id: go
       content: |
         Upon successful execution, the
         :go-api:`Collection.DeleteMany <mongo#Collection.DeleteMany>`
         function returns an instance of
         :go-api:`DeleteResult <mongo#DeleteResult>` whose
         ``DeletedCount`` property contains the number of documents
         that matched the filter.
