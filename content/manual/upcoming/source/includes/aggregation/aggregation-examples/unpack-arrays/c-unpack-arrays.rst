.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/c-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing product orders. Because each order contains multiple products,
the first step of the aggregation unpacks the products array into
individual product order documents.

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
   :language: c
   :copyable: true
   :start-after: start-insert-orders
   :end-before: end-insert-orders
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add an unwind stage to unpack the array of product orders.

      First, add an :pipeline:`$unwind` stage to separate the
      entries in the ``products`` array into individual documents:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
         :language: c
         :copyable: true
         :start-after: start-unwind
         :end-before: end-unwind
         :dedent:

   .. step:: Add a match stage for products that cost more than $15.

      Next, add a :pipeline:`$match` stage that matches
      products with a ``products.price`` value greater than ``15``:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
         :language: c
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a group stage to group by product type.

      Add a :pipeline:`$group` stage to collect
      order documents by the value of the ``prod_id`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``product``: the product name
      - ``total_value``: the total value of all the sales of the product
      - ``quantity``: the number of orders for the product

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
         :language: c
         :copyable: true
         :start-after: start-group
         :end-before: end-group
         :dedent:

   .. step:: Add a set stage to display the product ID.

      Add a :pipeline:`$set` stage to recreate the
      ``product_id`` field from the values in the ``_id`` field
      that were set during the ``$group`` stage:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
         :language: c
         :copyable: true
         :start-after: start-set
         :end-before: end-set
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` field from the result
      documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
         :language: c
         :copyable: true
         :start-after: start-unset
         :end-before: end-unset
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
         :language: c
         :copyable: true
         :start-after: start-run-agg
         :end-before: end-run-agg
         :dedent:

      Ensure that you clean up the collection resources by adding the
      following line to your cleanup statements:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.c
         :language: c
         :copyable: true
         :start-after: start-cleanup
         :end-before: end-cleanup
         :dedent:

      Finally, run the following commands in your shell to generate and
      run the executable:

      .. code-block:: bash
      
         gcc -o aggc agg-tutorial.c $(pkg-config --libs --cflags libmongoc-1.0)
         ./aggc

      .. tip::

         If you encounter connection errors by running the preceding
         commands in one call, you can run them separately.

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. code-block:: none
         :copyable: false

         { "product" : "Asus Laptop", "total_value" : { "$numberInt" : "860" }, "quantity" : { "$numberInt" : "2" }, "product_id" : "abc12345" }
         { "product" : "Karcher Hose Set", "total_value" : { "$numberInt" : "66" }, "quantity" : { "$numberInt" : "3" }, "product_id" : "def45678" }
         { "product" : "Morphy Richards Food Mixer", "total_value" : { "$numberInt" : "431" }, "quantity" : { "$numberInt" : "1" }, "product_id" : "pqr88223" }
         { "product" : "Russell Hobbs Chrome Kettle", "total_value" : { "$numberInt" : "16" }, "quantity" : { "$numberInt" : "1" }, "product_id" : "xyz11228" }
         
      The result documents contain details about the total value and
      quantity of orders for products that cost more than $15.

.. end-tutorial
