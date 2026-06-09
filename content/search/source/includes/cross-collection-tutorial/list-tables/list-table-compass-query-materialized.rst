.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript
          :copyable: true 

          {
            "index": "monthlySalesIndex",
            "range": { 
                "gt": 10000,
                "path": ["sales_price"]
            }
          }

   * - ``$count``
     - .. code-block:: javascript
          :copyable: true 

          "months_w_over_10000"