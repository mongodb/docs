For additional query functionality, you can use the ``aggregate()``
method to run an :ref:`aggregation pipeline <aggregation-pipeline>`.

For more information on aggregations,
see :ref:`manual-timeseries-aggregations-operators`.

This example:

- Finds all documents where the sensor ID is 5578
- Groups all documents by the date of the measurement
- Calculates the average of all temperature measurements that day
- Sorts the results by the average temperature in descending order

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_create_and_query.snippet.aggregate-time-series.py
   :language: python
   :copyable: true
   :category: syntax example

The example returns a :ref:`cursor <cursors>`. You can use the cursor to
iterate through the resulting documents:

.. io-code-block::

   .. input:: /code-examples/tested/python/pymongo/timeseries/ts_create_and_query.snippet.print-results.py
      :language: python
      :category: syntax example

   .. output:: /code-examples/tested/python/pymongo/timeseries/ts-create-and-query-aggregation-output.txt
      :language: text

For more information on running aggregations using the PyMongo Driver, see
:languages:`PyMongo Driver Aggregation </python/pymongo-driver/current/aggregation/>`.

For more information on how to access data from a cursor,
see :languages:`Access Data From a Cursor </python/pymongo-driver/current/crud/query/cursors/>`.
