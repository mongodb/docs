.. include::  /includes/extracts/geospatial-long-lat-values.rst

Consider a collection ``places`` that has a ``2dsphere`` index.

The following example returns documents that are at least ``1000``
meters from and at most ``5000`` meters from the specified GeoJSON
point, sorted from nearest to farthest:

.. code-block:: javascript

   db.places.find(
      {
        location:
          { $near :
             {
               $geometry: { type: "Point",  coordinates: [ -73.9667, 40.78 ] },
               $minDistance: 1000,
               $maxDistance: 5000
             }
          }
      }
   )
