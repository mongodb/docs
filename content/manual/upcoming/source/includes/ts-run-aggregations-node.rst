For additional query functionality, you can use the ``aggregate()`` 
method to run an :ref:`aggregation pipeline <aggregation-pipeline>`.

For more information on aggregations, 
see :ref:`manual-timeseries-aggregations-operators`.

This example groups all documents by the date of the measurement, then 
calculates the average of all temperature measurements that day and returns
a :ref:`cursor <cursors>`:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/create-query/create-query-collection.snippet.aggregate.js
   :language: javascript
   :copyable: true
   :category: syntax example

You can then iterate through the resulting documents:

.. io-code-block::

   .. input:: /code-examples/tested/javascript/driver/time-series/create-query/create-query-collection.snippet.cursor-iterate.js
      :language: javascript
      :category: syntax example

   .. output:: /code-examples/tested/javascript/driver/time-series/create-query/create-query-cursor-iteration-output.sh
      :language: shell

For more information on how to access data from a cursor, 
see :driver:`Access Data From a Cursor </node/current/crud/query/cursor/>`.