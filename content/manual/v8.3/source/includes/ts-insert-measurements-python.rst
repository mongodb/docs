Each document you insert should contain a single measurement. To insert
multiple documents at once, use the ``insert_many()`` method:

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_create_and_query.snippet.add-sample-docs.py
   :language: python
   :copyable: true
   :category: syntax example

To insert a single document, use the ``insert_one()`` method.

For more information on inserting documents,
see :languages:`Insert Operations </python/pymongo-driver/current/crud/insert/>`.

.. tip:: Optimize Insert Performance

   To learn how to optimize inserts for large operations, see
   :ref:`tsc-best-practice-optimize-inserts`.
