.. code-block:: javascript

   db.inventory.insertMany( [
      { _id: 1, item: "ABC1", quarter: "13Q1", description: "PRODUCT 1" },
      { _id: 2, item: "abc2", quarter: "13Q4", description: "Product 2" },
      { _id: 3, item: "xyz1", quarter: "14Q2", description: null }
   ] )
