.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Go to the :guilabel:`Search Tester`.
      
      Click the :guilabel:`Query` button to the right of the index to 
      query.
      
   .. step:: View and edit the query syntax.
      
      Click :guilabel:`Edit Query` to view a default query syntax 
      sample in |json| format.
      
   .. step:: Run an |fts| query with the compound operator to search the ``users`` collection.

      The following query uses the :pipeline:`$search` pipeline stage to query 
      the collection. The query uses the following :ref:`compound-ref` operator 
      clauses:
      
      .. include:: /includes/fts/extracts/fts-isnull-stages
      
      .. io-code-block::
         :copyable: true
       
         .. input::
            :language: json
      
            [
              {
                "$search": {
                  index: "null-check-tutorial",
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
              }
            ]
      
         .. output::
            
            SCORE: 1  _id:  "64a6e2e5bceafd4df9153bab"
              name: "Andre Robinson"
              email: "andre.robinson@example.com"
              password: null     
