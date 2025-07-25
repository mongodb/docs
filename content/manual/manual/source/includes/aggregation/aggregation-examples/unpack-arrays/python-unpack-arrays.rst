.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/python-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing product orders. Because each order contains multiple products,
the first step of the aggregation unpacks the products array into
individual product order documents.

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind_tutorial.snippet.insert-orders.py
   :language: python
   :copyable: true
   :category: usage example
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add an unwind stage to unpack the array of product orders.

      First, add an :pipeline:`$unwind` stage to separate the
      entries in the ``products`` array into individual documents:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind_tutorial.snippet.unwind.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:


   .. step:: Add a match stage for products that cost more than $15.

      Next, add a :pipeline:`$match` stage that matches
      products with a ``products.price`` value greater than ``15``:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind_tutorial.snippet.match.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add a group stage to group by product type.

      Add a :pipeline:`$group` stage to collect
      order documents by the value of the ``prod_id`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``product``: the product name
      - ``total_value``: the total value of all the sales of the product
      - ``quantity``: the number of orders for the product

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind_tutorial.snippet.group.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add a set stage to display the product ID.

      Add a :pipeline:`$set` stage to recreate the
      ``product_id`` field from the values in the ``_id`` field
      that were set during the ``$group`` stage:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind_tutorial.snippet.set.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` field from the result
      documents:
            
      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind_tutorial.snippet.unset.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind_tutorial.snippet.run-agg.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

      Finally, run the following command in your shell to start your
      application:

      .. code-block:: bash
         
         python3 agg_tutorial.py

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/unwind/unwind-tutorial-output.txt
         :language: text
         :copyable: false
         :category: example return object
         :dedent:
         
      The result documents contain details about the total value and
      quantity of orders for products that cost more than $15.

.. end-tutorial
