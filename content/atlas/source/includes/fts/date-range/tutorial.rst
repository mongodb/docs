.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "index": "date-range-tutorial",
            "compound": {
              "must": [{
                "range": {
                  "path": "released",
                  "gt": ISODate("2015-01-01T00:00:00.000Z"),
                  "lt": ISODate("2015-12-31T00:00:00.000Z")
                }
              }],
              "should": [{
                "near": {
                  "path": "released",
                  "origin": ISODate("2015-07-01T00:00:00.000+00:00"),
                  "pivot": 2629800000
                }
              }]
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          6

   * - ``$project``
     - .. code-block:: javascript

          {
            "_id": 0,
            "title": 1,
            "released": 1,
            "genres": 1,
            "score": { 
              "$meta": "searchScore" 
            }
          }
