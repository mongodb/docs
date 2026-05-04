You query a time series collection the same way you query a standard MongoDB collection.

To return one document from a time series collection, you can use the 
``findOne()`` method. This returns a :ref:`cursor <cursors>`.

The following example uses the ``projection`` field in the query to omit 
the ``_id`` field from the results:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.find-one.java
   :language: java
   :copyable: true
   :category: syntax example

You can then use the cursor to access the resulting document:

.. io-code-block::

   .. input:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.cursor-iteration-find.java
      :language: java
      :category: syntax example

   .. output:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/FindOneOutput.txt
      :language: text

For more information on querying your collection, see
:driver:`MongoDB Java Driver documentation </java/sync/current/crud/query-documents/find/>`.

.. tip:: Optimize Query Performance

   To learn how to optimize queries on your time series collection, see
   :ref:`tsc-best-practice-optimize-query-performance`.