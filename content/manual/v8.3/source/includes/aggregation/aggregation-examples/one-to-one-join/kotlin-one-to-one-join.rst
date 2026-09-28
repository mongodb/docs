.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/kotlin-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses two collections:

- ``orders``: documents that describe individual orders for products in a shop
- ``products``: documents that describe the products that a shop sells

An order can only contain one product. The aggregation uses a
one-to-one join to match an order document to the corresponding product
document. The aggregation joins the collections by the ``product_id`` field
that exists in documents in both collections.

First, create Kotlin data classes to model the data in the ``orders`` and ``products``
collections:

.. literalinclude:: /includes/aggregation/aggregation-examples/one-to-one-join/full-files/OneToOneJoin.kt
   :language: kotlin
   :copyable: true
   :start-after: start-data-classes
   :end-before: end-data-classes
   :dedent:

To create the ``orders`` and ``products`` collections and insert the
sample data, add the following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/one-to-one-join/full-files/OneToOneJoin.kt
   :language: kotlin
   :copyable: true
   :start-after: start-insert-sample-data
   :end-before: end-insert-sample-data
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      Add a :pipeline:`$match` stage that matches
      orders placed in 2020:

      .. literalinclude:: /includes/aggregation/aggregation-examples/one-to-one-join/full-files/OneToOneJoin.kt
         :language: kotlin
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a lookup stage to link the collections.

      Next, add a :pipeline:`$lookup` stage. The
      ``$lookup`` stage joins the ``productID`` field in the ``orders``
      collection to the ``ID`` field in the ``products`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/one-to-one-join/full-files/OneToOneJoin.kt
         :language: kotlin
         :copyable: true
         :start-after: start-lookup
         :end-before: end-lookup
         :dedent:

   .. step:: Add set stages to create new document fields.

      Next, add two :pipeline:`$set`
      stages to the pipeline.

      The first ``$set`` stage sets the ``product_mapping`` field
      to the first element in the ``product_mapping`` object
      created in the previous ``$lookup`` stage.

      The second ``$set`` stage creates two new fields, ``product_name``
      and ``product_category``, from the values in the
      ``product_mapping`` object field:

      .. literalinclude:: /includes/aggregation/aggregation-examples/one-to-one-join/full-files/OneToOneJoin.kt
         :language: kotlin
         :copyable: true
         :start-after: start-set
         :end-before: end-set
         :dedent:

      .. tip::

         Because this is a one-to-one join, the ``$lookup`` stage
         adds only one array element to the input document. The pipeline
         uses the :group:`$first`
         operator to retrieve the data from this element.

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes unnecessary fields from the document:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/one-to-one-join/full-files/OneToOneJoin.kt
         :language: kotlin
         :copyable: true
         :start-after: start-unset
         :end-before: end-unset
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/one-to-one-join/full-files/OneToOneJoin.kt
         :language: kotlin
         :copyable: true
         :start-after: start-run-agg
         :end-before: end-run-agg
         :dedent:

      Finally, run the application in your IDE.

   .. step:: Interpret the aggregation results.

      The aggregated result contains three documents. The documents
      represent customer orders that occurred in 2020, with the
      ``product_name`` and ``product_category`` of the ordered product:

      .. code-block:: none
         :copyable: false
         
         Document{{customerID=elise_smith@myemail.com, orderDate=Sat May 30 04:35:52 EDT 2020, value=431.43, product_name=Asus Laptop, product_category=ELECTRONICS}}
         Document{{customerID=oranieri@warmmail.com, orderDate=Wed Jan 01 03:25:37 EST 2020, value=63.13, product_name=Morphy Richardds Food Mixer, product_category=KITCHENWARE}}
         Document{{customerID=jjones@tepidmail.com, orderDate=Sat Dec 26 03:55:46 EST 2020, value=429.65, product_name=Asus Laptop, product_category=ELECTRONICS}}

      The result consists of documents that contain fields from
      documents in the ``orders`` collection and the ``products``
      collection, joined by matching the ``product_id`` field present in
      each original document.

.. end-tutorial
