.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "index": "diacritic-insensitive-tutorial",
            "compound": {
              "must": [{
                "wildcard": {
                  "path": "title",
                  "query": "allè*",
                  "allowAnalyzedField": true
                }
              }],
              "should": [{
                "text": {
                  "query": "Drama",
                  "path": "genres"
                }
              }]
            }
          }

   * - ``$project``
     - .. code-block:: javascript

          {
            "_id": 0,
            "title": 1,
            "genres": 1,
            "score": { 
              "$meta": "searchScore" 
            }
          }
