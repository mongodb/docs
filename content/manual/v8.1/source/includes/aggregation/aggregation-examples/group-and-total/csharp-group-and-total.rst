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

.. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.cs
   :language: csharp
   :copyable: true
   :start-after: start-pocos
   :end-before: end-pocos
   :dedent:

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.cs
   :language: csharp
   :copyable: true
   :start-after: start-insert-orders
   :end-before: end-insert-orders
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      First, start the aggregation on the ``orders`` collection and
      chain a :pipeline:`$match` stage that matches orders placed in
      2020:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.cs
         :language: csharp
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a sort stage to sort by order date.

      Next, add a :pipeline:`$sort` stage to set an
      ascending sort on the ``OrderDate`` field to retrieve the earliest
      2020 purchase for each customer in the next stage:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.cs
         :language: csharp
         :copyable: true
         :start-after: start-sort1
         :end-before: end-sort1
         :dedent:

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

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.cs
         :language: csharp
         :copyable: true
         :start-after: start-group
         :end-before: end-group
         :dedent:

   .. step:: Add a sort stage to sort by first order date.
            
      Next, add another :pipeline:`$sort` stage to set an
      ascending sort on the ``FirstPurchaseDate`` field:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.cs
         :language: csharp
         :copyable: true
         :start-after: start-sort2
         :end-before: end-sort2
         :dedent:

      The preceding code also converts the output documents to
      ``BsonDocument`` instances for printing.

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. code-block:: none
         :copyable: false
         
         { "CustomerId" : "oranieri@warmmail.com", "FirstPurchaseDate" : { "$date" : "2020-01-01T08:25:37Z" }, "TotalValue" : 63, "TotalOrders" : 1, "Orders" : [{ "OrderDate" : { "$date" : "2020-01-01T08:25:37Z" }, "Value" : 63 }] }
         { "CustomerId" : "elise_smith@myemail.com", "FirstPurchaseDate" : { "$date" : "2020-01-13T09:32:07Z" }, "TotalValue" : 436, "TotalOrders" : 4, "Orders" : [{ "OrderDate" : { "$date" : "2020-01-13T09:32:07Z" }, "Value" : 99 }, { "OrderDate" : { "$date" : "2020-05-30T08:35:52Z" }, "Value" : 231 }, { "OrderDate" : { "$date" : "2020-10-03T13:49:44Z" }, "Value" : 102 }, { "OrderDate" : { "$date" : "2020-12-26T08:55:46Z" }, "Value" : 4 }] }
         { "CustomerId" : "tj@wheresmyemail.com", "FirstPurchaseDate" : { "$date" : "2020-08-18T23:04:48Z" }, "TotalValue" : 191, "TotalOrders" : 2, "Orders" : [{ "OrderDate" : { "$date" : "2020-08-18T23:04:48Z" }, "Value" : 4 }, { "OrderDate" : { "$date" : "2020-11-23T22:56:53Z" }, "Value" : 187 }] }
         
      The result documents contain details from all the orders from
      a given customer, grouped by the customer's email address.

.. end-tutorial
