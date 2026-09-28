.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/kotlin-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing individual product orders. Because each order corresponds to
only one customer, the aggregation groups order documents by the ``customer_id``
field, which contains customer email addresses.

First, create a Kotlin data class to model the data in the ``orders``
collection:

.. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
   :language: kotlin
   :copyable: true
   :start-after: start-data-class
   :end-before: end-data-class
   :dedent:

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
   :language: kotlin
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

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
         :language: kotlin
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a sort stage to sort by order date.

      Next, add a :pipeline:`$sort` stage to set an
      ascending sort on the ``orderDate`` field to retrieve the earliest
      2020 purchase for each customer in the next stage:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
         :language: kotlin
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

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
         :language: kotlin
         :copyable: true
         :start-after: start-group
         :end-before: end-group
         :dedent:

   .. step:: Add a sort stage to sort by first order date.
            
      Next, add another :pipeline:`$sort` stage to set an
      ascending sort on the ``first_purchase_date`` field:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
         :language: kotlin
         :copyable: true
         :start-after: start-sort2
         :end-before: end-sort2
         :dedent:

   .. step:: Add a set stage to display the email address.

      Add a :pipeline:`$set` stage to recreate the
      ``customer_id`` field from the values in the ``_id`` field
      that were set during the ``$group`` stage:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
         :language: kotlin
         :copyable: true
         :start-after: start-set
         :end-before: end-set
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` field from the result
      documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
         :language: kotlin
         :copyable: true
         :start-after: start-unset
         :end-before: end-unset
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/group-and-total/full-files/GroupTotal.kt
         :language: kotlin
         :copyable: true
         :start-after: start-run-agg
         :end-before: end-run-agg
         :dedent:

      Finally, run the application in your IDE.

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. code-block:: none
         :copyable: false
         
         Document{{first_purchase_date=Wed Jan 01 03:25:37 EST 2020, total_value=63, total_orders=1, orders=[Document{{orderdate=Wed Jan 01 03:25:37 EST 2020, value=63}}], customer_id=oranieri@warmmail.com}}
         Document{{first_purchase_date=Mon Jan 13 04:32:07 EST 2020, total_value=436, total_orders=4, orders=[Document{{orderdate=Mon Jan 13 04:32:07 EST 2020, value=99}}, Document{{orderdate=Sat May 30 04:35:52 EDT 2020, value=231}}, Document{{orderdate=Sat Oct 03 09:49:44 EDT 2020, value=102}}, Document{{orderdate=Sat Dec 26 03:55:46 EST 2020, value=4}}], customer_id=elise_smith@myemail.com}}
         Document{{first_purchase_date=Tue Aug 18 19:04:48 EDT 2020, total_value=191, total_orders=2, orders=[Document{{orderdate=Tue Aug 18 19:04:48 EDT 2020, value=4}}, Document{{orderdate=Mon Nov 23 17:56:53 EST 2020, value=187}}], customer_id=tj@wheresmyemail.com}}

      The result documents contain details from all the orders from
      a given customer, grouped by the customer's email address.

.. end-tutorial
