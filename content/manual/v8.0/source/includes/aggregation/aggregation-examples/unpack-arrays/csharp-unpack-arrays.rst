.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/csharp-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing product orders. Because each order contains multiple products,
the first step of the aggregation unpacks the products array into
individual product order documents.

First, create C# classes to model the data in the ``orders``
collection:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Unwind/Models.snippet.models.cs
   :language: csharp
   :copyable: true
   :category: usage example

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Unwind/Tutorial.snippet.load-sample-data.cs
   :language: csharp
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add an unwind stage to unpack the array of product orders.

      First, start the aggregation on the ``orders`` collection and
      chain an :pipeline:`$unwind` stage to separate the
      entries in the ``Products`` array into individual documents:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Unwind/Tutorial.snippet.unwind.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a match stage for products that cost more than $15.

      Next, add a :pipeline:`$match` stage that matches
      products with a ``Products.Price`` value greater than ``15``:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Unwind/Tutorial.snippet.match.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a group stage to group by product type.

      Add a :pipeline:`$group` stage to collect
      order documents by the value of the ``ProductId`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``ProductId``: the product ID (the grouping key)
      - ``Product``: the product name
      - ``TotalValue``: the total value of all the sales of the product
      - ``Quantity``: the number of orders for the product

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Unwind/Tutorial.snippet.group.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Unwind/TutorialOutput.txt
         :language: text
         :copyable: false
         :category: example return object

      The result documents contain details about the total value and
      quantity of orders for products that cost more than $15.

.. end-tutorial
