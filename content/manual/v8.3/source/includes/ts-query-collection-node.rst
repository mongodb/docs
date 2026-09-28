You query a time series collection the same way you query a standard MongoDB collection.

To return one document from a time series collection, you can use the 
``findOne()`` method. The following example uses the ``projection`` 
field in the query to omit the ``_id`` field from the returned documents:

.. io-code-block::

   .. input:: /code-examples/tested/javascript/driver/time-series/create-query/create-query-collection.snippet.find-one.js
      :language: javascript
      :category: syntax example

   .. output:: /code-examples/tested/javascript/driver/time-series/create-query/create-query-find-one-output.sh
      :language: shell

For more information on time series queries, see
:ref:`tsc-best-practice-optimize-query-performance`.