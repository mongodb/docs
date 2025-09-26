Run |fts| Queries Using Materialized Views
---------------------------------------------------

.. include:: /includes/fts/materialized-view/materialized-view-intro.rst

Create the ``purchaseOrders`` Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fts/materialized-view/procedures/steps-fts-materialized-add-collection-node.rst

Create and Update the Materialized View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to create a materialized view that stores
cumulative sales data for each month. This view uses data from the ``sample_supplies.sales``
and ``sample_supplies.purchaseOrders`` collections. Then, create a function to update
the materialized view each month.

.. include:: /includes/fts/materialized-view/procedures/steps-fts-materialized-create-update-view-node.rst

Create a {+fts+} Index on the Materialized View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to create a |fts| index on the ``monthlyPhoneTransactions``
collection.

.. include:: /includes/fts/materialized-view/procedures/steps-fts-materialized-create-index-node.rst

Run a Query on the Materialized View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to run a query against the newly updated and indexed 
``monthlyPhoneTransactions`` collection.

.. include:: /includes/fts/materialized-view/procedures/steps-fts-materialized-run-query-node.rst
