Consider a collection ``places`` that contains documents with a
``location`` field and has a :doc:`2dsphere </core/2dsphere>` index.
 
Then, the following example returns whose ``location`` is at least
``1000`` meters from and at most ``5000`` meters from the specified
point, ordered from nearest to farthest:

.. code-block:: javascript

   db.places.find(
      {
        location: {
           $nearSphere: {
              $geometry: {
                 type : "Point",
                 coordinates : [ -73.9667, 40.78 ]
              },
              $minDistance: 1000,
              $maxDistance: 5000
           }
        }
      }
   )
