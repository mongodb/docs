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

.. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/UnpackArrays.cs
   :language: csharp
   :copyable: true
   :start-after: start-pocos
   :end-before: end-pocos
   :dedent:

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/UnpackArrays.cs
   :language: csharp
   :copyable: true
   :start-after: start-insert-orders
   :end-before: end-insert-orders
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add an unwind stage to unpack the array of product orders.

      First, start the aggregation on the ``orders`` collection and
      chain an :pipeline:`$unwind` stage to separate the
      entries in the ``Products`` array into individual documents:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/UnpackArrays.cs
         :language: csharp
         :copyable: true
         :start-after: start-unwind
         :end-before: end-unwind
         :dedent:

   .. step:: Add a match stage for products that cost more than $15.

      Next, add a :pipeline:`$match` stage that matches
      products with a ``Products.Price`` value greater than ``15``:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/UnpackArrays.cs
         :language: csharp
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a group stage to group by product type.

      Add a :pipeline:`$group` stage to collect
      order documents by the value of the ``ProductId`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``ProductId``: the product ID (the grouping key)
      - ``Product``: the product name
      - ``TotalValue``: the total value of all the sales of the product
      - ``Quantity``: the number of orders for the product

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/UnpackArrays.cs
         :language: csharp
         :copyable: true
         :start-after: start-group
         :end-before: end-group
         :dedent:

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. code-block:: none
         :copyable: false
         
         { ProductId = pqr88223, Product = Morphy Richards Food Mixer, TotalValue = 431, Quantity = 1 }
         { ProductId = xyz11228, Product = Russell Hobbs Chrome Kettle, TotalValue = 16, Quantity = 1 }
         { ProductId = abc12345, Product = Asus Laptop, TotalValue = 860, Quantity = 2 }
         { ProductId = def45678, Product = Karcher Hose Set, TotalValue = 66, Quantity = 3 }
         
      The result documents contain details about the total value and
      quantity of orders for products that cost more than $15.

.. end-tutorial
