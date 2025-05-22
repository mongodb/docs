Create a ``places`` collection that contains these documents:

.. code-block:: javascript

   db.places.insertMany( [
      {
         loc: { type: "Point", coordinates: [ -73.97, 40.77 ] },
         name: "Central Park",
         category : "Park"
      },
      {
         loc: { type: "Point", coordinates: [ -73.88, 40.78 ] },
         name: "La Guardia Airport",
         category: "Airport"
      },
      {
         loc: { type: "Point", coordinates: [ -1.83, 51.18 ] },
         name: "Stonehenge",
         category : "Monument"
      }
   ] )
