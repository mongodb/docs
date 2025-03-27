.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript
          :copyable: true 

          {
            "text": {
              "query": "Mobile",
              "path": "name"
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

   * - ``$set``
     - .. code-block:: javascript
          :copyable: true 

          {
            "source": "companies"
          }

   * - ``$limit``
     - ``3``

   * - ``$unionWith``
     - .. code-block:: javascript
          :copyable: true 

          {
            "coll": "inspections",
            "pipeline": [
              {
                "$search": {
                  "text": {
                    "query": "Mobile",
                    "path": "business_name",
                  }
                }
              },
              {
                "$set": {
                  "source": "inspections",
                }
              },
              {
                "$project": {
                  "score": {
                    "$meta": "searchScore"
                  },
                  "source": 1,
                  "_id": 0,
                  "business_name": 1,
                  "address": 1
                }
              },
              {
                "$limit": 3
              },
              {
                "$sort": {
                  "score": -1
                }
              }
            ]
          }
