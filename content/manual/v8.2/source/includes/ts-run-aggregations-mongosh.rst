For additional query functionality, you can use the :method:`db.collection.aggregate()` method
to run an :ref:`aggregation pipeline <aggregation-pipeline>`.

For more information on aggregations, 
see :ref:`manual-timeseries-aggregations-operators`.

This example:

- Groups all documents by the date of the measurement

- Calculates the average of all temperature measurements that day

- Returns a :ref:`cursor <cursors>` that can be used to iterate through the 
  resulting documents

.. io-code-block::

   .. input:: /code-examples/tested/command-line/mongosh/timeseries/create-query/aggregate.js
      :language: javascript
      :category: syntax example

   .. output:: /code-examples/tested/command-line/mongosh/timeseries/create-query/aggregate-output.sh
      :language: shell

For more information on how to access data from a cursor, see: 

- :ref:`Iterate a Cursor in mongosh <read-operations-cursors>`
- :ref:`<doc-cursor-methods>`