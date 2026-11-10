The following aggregation pipeline example contains two :ref:`stages
<aggregation-pipeline-operator-reference>` and returns the total
quantity of urgent orders for each product:

.. code-block:: javascript

   db.orders.aggregate( [
      { $match: { status: "urgent" } },
      { $group: { _id: "$productName", sumQuantity: { $sum: "$quantity" } } }
   ] )

The :pipeline:`$match` stage:

- Filters the documents to those with a ``status`` of ``urgent``.
  
- Outputs the filtered documents to the :pipeline:`$group` stage.

The :pipeline:`$group` stage:

- Groups the input documents by ``productName``.
  
- Uses :group:`$sum` to calculate the total ``quantity`` for each
  ``productName``, which is stored in the ``sumQuantity`` field returned
  by the aggregation pipeline.