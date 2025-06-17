.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/rust-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing product orders. Because each order contains multiple products,
the first step of the aggregation unpacks the products array into
individual product order documents.

First, create Rust structs to model the data in the ``orders``
collection:

.. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
   :language: rust
   :copyable: true
   :start-after: start-structs
   :end-before: end-structs
   :dedent:

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
   :language: rust
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

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
         :language: rust
         :copyable: true
         :start-after: start-unwind
         :end-before: end-unwind
         :dedent:

   .. step:: Add a match stage for products that cost more than $15.

      Next, add a :pipeline:`$match` stage that matches
      products with a ``products.price`` value greater than ``15``:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
         :language: rust
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

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
         :language: rust
         :copyable: true
         :start-after: start-group
         :end-before: end-group
         :dedent:

   .. step:: Add a set stage to display the product ID.

      Add a :pipeline:`$set` stage to recreate the
      ``prod_id`` field from the values in the ``_id`` field
      that were set during the ``$group`` stage:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
         :language: rust
         :copyable: true
         :start-after: start-set
         :end-before: end-set
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` field from the result
      documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
         :language: rust
         :copyable: true
         :start-after: start-unset
         :end-before: end-unset
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/unpack-arrays/full-files/unpack-arrays.rs
         :language: rust
         :copyable: true
         :start-after: start-run-agg
         :end-before: end-run-agg
         :dedent:

      Finally, run the following command in your shell to start your
      application:

      .. code-block:: bash
      
         cargo run

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. code-block:: none
         :copyable: false
         
         Document({"product": String("Russell Hobbs Chrome Kettle"), "total_value": Int32(16), "quantity": Int32(1),
         "prod_id": String("xyz11228")})

         Document({"product": String("Morphy Richards Food Mixer"), "total_value": Int32(431), "quantity": Int32(1),
         "prod_id": String("pqr88223")})

         Document({"product": String("Karcher Hose Set"), "total_value": Int32(66), "quantity": Int32(3),
         "prod_id": String("def45678")})

         Document({"product": String("Asus Laptop"), "total_value": Int32(860), "quantity": Int32(2),
         "prod_id": String("abc12345")})
         
      The result documents contain details about the total value and
      quantity of orders for products that cost more than $15.
.. end-tutorial
