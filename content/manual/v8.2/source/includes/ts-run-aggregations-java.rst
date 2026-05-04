For additional query functionality, you can use the ``aggregate()`` 
method to run an :ref:`aggregation pipeline <aggregation-pipeline>`.

For more information on aggregations, 
see :ref:`manual-timeseries-aggregations-operators`.

This example:

- Groups all documents by the date of the measurement
- Calculates the average of all temperature measurements that day 
- Returns a :ref:`cursor <cursors>`

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.aggregate.java
   :language: java
   :copyable: true
   :category: syntax example

You can then use the cursor to iterate through the resulting documents:

.. io-code-block::

   .. input:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.cursor-iteration-aggregate.java
      :language: java
      :category: syntax example

   .. output:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/AggregationOutput.txt
      :language: text

For more information on running aggregations using the Java Driver, see
:driver:`Java Driver Aggregations </java/sync/current/aggregation/>`.

For more information on how to access data from a cursor, 
see :driver:`Access Data From a Cursor </java/sync/current/crud/query-documents/cursor/>`.