.. start-prep-steps

This example uses an ``orders`` collection, which contains documents
describing individual product orders. Because each order corresponds to
only one customer, the aggregation groups order documents by the ``customer_id``
field, which contains customer email addresses.

To create the ``orders`` collection, use the
:method:`~db.collection.insertMany()` method:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/load-data.js
   :language: javascript
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Run the aggregation pipeline.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.js
         :language: javascript
         :copyable: true
         :category: usage example

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020. The result documents contain details on all orders
      placed by a given customer, grouped by the customer's email
      address.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/output.sh
         :language: shell
         :copyable: false
         :category: example return object

.. end-tutorial
