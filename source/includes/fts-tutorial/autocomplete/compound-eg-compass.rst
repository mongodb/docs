In the :guilabel:`Aggregations` tab of the ``movies`` collection,
configure each of the following pipeline stages by selecting the stage
from the dropdown and adding the query for that stage. Click
:guilabel:`Add Stage` to add additional stages.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "compound": {
              "should": [{
                "autocomplete": {
                  "path": "title",
                  "query": "ball",
                  "score": { "boost": { "value": 3}}
                }
              },
              {
                "text": {
                  "path": "title",
                  "query": "ball",
                  "fuzzy": { "maxEdits": 1 }
                }
              }]
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          15

   * - ``$project``
     - .. code-block:: javascript

          {
            "score": { $meta: "searchScore" },
            "title": 1,
            "_id": 0
          }
