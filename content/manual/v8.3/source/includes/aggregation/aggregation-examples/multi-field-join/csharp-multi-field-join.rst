.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/csharp-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses two collections:

- ``products``, which contains documents describing the products that a shop sells
- ``orders``, which contains documents describing individual orders for products in a shop

An order can only contain one product. The aggregation uses a
multi-field join to match a product document to documents representing
orders of that product. The aggregation joins collections by the ``Name`` and
``Variation`` fields in documents in the ``products`` collection, corresponding
to the ``ProductName`` and ``ProductVariation`` fields in documents in the
``orders`` collection.

First, create C# classes to model the data in the ``products`` and ``orders``
collections:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Models.snippet.pocos.cs
   :language: csharp
   :copyable: true
   :category: usage example

To create the ``products`` and ``orders`` collections and insert the
sample data, add the following code to your application:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Tutorial.snippet.load-sample-data.cs
   :language: csharp
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a lookup stage to link the collections and import fields.

      The first stage of the pipeline is a :pipeline:`$lookup` stage to
      join the ``orders`` collection to the ``products`` collection by two
      fields in each collection. The lookup stage contains an
      embedded pipeline to configure the join.

      Instantiate the embedded pipeline, then chain a :pipeline:`$match`
      stage to match the values of two fields on each side of the join.
      Note that the following code uses aliases for the ``Name`` and
      ``Variation`` fields set when :ref:`creating the $lookup stage
      <csharp-multi-field-agg-lookup-stage>`:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Tutorial.snippet.embedded-pl-match-name-variation.cs
         :language: csharp
         :copyable: true
         :category: syntax example

      Within the embedded pipeline, add another :pipeline:`$match`
      stage to match orders placed in 2020:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Tutorial.snippet.embedded-pl-match-order-date.cs
         :language: csharp
         :copyable: true
         :category: syntax example

      Within the embedded pipeline, add a :pipeline:`$project` stage to
      remove unneeded fields from the ``orders`` collection side of the join:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Tutorial.snippet.embedded-pl-project.cs
         :language: csharp
         :copyable: true
         :category: syntax example

      .. _csharp-multi-field-agg-lookup-stage:

      After the embedded pipeline is completed, start the main
      aggregation on the ``products`` collection and chain the
      ``$lookup`` stage. Configure this stage to store the processed
      lookup fields in an array field called ``Orders``:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Tutorial.snippet.lookup.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a match stage for products ordered in 2020.

      Next, add a :pipeline:`$match` stage to only show
      products for which there is at least one order in 2020,
      based on the ``Orders`` array created in the previous step:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Tutorial.snippet.match.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a projection stage to remove unneeded fields.

      Finally, add a :pipeline:`$project` stage. The
      ``$project`` stage removes the ``_id`` and ``Description``
      fields from the result documents:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/Tutorial.snippet.project.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregated result contains two documents. The documents
      represent products for which there were orders placed in 2020.
      Each document contains an ``Orders`` array field that lists details
      about each order for that product:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinMultiField/TutorialOutput.txt
         :language: text
         :copyable: false
         :category: example return object

      The result documents contain details from documents in the
      ``orders`` collection and the ``products`` collection, joined by
      the product names and variations.

.. end-tutorial
