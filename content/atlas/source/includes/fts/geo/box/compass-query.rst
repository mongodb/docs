.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "geoWithin": {
              "path": "address.location",
              "box": {
                "bottomLeft": {
                  "type": "Point",
                  "coordinates": [112.467, -55.050]
                },
                "topRight": {
                  "type": "Point",
                  "coordinates": [168.000, -9.133]
                }
              }
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
