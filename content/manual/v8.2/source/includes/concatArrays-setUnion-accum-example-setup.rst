Create a collection named ``sales`` with the following documents:

.. code-block:: javascript

   db.sales.insertMany( [
      {
        _id: 1,
        items: [ "laptop", "tablet" ],
        location: "NYC"
      },
      {
        _id: 2,
        items: [ "phone", "tablet" ],
        location: "NYC"
      },
      {
        _id: 3,
        location: "NYC"
      },
      {
        _id: 4,
        items: [ "desktop", { "accessories": [ "mouse", "keyboard"] } ],
        location: "NYC"
      }
   ] )
