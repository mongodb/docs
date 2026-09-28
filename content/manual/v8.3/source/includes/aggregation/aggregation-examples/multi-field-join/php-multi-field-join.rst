.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/golang-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses two collections:

- ``products``, which contains documents describing the products that a shop sells
- ``orders``, which contains documents describing individual orders for products in a shop

An order can only contain one product. The aggregation uses a
multi-field join to match a product document to documents representing
orders of that product. The aggregation joins collections by the ``name`` and
``variation`` fields in documents in the ``products`` collection, corresponding
to the ``product_name`` and ``product_variation`` fields in documents in the
``orders`` collection.

To create the ``products`` and ``orders`` collections and insert the
sample data, add the following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
   :language: php
   :copyable: true
   :start-after: start-insert-sample-data
   :end-before: end-insert-sample-data
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a lookup stage to link the collections and import fields.

      The first stage of the pipeline is a :pipeline:`$lookup` stage to join the
      ``orders`` collection to the ``products`` collection by two
      fields in each collection. The lookup stage contains an
      embedded pipeline to configure the join. First, create the
      embedded pipeline:

      .. code-block:: php

         $embeddedPipeline = new Pipeline(
             // Add stages within embedded pipeline.
         };
            
      Within the embedded pipeline, add a :pipeline:`$match` stage to match the
      values of two fields on each side of the join. Note that the following
      code uses aliases for the ``name`` and ``variation`` fields
      set when :ref:`creating the $lookup stage <php-multi-field-agg-lookup-stage>`:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-embedded-pl-match1
         :end-before: end-embedded-pl-match1
         :dedent:

      Within the embedded pipeline, add another :pipeline:`$match` stage to match
      orders placed in 2020:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-embedded-pl-match2
         :end-before: end-embedded-pl-match2
         :dedent:

      Within the embedded pipeline, add an :pipeline:`$unset` stage to remove
      unneeded fields from the ``orders`` collection side of the join:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-embedded-pl-unset
         :end-before: end-embedded-pl-unset
         :dedent:

      .. _php-multi-field-agg-lookup-stage:

      Next, outside of your ``Pipeline`` instances, create the
      ``$lookup`` stage in a factory function. Configure this stage to
      store the processed lookup fields in an array field called ``orders``:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-lookup-fn
         :end-before: end-lookup-fn
         :dedent:

      Then, in your main ``Pipeline`` instance, call the
      ``lookupOrdersStage()`` function:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-group
         :end-before: end-group
         :dedent:

   .. step:: Add a match stage for products ordered in 2020.

      Next, add a :pipeline:`$match` stage to only show
      products for which there is at least one order in 2020,
      based on the ``orders`` array calculated in the previous step:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` and ``description``
      fields from the result documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-unset
         :end-before: end-unset
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``products`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/multi-field-join/full-files/multi_field_join.php
         :language: php
         :copyable: true
         :start-after: start-run-agg
         :end-before: end-run-agg
         :dedent:

      Finally, run the following command in your shell to start your
      application:

      .. code-block:: bash
      
         php agg_tutorial.php

   .. step:: Interpret the aggregation results.

      The aggregated result contains two documents. The documents
      represent products for which there were orders placed in 2020.
      Each document contains an ``orders`` array field that lists details
      about each order for that product:

      .. code-block:: none
         :copyable: false
         
         {
             "name": "Asus Laptop",
             "variation": "Standard Display",
             "category": "ELECTRONICS",
             "orders": [
                 {
                     "customer_id": "elise_smith@myemail.com",
                     "orderdate": {
                         "$date": {
                             "$numberLong": "1590827752000"
                         }
                     },
                     "value": 431.43
                 },
                 {
                     "customer_id": "jjones@tepidmail.com",
                     "orderdate": {
                         "$date": {
                             "$numberLong": "1608972946000"
                         }
                     },
                     "value": 429.65
                 }
             ]
         }
         {
             "name": "Morphy Richards Food Mixer",
             "variation": "Deluxe",
             "category": "KITCHENWARE",
             "orders": [
                 {
                     "customer_id": "oranieri@warmmail.com",
                     "orderdate": {
                         "$date": {
                             "$numberLong": "1577867137000"
                         }
                     },
                     "value": 63.13
                 }
             ]
         }

      The result documents contain details from documents in the
      ``orders`` collection and the ``products`` collection, joined by
      the product names and variations.

.. end-tutorial
