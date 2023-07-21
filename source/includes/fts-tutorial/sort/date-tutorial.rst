.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript
 
          {
            "index": "sort-tutorial",
            "compound": {
              "filter": [{
                "wildcard": {
                  "query": "Summer*",
                  "path": "title"
                }
              }],
              "must": [{
                "near": {
                  "pivot": 13149000000,
                  "path": "released",
                  "origin": ISODate("2014-04-18T00:00:00.000+00:00")
                }
              }]
            },
            "sort": {
              "released": -1
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$project``
     - .. code-block:: javascript

          {
            _id: 0,
            title: 1,
            released: 1,
            score: { $meta: "searchScore" }
          }
