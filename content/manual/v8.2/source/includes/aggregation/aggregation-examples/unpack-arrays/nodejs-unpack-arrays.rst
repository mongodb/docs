.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/nodejs-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing product orders. Because each order contains multiple products,
the first step of the aggregation unpacks the products array into
individual product order documents.

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial-setup.snippet.load-sample-data.js
   :language: javascript
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add an unwind stage to unpack the array of product orders.

      First, add an :pipeline:`$unwind` stage to separate the
      entries in the ``products`` array into individual documents:

      .. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial.snippet.unwind.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add a match stage for products that cost more than $15.

      Next, add a :pipeline:`$match` stage that matches
      products with a ``products.price`` value greater than ``15``:

      .. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial.snippet.match.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add a group stage to group by product type.

      Add a :pipeline:`$group` stage to collect
      order documents by the value of the ``prod_id`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``product``: the product name
      - ``total_value``: the total value of all the sales of the product
      - ``quantity``: the number of orders for the product

      .. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial.snippet.group.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add a set stage to display the product ID.

      Add a :pipeline:`$set` stage to recreate the
      ``product_id`` field from the values in the ``_id`` field
      that were set during the ``$group`` stage:

      .. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial.snippet.set.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` field from the result
      documents:

      .. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial.snippet.unset.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial.snippet.run-pipeline.js
         :language: javascript
         :copyable: true
         :category: syntax example

      Finally, execute the code in the file using your IDE or the command line.

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. literalinclude:: /code-examples/tested/javascript/driver/aggregation/pipelines/unwind/tutorial-output.sh
         :language: shell
         :copyable: false
         :category: example return object

      The result documents contain details about the total value and
      quantity of orders for products that cost more than $15.

.. end-tutorial

