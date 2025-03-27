.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "index": "compound-query-custom-score-tutorial",
            "compound": {
              "should": [ 
                {
                  "compound":{
                    "must": [ 
                      {
                        "text": {
                          "query": "ghost",
                          "path": ["plot","title"]
                        }
                      } 
                    ],
                    "mustNot": [ 
                      {
                        "text": {
                          "query": "Comedy",
                          "path": ["genres"]
                        }
                      } 
                    ]
                  }
                },
                {
                  "compound":{
                    "must":[ 
                      {
                        "text": {
                          "query": "ghost",
                          "path": ["plot","title"]
                        }
                      } 
                    ],
                    "filter": [ 
                      {
                        "text": {
                          "query": "Comedy",
                          "path": ["genres"]
                        }
                      } 
                    ],
                    "score": { "boost": { "value": 0.5} }
                  }
                } 
              ]
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          10

   * - ``$project``
     - .. code-block:: javascript

          {
             "_id": 1,
             "title": 1,
             "plot": 1,
             "genres": 1,
             "score": { "$meta": "searchScore" }
          }