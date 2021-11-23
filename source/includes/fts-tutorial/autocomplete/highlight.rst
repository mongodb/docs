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
            "autocomplete": {
              "path": "title",
              "query": ["ger"]
            },
            "highlight": {
              "path": "title"
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$project``
     - .. code-block:: javascript

          {
            "score": { $meta: "searchScore" },
            "title": 1,
            "_id": 0,
            "highlights": { "$meta": "searchHighlights" }
          }
