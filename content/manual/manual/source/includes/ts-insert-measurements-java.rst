Each document you insert should contain a single measurement. To insert
multiple documents at once, use the ``insertMany()`` method:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.insert-documents.java
   :language: java
   :copyable: true
   :category: syntax example

To insert a single document, use the ``insertOne()`` method.

For more information on inserting documents, 
see :driver:`Insert Operations </java/sync/current/crud/insert/>`.

.. tip:: Optimize Insert Performance

   To learn how to optimize inserts for large operations, see
   :ref:`tsc-best-practice-optimize-inserts`.