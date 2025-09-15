.. start-prep-steps

This example uses an ``orders`` collection, which contains documents
describing product orders. Because each order contains multiple products,
the first step of the aggregation unpacks the products array into
individual product order documents.

To create the ``orders`` collection, use the
:method:`~db.collection.insertMany()` method:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/unwind/load-data.js
   :language: javascript
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Run the aggregation pipeline.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/unwind/run-pipeline.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/unwind/output.sh
         :language: shell
         :copyable: false
         :category: example return object

      .. note::

         If you run this example, the order of documents in your results
         might differ from the order of documents on this page because the
         aggregation pipeline does not contain a sort stage.

.. end-tutorial
