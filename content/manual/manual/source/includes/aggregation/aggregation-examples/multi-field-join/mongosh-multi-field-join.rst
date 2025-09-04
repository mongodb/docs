.. start-prep-steps

This example uses two collections:

- ``products``, which contains documents describing the products that a shop sells
- ``orders``, which contains documents describing individual orders for products in a shop

An order can only contain one product. The aggregation uses a
multi-field join to match a product document to documents representing
orders of that product. The aggregation joins collections by the ``name`` and
``variation`` fields in documents in the ``products`` collection, corresponding
to the ``product_name`` and ``product_variation`` fields in documents in the
``orders`` collection.

To create the ``orders`` and ``products`` collections, use the
:method:`~db.collection.insertMany()` method:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-multi-field/load-data-orders.js
   :language: javascript
   :copyable: true
   :category: usage example

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-multi-field/load-data-products.js
   :language: javascript
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Create an embedded pipeline to use in the lookup stage.

      The first stage of the pipeline is a ``$lookup`` stage to join the
      ``orders`` collection to the ``products`` collection by two
      fields in each collection. The ``$lookup`` stage contains an embedded
      pipeline to configure the join.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-multi-field/create-embedded-pipeline.js
         :language: javascript
         :copyable: true
         :category: usage example

   .. step:: Run the aggregation pipeline.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-multi-field/run-pipeline.js
         :language: javascript
         :copyable: true
         :category: usage example

   .. step:: Interpret the aggregation results.

      The aggregated results contain two documents. The documents
      represent products ordered 2020. Each document contains an
      ``orders`` array field that lists details about each order for
      that product.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-multi-field/output.sh
         :language: shell
         :copyable: false
         :category: example return object

.. end-tutorial
