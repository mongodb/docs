.. list-table:: 
   :header-rows: 1

   * - Stage
     - Query

   * - ``$search``
     - .. code-block:: json
          :copyable: true
     
          {
            index: "pagination-tutorial",
            text: {
              query: "tom hanks",
              path: "cast"
            }
          }

   * - ``$project``
     - .. code-block:: json
          :copyable: true

          {
            _id: 0,
            title: 1,
            cast: 1
          }

   * - ``$set``
     - .. code-block:: json
          :copyable: true

          {
            score: {
              $meta: "searchScore"
            }
          }

   * - ``$facet``
     - .. code-block:: json
          :copyable: true

          {
            rows: [
              {
                $skip: 10
              },
              {
                $limit: 10
              }
            ],
            totalRows: [
              {
                $replaceWith: "$$SEARCH_META"
              },
              {
                $limit: 1
              }
            ]
          }

   * - ``$set``
     - .. code-block:: json
          :copyable: true

          {
            totalRows: {
              $arrayElemAt: ["$totalRows", 0]
            }
          }
