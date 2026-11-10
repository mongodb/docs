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

.. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
   :language: csharp
   :copyable: true
   :start-after: start-pocos
   :end-before: end-pocos
   :dedent:

To create the ``products`` and ``orders`` collections and insert the
sample data, add the following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
   :language: csharp
   :copyable: true
   :start-after: start-insert-sample-data
   :end-before: end-insert-sample-data
   :dedent:

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

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
         :language: csharp
         :copyable: true
         :start-after: start-embedded-pl-match1
         :end-before: end-embedded-pl-match1
         :dedent:

      Within the embedded pipeline, add another :pipeline:`$match`
      stage to match orders placed in 2020:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
         :language: csharp
         :copyable: true
         :start-after: start-embedded-pl-match2
         :end-before: end-embedded-pl-match2
         :dedent:

      Within the embedded pipeline, add a :pipeline:`$project` stage to
      remove unneeded fields from the ``orders`` collection side of the join:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
         :language: csharp
         :copyable: true
         :start-after: start-embedded-pl-project
         :end-before: end-embedded-pl-project
         :dedent:

      .. _csharp-multi-field-agg-lookup-stage:

      After the embedded pipeline is completed, start the main
      aggregation on the ``products`` collection and chain the
      ``$lookup`` stage. Configure this stage to store the processed
      lookup fields in an array field called ``Orders``:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
         :language: csharp
         :copyable: true
         :start-after: start-lookup
         :end-before: end-lookup
         :dedent:

   .. step:: Add a match stage for products ordered in 2020.

      Next, add a :pipeline:`$match` stage to only show
      products for which there is at least one order in 2020,
      based on the ``Orders`` array created in the previous step:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
         :language: csharp
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a projection stage to remove unneeded fields.

      Finally, add a :pipeline:`$project` stage. The
      ``$project`` stage removes the ``_id`` and ``Description``
      fields from the result documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/MultiFieldJoin.cs
         :language: csharp
         :copyable: true
         :start-after: start-project
         :end-before: end-project
         :dedent:

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregated result contains two documents. The documents
      represent products for which there were orders placed in 2020.
      Each document contains an ``Orders`` array field that lists details
      about each order for that product:

      .. code-block:: none
         :copyable: false
         
         { "Name" : "Asus Laptop", "Variation" : "Standard Display", "Category" : "ELECTRONICS", "Orders" : [{ "CustomerId" : "elise_smith@myemail.com", "OrderDate" : { "$date" : "2020-05-30T08:35:52Z" }, "Value" : 431.43000000000001 }, { "CustomerId" : "jjones@tepidmail.com", "OrderDate" : { "$date" : "2020-12-26T08:55:46Z" }, "Value" : 429.64999999999998 }] }
         { "Name" : "Morphy Richards Food Mixer", "Variation" : "Deluxe", "Category" : "KITCHENWARE", "Orders" : [{ "CustomerId" : "oranieri@warmmail.com", "OrderDate" : { "$date" : "2020-01-01T08:25:37Z" }, "Value" : 63.130000000000003 }] }
         
      The result documents contain details from documents in the
      ``orders`` collection and the ``products`` collection, joined by
      the product names and variations.

.. end-tutorial
