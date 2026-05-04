Create a collection ``places`` with the following documents:

.. code-block:: javascript

   db.places.insertMany( [
      {
         name: "Central Park",
         location: { type: "Point", coordinates: [ -73.97, 40.77 ] },
         category: "Parks"
      },
      {
         name: "Sara D. Roosevelt Park",
         location: { type: "Point", coordinates: [ -73.9928, 40.7193 ] },
         category: "Parks"
      },
      {
         name: "Polo Grounds",
         location: { type: "Point", coordinates: [ -73.9375, 40.8303 ] },
         category: "Stadiums"
      }
   ] )

The following operation creates a ``2dsphere`` index on the
``location`` field:

.. code-block:: javascript

   db.places.createIndex( { location: "2dsphere" } )