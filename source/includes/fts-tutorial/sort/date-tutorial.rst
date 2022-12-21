.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            compound: {
              filter: [{
                wildcard: {
                  query: "Summer*",
                  path: 'title'
                  }
                  }],
              must: [{
                near: {
                  pivot: 13149000000,
                  score: {
                    boost: {
                      value: 100
                      }
                  },
                  path: 'released',
                  origin: ISODate("2014-04-18T00:00:00.000+00:00")
                }
              }]
            }
          }

   * - ``$project``
     - .. code-block:: javascript

          {
            _id: 0,
            title: 1,
            released: 1,
            score: { $meta: "searchScore" }
          }

   * - ``$limit``
     - .. code-block:: javascript

          5
