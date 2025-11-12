Each document you insert should contain a single measurement. To insert
multiple documents at once, use the ``insertMany()`` method:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/create-query/create-query-collection.snippet.insert-many.js
   :language: javascript
   :copyable: true
   :category: syntax example

To insert a single document, use the ``insertOne()`` method.

.. tip:: Optimize Insert Performance

   To learn how to optimize inserts for large operations, see
   :ref:`tsc-best-practice-optimize-inserts`.