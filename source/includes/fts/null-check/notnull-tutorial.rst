.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
              "index": "null-check-tutorial",
              "compound": {
                "should": [{
                    "wildcard": {
                      "path": "password",
                      "query": "*",
                      "allowAnalyzedField": true
                    }
              },
              {
                "compound": {
                  "mustNot": {
                      "exists": {
                          "path": "password"
                        }
                    },
                    "score": { "constant": { "value": 2 } }
                  }
                }
              ]
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$project``
     - .. code-block:: javascript

          {
            "_id": 0,
            "name": 1,
            "password": 1,
            "score": { "$meta": "searchScore" }
          }
