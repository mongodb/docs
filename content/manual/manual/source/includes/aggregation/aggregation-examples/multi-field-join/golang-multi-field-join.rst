.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/golang-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses two collections:

- ``products``, which contains documents describing the products that a shop sells
- ``orders``, which contains documents describing individual orders for products in a shop

An order can only contain one product. The aggregation uses a
multi-field join to match a product document to documents representing
orders of that product. The aggregation joins collections by the ``name`` and
``variation`` fields in documents in the ``products`` collection, corresponding
to the ``product_name`` and ``product_variation`` fields in documents in the
``orders`` collection.

First, create Go structs to model the data in the ``products`` and ``orders``
collections:

.. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/models.snippet.product-order.go
   :language: go
   :copyable: true
   :category: usage example

To create the ``products`` and ``orders`` collections and insert the
sample data, add the following code to your application:

.. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/load_data.snippet.example.go
   :language: go
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a lookup stage to link the collections and import fields.

      The first stage of the pipeline is a :pipeline:`$lookup` stage to join the
      ``orders`` collection to the ``products`` collection by two
      fields in each collection. The lookup stage contains an
      embedded pipeline to configure the join.

      Within the embedded pipeline, add a :pipeline:`$match` stage to match the
      values of two fields on each side of the join. Note that the following
      code uses aliases for the ``name`` and ``variation`` fields
      set when :ref:`creating the $lookup stage <golang-multi-field-agg-lookup-stage>`:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/run_pipeline.snippet.embedded-pl-match-product-info.go
         :language: go
         :copyable: true
         :category: syntax example

      Within the embedded pipeline, add another :pipeline:`$match` stage to match
      orders placed in 2020:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/run_pipeline.snippet.embedded-pl-match-order-date.go
         :language: go
         :copyable: true
         :category: syntax example

      Within the embedded pipeline, add an :pipeline:`$unset` stage to remove
      unneeded fields from the ``orders`` collection side of the join:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/run_pipeline.snippet.embedded-pl-unset.go
         :language: go
         :copyable: true
         :category: syntax example

      .. _golang-multi-field-agg-lookup-stage:

      After the embedded pipeline is completed, add the
      ``$lookup`` stage to the main aggregation pipeline.
      Configure this stage to store the processed lookup fields in
      an array field called ``orders``:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/run_pipeline.snippet.lookup.go
         :language: go
         :copyable: true
         :category: syntax example

   .. step:: Add a match stage for products ordered in 2020.

      Next, add a :pipeline:`$match` stage to only show
      products for which there is at least one order in 2020,
      based on the ``orders`` array calculated in the previous step:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/run_pipeline.snippet.match.go
         :language: go
         :copyable: true
         :category: syntax example

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` and ``description``
      fields from the result documents:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/run_pipeline.snippet.unset.go
         :language: go
         :copyable: true
         :category: syntax example

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``products`` collection:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/run_pipeline.snippet.run-agg.go
         :language: go
         :copyable: true
         :category: syntax example

      Finally, run the application and inspect the results.

   .. step:: Interpret the aggregation results.

      The aggregated result contains two documents. The documents
      represent products for which there were orders placed in 2020.
      Each document contains an ``orders`` array field that lists details
      about each order for that product:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_multi_field/output.txt
         :language: text
         :copyable: false
         :category: example return object

      The result documents contain details from documents in the
      ``orders`` collection and the ``products`` collection, joined by
      the product names and variations.

.. end-tutorial
