.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            compound: {
              should: [{
                wildcard: {
                query: "Prance*",
                path: 'title',
                score: {
                  constant:{
                    value: 99
                  }
                },
                allowAnalyzedField: true
                }},
              {
                wildcard: {
                query: "Prince*",
                path: 'title',
                score: {
                  constant:{
                    value: 95
                  }
                },
                allowAnalyzedField: true
                }
              }]
            },
            returnStoredSource: true
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$project``
     - .. code-block:: javascript

          {
            _id: 0,
            title: 1,
            score: { $meta: "searchScore" }
          }
