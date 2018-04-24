.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         The operation returns a document that contains
         the status of the operation:
         
         .. code-block:: sh
         
            { "acknowledged" : true, "deletedCount" : 1 }

     - id: python
       content: |
         The operation returns an instance of
         :py:class:`pymongo.results.DeleteResult` with the status of the
         operation.

     - id: motor
       content: |
         The operation asynchronously returns an instance of
         :py:class:`pymongo.results.DeleteResult` with the status of the
         operation.

     - id: java-sync
       content: |
         The operation returns an instance of
         com.mongodb.client.result.DeleteResult_
         with the status of the
         operation.

     - id: java-async
       content: |
         The operation returns a `Publisher <http://www.reactive-streams.org/reactive-streams-1.0.1-javadoc/org/reactivestreams/Publisher.html>`_
         object of type com.mongodb.client.result.DeleteResult_ if
         successful. Returns an instance of ``com.mongodb.MongoException`` if unsuccessful.

     - id: nodejs
       content: |
         The operation returns a
         promise that provides a ``result``. The ``result.deletedCount``
         property contains the number of documents that matched the
         filter.

     # - id: php
     #   content: |
     #     The
     #     operation returns an instance of
     #     :phpclass:`MongoDB\\DeleteResult <phpclass.MongoDB\\DeleteResult>`
     #     whose :phpmethod:`getDeletedCount()<phpmethod.MongoDB\\DeleteResult::getDeletedCount>`
     #     method returns the number of documents that matched the filter.
     #
     # - id: perl
     #   content: |
     #     The operation
     #     returns an instance of
     #     :perl-api:`MongoDB::DeleteResult<DeleteResult>` whose
     #     ``deleted_count`` attribute contains the number of documents
     #     that matched the filter.
     #
     # - id: ruby
     #   content: |
     #     The operation returns an instance of
     #     :ruby-api:`Mongo::Operation::Result<Operation/Result.html>`, whose
     #     ``deleted_count`` attribute contains the number of documents
     #     that matched the filter.
     #
     # - id: scala
     #   content: |
     #     The operation returns an
     #     `Observable <http://mongodb.github.io/mongo-scala-driver/2.1/reference/observables/>`_
     #     with a single element with a ``DeleteResult`` type parameter or with
     #     an ``com.mongodb.MongoException``.

     - id: csharp
       content: |
         The operation returns an instance of
         :csharp-api:`DeleteResult <T_MongoDB_Driver_DeleteResult>` whose
         ``DeletedCount`` property contains the number of documents
         that matched the filter.


.. _com.mongodb.client.result.DeleteResult: https://mongodb.github.io/mongo-java-driver/3.4/javadoc/com/mongodb/client/result/DeleteResult
