.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/golang-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses two collections:

- ``orders``: documents that describe individual orders for products in a shop
- ``products``: documents that describe the products that a shop sells

An order can only contain one product. The aggregation uses a
one-to-one join to match an order document to the corresponding product
document. The aggregation joins the collections by the ``product_id`` field
that exists in documents in both collections.

First, create Go structs to model the data in the ``orders`` and ``products``
collections:

.. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/models.snippet.order-and-product.go
   :language: go
   :copyable: true
   :category: usage example

To create the ``orders`` and ``products`` collections and insert the
sample data, add the following code to your application:

.. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/load_data.snippet.example.go
   :language: go
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      Add a :pipeline:`$match` stage that matches
      orders placed in 2020:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/run_pipeline.snippet.match.go
         :language: go
         :copyable: true
         :category: syntax example

   .. step:: Add a lookup stage to link the collections.

      Next, add a :pipeline:`$lookup` stage. The
      ``$lookup`` stage joins the ``product_id`` field in the ``orders``
      collection to the ``id`` field in the ``products`` collection:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/run_pipeline.snippet.lookup.go
         :language: go
         :copyable: true
         :category: syntax example

   .. step:: Add set stages to create new document fields.

      Next, add two :pipeline:`$set`
      stages to the pipeline.

      The first ``$set`` stage sets the ``product_mapping`` field
      to the first element in the ``product_mapping`` object
      created in the previous ``$lookup`` stage.

      The second ``$set`` stage creates two new fields, ``product_name``
      and ``product_category``, from the values in the
      ``product_mapping`` object field:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/run_pipeline.snippet.set.go
         :language: go
         :copyable: true
         :category: syntax example

      .. tip::

         Because this is a one-to-one join, the ``$lookup`` stage
         adds only one array element to the input document. The pipeline
         uses the :group:`$first`
         operator to retrieve the data from this element.

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes unnecessary fields from the document:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/run_pipeline.snippet.unset.go
         :language: go
         :copyable: true
         :category: syntax example

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/run_pipeline.snippet.run-agg.go
         :language: go
         :copyable: true
         :category: syntax example

      Finally, run the application and inspect the results.

   .. step:: Interpret the aggregation results.

      The aggregated result contains three documents. The documents
      represent customer orders that occurred in 2020, with the
      ``product_name`` and ``product_category`` of the ordered product:

      .. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/join_one_to_one/output.txt
         :language: text
         :copyable: false
         :category: example return object

      The result consists of documents that contain fields from
      documents in the ``orders`` collection and the ``products``
      collection, joined by matching the ``product_id`` field present in
      each original document.

.. end-tutorial
