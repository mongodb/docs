You query a time series collection the same way you query a standard MongoDB collection.

To return one document from a time series collection, you can use the
``find_one()`` method. This returns a :ref:`cursor <cursors>`.

The following example uses ``"_id": 0`` in the query to omit the ``_id`` field
from the results:

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_create_and_query.snippet.query-time-series.py
   :language: python
   :copyable: true
   :category: syntax example

The ``find_one()`` method returns a single document that matches the query:

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts-create-and-query-output.txt
   :language: text
   :copyable: false
   :category: example return object

For more information on querying your collection, see
:languages:`MongoDB PyMongo Driver documentation </python/pymongo-driver/current/crud/query/>`.

.. tip:: Optimize Query Performance

   To learn how to optimize queries on your time series collection, see
   :ref:`tsc-best-practice-optimize-query-performance`.
