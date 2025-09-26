This tutorial describes how to create an index and run queries against 
the  ``sample_supplies.sales`` collection from the :ref:`sample dataset 
<sample-data>` and a new ``sample_supplies.purchaseOrders``.

An on-demand materialized view is a collection that you create and 
update using a ``$merge`` aggregation pipeline stage. You can create an
|fts| index on the materialized view and then run queries on the
materialized view using the ``$search`` aggregation pipeline stage.

This tutorial takes you through the following steps:

1. Create a collection named ``purchaseOrders`` in the 
   ``sample_supplies`` database.

#. Create a materialized view named ``monthlyPhoneTransactions``
   that retrieves data from the ``sample_supplies.sales`` and ``sample_supplies.purchaseOrders``
   collections.

#. Create a |fts| index on the ``monthlyPhoneTransactions`` 
   materialized view.

#. Run a query on the ``monthlyPhoneTransactions`` materialized view.