Run |fts| Queries Using Materialized Views
------------------------------------------

.. include:: /includes/fts/materialized-view/materialized-view-intro.rst

Create the ``purchaseOrders`` Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fts/materialized-view/procedures/steps-fts-materialized-add-collection-atlas-ui.rst

Create and Update the Materialized View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to create a materialized view that stores
cumulative sales data for each month. This view uses data from the ``sample_supplies.sales``
and ``sample_supplies.purchaseOrders`` collections. Then, create a function to update
the materialized view.

.. note::

   To create the triggers, you must have :authrole:`Project Owner` or higher access 
   to the project.

In the following procedures, you create triggers to create a materialized view 
and schedule a function to update the materialized view daily. Expand
the following sections to view the steps for each trigger:

.. collapsible:: 
   :heading: Create the updateMonthlySales Trigger
   :expanded: false

   .. include:: /includes/fts/cross-collection/steps-cross-collection-index-create-realm-scheduled-trigger.rst

.. collapsible:: 
   :heading: Create the updateMonthlyPurchaseOrders Trigger
   :expanded: false

   .. include:: /includes/fts/cross-collection/steps-cross-collection-define-po-function.rst

Create a {+fts} Index on the Materialized View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to create a |fts| index on the ``monthlyPhoneTransactions``
collection.

.. include:: /includes/fts/materialized-view/procedures/steps-fts-materialized-create-index-atlas-ui.rst

Run a Query on the Materialized View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to run a query against the newly updated and indexed 
``monthlyPhoneTransactions`` collection.

.. include:: /includes/fts/materialized-view/procedures/steps-fts-materialized-run-query-atlas-ui.rst
