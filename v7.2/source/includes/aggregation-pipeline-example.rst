The following aggregation pipeline example contains two :ref:`stages
<aggregation-pipeline-operator-reference>` and returns the total
order quantity of medium size pizzas grouped by pizza name:

.. code-block:: javascript

   db.orders.aggregate( [

      // Stage 1: Filter pizza order documents by pizza size
      {
         $match: { size: "medium" }
      },

      // Stage 2: Group remaining documents by pizza name and calculate total quantity
      {
         $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
      }
   
   ] )

The :pipeline:`$match` stage:

- Filters the pizza order documents to pizzas with a ``size`` of
  ``medium``.
  
- Passes the remaining documents to the :pipeline:`$group` stage.

The :pipeline:`$group` stage:

- Groups the remaining documents by pizza ``name``.
  
- Uses :group:`$sum` to calculate the total order ``quantity`` for each
  pizza ``name``. The total is stored in the ``totalQuantity`` field
  returned by the aggregation pipeline.
