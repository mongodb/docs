.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript
          :copyable: true 

          {
            text: {
              query: "mobile",
              path: "name",
              score: {
                boost: {
                  value: 1.6
                }
              }
            }
          }

   * - ``$project``
     - .. code-block:: javascript
          :copyable: true 

          {
            "score": {
              "$meta": "searchScore",
            },
            "_id": 0,
            "number_of_employees": 1,
            "founded_year": 1,
            "name": 1
          }

   * - ``$addFields``
     - .. code-block:: javascript
          :copyable: true 

          {
            source: "companies",
            source_count: "$$SEARCH_META.count.lowerBound"
          }

   * - ``$limit``
     - ``3``

   * - ``$unionWith``
     - .. code-block:: javascript
          :copyable: true 

          {
            coll: "inspections",
            pipeline: [
              {
                $search: {
                  text: {
                    query: "mobile",
                    path: "business_name"
                  }
                }
              },
              {
                $project: {
                  score: {
                    $meta: "searchScore"
                  },
                  business_name: 1,
                  address: 1,
                  _id: 0
                }
              },
              {
                $limit: 3,
              },
              {
                $set: {
                  source: "inspections",
                  source_count: "$$SEARCH_META.count.lowerBound"
                }
              },
              {
                $sort: {
                  score: -1
                }
              }
            ]
          }

   * - ``$facet``
     - .. code-block:: javascript
          :copyable: true 

          {
            allDocs: [],
            totalCount: [
              {
                $group: {
                  _id: "$source",
                  firstCount: { $first: "$source_count" }
                }
              },
              {
                $project: {
                  totalCount: {
                    $sum: "$firstCount"
                  }
                }
              }
            ]
          }
