A ``restaurants`` collection has the following documents:

.. code-block:: javascript

   db.restaurants.insertMany( [
      { _id: 1, category: "café", status: "Open" },
      { _id: 2, category: "cafe", status: "open" },
      { _id: 3, category: "cafE", status: "open" }
   ] )
