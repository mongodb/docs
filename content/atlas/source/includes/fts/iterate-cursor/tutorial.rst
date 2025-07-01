.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "index": "iterate-cursor-tutorial",
            "text": {
              "query": "Summer",
              "path": "title"
            }  
          }

   * - ``$project``
     - .. code-block:: javascript

          {
            "id": 0,
            "title": 1
          }
