.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "index": "multilingual-tutorial",
            "compound": { 
              "must": [{ 
                "text": { 
                  "path": {"value": "fullplot", "multi": "fullplot_english"}, 
                  "query":  "Bella"
                } 
              }], 
              "mustNot": [{ 
                "range": { 
                  "path": "released", 
                  "gt": ISODate("1984-01-01T00:00:00.000Z"), 
                  "lt": ISODate("2016-01-01T00:00:00.000Z") 
                } 
              }], 
              "should": [{ 
                "text": { 
                  "query": "Comedy", 
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
            "fullplot": 1, 
            "released": 1, 
            "genres": 1, 
            "score": { 
              "$meta": "searchScore" 
            } 
          }
