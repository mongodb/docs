.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "geoWithin": {
              "circle": {
                "center": {
                  "type": "Point",
                  "coordinates": [-73.54, 45.54]
                },
                "radius": 1600
              },
              "path": "address.location"
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          3

   * - ``$project``
     - .. code-block:: javascript

          {
            "_id": 0,
            "name": 1,
            "address": 1
          }
