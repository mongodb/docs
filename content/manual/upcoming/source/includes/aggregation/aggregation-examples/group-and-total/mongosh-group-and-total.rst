.. start-prep-steps

This example uses an ``orders`` collection, which contains documents
describing individual product orders. Because each order corresponds to
only one customer, the aggregation groups order documents by the ``customer_id``
field, which contains customer email addresses.

To create the ``orders`` collection, use the
:method:`~db.collection.insertMany()` method:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/load-data.js
   :language: javascript
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      First, add a :pipeline:`$match` stage to the pipeline array you
      pass to :method:`~db.collection.aggregate()`. The ``orders``
      collection also contains orders from other years, and this stage
      excludes them from the rest of the pipeline:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.snippet.match.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add a sort stage to sort by order date.

      Next, add a :pipeline:`$sort` stage to set an ascending sort on
      the ``orderdate`` field:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.snippet.sort-orderdate.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add a group stage to group by email address.

      Add a :pipeline:`$group` stage to group orders by the value of the
      ``customer_id`` field. The ``_id`` field holds the grouping key,
      so each result document represents one customer.

      In this stage, add accumulators that create the following fields
      in the result documents:

      - ``first_purchase_date``: the date of the customer's first 2020
        purchase. The :group:`$first` accumulator returns the value from
        the first document in each group, and the preceding ``$sort``
        stage on ``orderdate`` makes that the customer's earliest order
      - ``total_value``: the total value of all the customer's
        purchases, computed by :group:`$sum`
      - ``total_orders``: the total number of the customer's purchases,
        computed by adding ``1`` to a ``$sum`` accumulator for each
        order in the group
      - ``orders``: the list of all the customer's purchases. The
        :group:`$push` accumulator appends one entry to this array for
        each order in the group, which preserves the date and value of
        every individual order alongside the totals

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.snippet.group.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add a sort stage to sort by first order date.

      Next, add another :pipeline:`$sort` stage to set an ascending sort
      on the ``first_purchase_date`` field. This stage orders the
      results so that the customers who ordered earliest in 2020
      appear first:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.snippet.sort-first-purchase-date.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add a set stage to display the email address.

      Add a :pipeline:`$set` stage to recreate the ``customer_id`` field
      from the ``_id`` field set by the ``$group`` stage:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.snippet.set.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The ``$unset`` stage
      removes the ``_id`` field from the result documents, because the
      ``$set`` stage in the preceding step already copied its value to
      ``customer_id``:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.snippet.unset.js
         :language: javascript
         :copyable: true
         :category: syntax example

   .. step:: Run the aggregation pipeline.

      Run the completed pipeline on the ``orders`` collection:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/run-pipeline.snippet.full-pipeline.js
         :language: javascript
         :copyable: true
         :category: usage example

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020. The result documents contain details on all orders
      placed by a given customer, grouped by the customer's email
      address and sorted by purchase date:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/group/output.sh
         :language: shell
         :copyable: false
         :category: example return object

.. end-tutorial
