.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            index: "sort-tutorial",
            compound: {
              should: [{
                wildcard: {
                query: "Prance*",
                path: 'title',
                allowAnalyzedField: true
                }},
              {
                wildcard: {
                query: "Prince*",
                path: 'title',
                allowAnalyzedField: true
                }
              }]
            },
            sort: {
              title: 1
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
            score: { $meta: "searchScore" }
          }
