``$expr`` can contain expressions that compare fields from the same
document.

Create a ``monthlyBudget`` collection with these documents:

.. code-block:: javascript

   db.monthlyBudget.insertMany( [
      { _id : 1, category : "food", budget : 400, spent : 450 },
      { _id : 2, category : "drinks", budget : 100, spent : 150 },
      { _id : 3, category : "clothes", budget : 100, spent : 50 },
      { _id : 4, category : "misc", budget : 500, spent : 300 },
      { _id : 5, category : "travel", budget : 200, spent : 650 }
   ] )

The following operation uses :query:`$expr` to find documents 
where the ``spent`` amount exceeds the ``budget``:

.. code-block:: javascript

   db.monthlyBudget.find( { $expr: { $gt: [ "$spent" , "$budget" ] } } )

Output:

.. code-block:: javascript
   :copyable: false

   { _id : 1, category : "food", budget : 400, spent : 450 }
   { _id : 2, category : "drinks", budget : 100, spent : 150 }
   { _id : 5, category : "travel", budget : 200, spent : 650 }
