Each document you insert should contain a single measurement. To insert
multiple documents at once, use the ``InsertMany()`` method:

.. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/CreateAndPopulateTimeSeriesCollection.snippet.timeseries-insert-many.cs
   :language: csharp
   :copyable: true
   :category: syntax example

To insert a single document, use the ``InsertOne()`` method.

For more information on inserting documents, 
see :driver:`Insert Operations </csharp/sync/current/crud/insert/>`.

.. tip:: Optimize Insert Performance

   To learn how to optimize inserts for large operations, see
   :ref:`tsc-best-practice-optimize-inserts`.