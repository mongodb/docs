.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/csharp-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing individual product orders. Because each order corresponds to
only one customer, the aggregation groups order documents by the ``CustomerId``
field, which contains customer email addresses.

First, create a C# class to model the data in the ``orders``
collection:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Group/Order.snippet.model.cs
   :language: csharp
   :copyable: true
   :category: usage example

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Group/Tutorial.snippet.load-sample-data.cs
   :language: csharp
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      First, start the aggregation on the ``orders`` collection and
      chain a :pipeline:`$match` stage that matches orders placed in
      2020:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Group/Tutorial.snippet.match.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a sort stage to sort by order date.

      Next, add a :pipeline:`$sort` stage to set an
      ascending sort on the ``OrderDate`` field to retrieve the earliest
      2020 purchase for each customer in the next stage:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Group/Tutorial.snippet.sort-order-date.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a group stage to group by email address.

      Add a :pipeline:`$group` stage to collect
      order documents by the value of the ``CustomerId`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``CustomerId``: the customer's email address (the grouping key)
      - ``FirstPurchaseDate``: the date of the customer's first purchase
      - ``TotalValue``: the total value of all the customer's purchases
      - ``TotalOrders``: the total number of the customer's purchases
      - ``Orders``: the list of all the customer's purchases,
        including the date and value of each purchase

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Group/Tutorial.snippet.group.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a sort stage to sort by first order date.

      Next, add another :pipeline:`$sort` stage to set an
      ascending sort on the ``FirstPurchaseDate`` field:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Group/Tutorial.snippet.sort-first-purchase.cs
         :language: csharp
         :copyable: true
         :category: syntax example

      The preceding code also converts the output documents to
      ``BsonDocument`` instances for printing.

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Group/TutorialOutput.txt
         :language: text
         :copyable: false
         :category: example return object

      The result documents contain details from all the orders from
      a given customer, grouped by the customer's email address.

.. end-tutorial
