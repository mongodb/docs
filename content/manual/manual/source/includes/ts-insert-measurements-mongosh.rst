Each document you insert should contain a single measurement. To insert
multiple documents at once, use the :method:`db.collection.insertMany()` method:

.. literalinclude:: /code-examples/tested/command-line/mongosh/timeseries/create-query/populate-collection.snippet.populate-collection.js
   :language: javascript
   :copyable: true
   :category: syntax example

To insert a single document, use the :method:`db.collection.insertOne()` method.

.. tip:: Optimize Insert Performance

   To learn how to optimize inserts for large operations, see
   :ref:`tsc-best-practice-optimize-inserts`.