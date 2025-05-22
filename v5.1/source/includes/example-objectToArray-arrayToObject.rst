Consider a ``inventory`` collection with the following documents:

.. code-block:: javascript

   { "_id" : 1, "item" : "ABC1", instock: { warehouse1: 2500, warehouse2: 500 } }
   { "_id" : 2, "item" : "ABC2", instock: { warehouse2: 500, warehouse3: 200} }

The following aggregation pipeline operation calculates the total in
stock for each item and adds to the ``instock`` document:

.. code-block:: javascript

   db.inventory.aggregate( [
      { $addFields: { instock: { $objectToArray: "$instock" } } },
      { $addFields: { instock: { $concatArrays: [ "$instock", [ { "k": "total", "v": { $sum: "$instock.v" } } ] ] } } } ,
      { $addFields: { instock: { $arrayToObject: "$instock" } } }
   ] )

The operation returns the following:

.. code-block:: javascript

   { "_id" : 1, "item" : "ABC1", "instock" : { "warehouse1" : 2500, "warehouse2" : 500, "total" : 3000 } }
   { "_id" : 2, "item" : "ABC2", "instock" : { "warehouse2" : 500, "warehouse3" : 200, "total" : 700 } }
