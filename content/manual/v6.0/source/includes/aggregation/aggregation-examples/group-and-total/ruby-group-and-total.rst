.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/ruby-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing individual product orders. Because each order corresponds to
only one customer, the aggregation groups order documents by the ``customer_id``
field, which contains customer email addresses.

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
   :language: ruby
   :copyable: true
   :start-after: start-insert-orders
   :end-before: end-insert-orders
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      First, add a :pipeline:`$match` stage that matches
      orders placed in 2020:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
         :language: ruby
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a sort stage to sort by order date.

      Next, add a :pipeline:`$sort` stage to set an
      ascending sort on the ``orderdate`` field to retrieve the earliest
      2020 purchase for each customer in the next stage:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
         :language: ruby
         :copyable: true
         :start-after: start-sort1
         :end-before: end-sort1
         :dedent:

   .. step:: Add a group stage to group by email address.

      Add a :pipeline:`$group` stage to collect
      order documents by the value of the ``customer_id`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``first_purchase_date``: the date of the customer's first purchase
      - ``total_value``: the total value of all the customer's purchases
      - ``total_orders``: the total number of the customer's purchases
      - ``orders``: the list of all the customer's purchases,
        including the date and value of each purchase

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
         :language: ruby
         :copyable: true
         :start-after: start-group
         :end-before: end-group
         :dedent:

   .. step:: Add a sort stage to sort by first order date.
            
      Next, add another :pipeline:`$sort` stage to set an
      ascending sort on the ``first_purchase_date`` field:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
         :language: ruby
         :copyable: true
         :start-after: start-sort2
         :end-before: end-sort2
         :dedent:

   .. step:: Add a set stage to display the email address.

      Add a :pipeline:`$set` stage to recreate the
      ``customer_id`` field from the values in the ``_id`` field
      that were set during the ``$group`` stage:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
         :language: ruby
         :copyable: true
         :start-after: start-set
         :end-before: end-set
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` field from the result
      documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
         :language: ruby
         :copyable: true
         :start-after: start-unset
         :end-before: end-unset
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/group_total.rb
         :language: ruby
         :copyable: true
         :start-after: start-run-agg
         :end-before: end-run-agg
         :dedent:

      Finally, run the following command in your shell to start your
      application:

      .. code-block:: bash
      
         ruby agg_tutorial.rb

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. code-block:: none
         :copyable: false
         
         {"first_purchase_date"=>2020-01-01 08:25:37 UTC, "total_value"=>63, "total_orders"=>1, "orders"=>[{"orderdate"=>2020-01-01 08:25:37 UTC, "value"=>63}], "customer_id"=>"oranieri@warmmail.com"}
         {"first_purchase_date"=>2020-01-13 09:32:07 UTC, "total_value"=>436, "total_orders"=>4, "orders"=>[{"orderdate"=>2020-01-13 09:32:07 UTC, "value"=>99}, {"orderdate"=>2020-05-30 08:35:52 UTC, "value"=>231}, {"orderdate"=>2020-10-03 13:49:44 UTC, "value"=>102}, {"orderdate"=>2020-12-26 08:55:46 UTC, "value"=>4}], "customer_id"=>"elise_smith@myemail.com"}
         {"first_purchase_date"=>2020-08-18 23:04:48 UTC, "total_value"=>191, "total_orders"=>2, "orders"=>[{"orderdate"=>2020-08-18 23:04:48 UTC, "value"=>4}, {"orderdate"=>2020-11-23 22:56:53 UTC, "value"=>187}], "customer_id"=>"tj@wheresmyemail.com"}

      The result documents contain details from all the orders from
      a given customer, grouped by the customer's email address.

.. end-tutorial
