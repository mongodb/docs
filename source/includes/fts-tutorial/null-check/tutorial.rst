.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "index": "null-check-tutorial",
			"compound": {
			  "must": {
			    "exists": {
				  "path": "password"
				}
			  },
			  "mustNot": {
				"wildcard": {
				  "path": "password",
				  "query": "*",
				  "allowAnalyzedField": true
				}
			  }
		    }  
          }
