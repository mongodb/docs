For additional query functionality, you can use the ``Aggregate()`` 
method to run an :ref:`aggregation pipeline <aggregation-pipeline>`.

For more information on aggregations, 
see :ref:`manual-timeseries-aggregations-operators`.

This example creates an aggregation pipeline that:

- Matches all documents with a ``sensor.sensor_id`` of "5578"
- Groups those documents by the date of the measurement
- Calculates the average of all temperature measurements that day in a new property
  called ``avgTemp``
- Returns a ``List<BsonDocument>``

.. io-code-block::

   .. input:: /code-examples/tested/csharp/driver/TimeSeries/CreateQuery/QueryTimeSeriesCollection.snippet.timeseries-aggregate.cs
      :language: csharp
      :category: syntax example

   .. output:: /code-examples/tested/csharp/driver/Aggregation/OutputFiles/AggregationOutput.txt
      :language: text

For more information on running aggregations using the C# Driver, see
:driver:`C# Driver Aggregations </csharp/sync/current/aggregation/>`.

For more information on how to access data from a cursor, 
see :driver:`Access Data From a Cursor </csharp/sync/current/crud/query-documents/cursor/>`.