.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            index: "sort-tutorial",
            "range": {
              "path": "awards.wins",
              "gte": 10
            },
            "sort": {
              "awards.wins": -1,
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$project``
     - .. code-block:: javascript

          {
            title: 1,
            released: 1,
            year: 1
          }
