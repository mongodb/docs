.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/python-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses an ``orders`` collection, which contains documents
describing individual product orders. Because each order corresponds to
only one customer, the aggregation groups order documents by the ``customer_id``
field, which contains customer email addresses.

To create the ``orders`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.create-collection.py
   :language: python
   :copyable: true
   :category: usage example
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      In your ``Pipeline`` instance, add a :pipeline:`$match` stage that matches
      orders placed in 2020:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.match.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add a sort stage to sort by order date.

      Next, add a :pipeline:`$sort` stage to set an
      ascending sort on the ``orderdate`` field to retrieve the earliest
      2020 purchase for each customer in the next stage:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.sort-orderdate.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add a group stage to group by email address.

      Add a :pipeline:`$group` stage to group
      orders by the value of the ``customer_id`` field. In this
      stage, add aggregation operations that create the
      following fields in the result documents:

      - ``first_purchase_date``: the date of the customer's first purchase
      - ``total_value``: the total value of all the customer's purchases
      - ``total_orders``: the total number of the customer's purchases
      - ``orders``: the list of all the customer's purchases,
        including the date and value of each purchase

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.group.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add a sort stage to sort by first order date.

      Next, create another :pipeline:`$sort` stage to set an
      ascending sort on the ``first_purchase_date`` field:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.sort-first-purchase.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add a set stage to display the email address.

      Add a :pipeline:`$set` stage to recreate the
      ``customer_id`` field from the values in the ``_id`` field
      that were set during the ``$group`` stage:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.set.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes the ``_id`` field from the result
      documents:
            
      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.unset.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``orders`` collection:

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group_tutorial.snippet.run-agg.py
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

      .. literalinclude:: /code-examples/tested/python/pymongo/aggregation/pipelines/group/group-tutorial-output.txt
         :language: text
         :copyable: false
         :category: example return object
         :dedent:

      The result documents contain details from all the orders from
      a given customer, grouped by the customer's email address.

.. end-tutorial
