.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$lookup``
     - .. code-block:: javascript
          :copyable: true 

          {
            from: "accounts",
            localField: "accounts",
            foreignField: "account_id",
            as: "purchases",
            pipeline: [
              {
                $search: {
                  index: "lookup-with-search-tutorial",
                  compound: {
                    must: [
                      {
                        queryString: {
                        defaultPath: "products",
                        query:
                          "products: (CurrencyService AND InvestmentStock)"
                        }
                      }
                    ],
                    should: [
                      {
                        range: {
                          path: "limit",
                          gte: 5000,
                          lte: 10000,
                        }
                      }
                    ]
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                }
              }
            ]
          }

   * - ``$limit``
     - ``5`` 

   * - ``$project``
     - .. code-block:: javascript
          :copyable: true 

          {
             _id: 0,
             address: 0,
             birthdate: 0,
             username: 0,
             tier_and_details: 0,
          }