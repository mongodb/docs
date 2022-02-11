.. tabs-drivers::

   tabs:
   - id: shell
     content: |
       The operation returns a ``WriteResult`` document that contains the status
       of the operation:

       .. code-block:: sh

          WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

   - id: python
     content: |
       The operation returns an instance of
       :py:class:`pymongo.results.UpdateResult` that contains the
       status of the operation.

   - id: motor
     content: |
       The operations asynchronously return instances of
       :py:class:`pymongo.results.UpdateResult` that contains the
       status of the operation.

   - id: java-sync
     content: |
       The operation returns an instance of
       com.mongodb.client.result.UpdateResult_
       with the status of the
       operation.

   - id: nodejs
     content: |
       The operation returns a promise that provides a ``result``
       containing the status of the operation.

   - id: csharp
     content: |
       Upon successful execution, the operation returns an instance of
       :csharp-api:`UpdateResult <T_MongoDB_Driver_UpdateResult>` that
       contains the status of the operation.

.. _com.mongodb.client.result.UpdateResult: https://mongodb.github.io/mongo-java-driver/3.4/javadoc/com/mongodb/client/result/UpdateResult

..
   # - id: java-async
   #   content: |
   #     The operation returns an instance of
   #     com.mongodb.client.result.UpdateResult_
   #     with the status of the
   #     operation.
   #
   # - id: php
   #   content: |
   #     The operation returns an instance of
   #     :phpclass:`MongoDB\\UpdateResult <phpclass.MongoDB\\UpdateResult>`
   #     that contains the status of the operation.
   #
   # - id: perl
   #   content: |
   #     Upon successful execution, the operation returns an instance of
   #     :perl-api:`MongoDB::UpdateResult<UpdateResult>` that contains the
   #     status of the operation.
   #
   # - id: ruby
   #   content: |
   #     Upon successful execution, the operation returns an instance of
   #     :ruby-api:`Mongo::Operation::Result<Operation/Result.html>`
   #     that contains the status of the operation.
   #
   # - id: scala
   #   content: |
   #     Upon successful execution, the operation returns an
   #     `Observable <http://mongodb.github.io/mongo-scala-driver/2.1/reference/observables/>`_
   #     contains the status of the operation.

