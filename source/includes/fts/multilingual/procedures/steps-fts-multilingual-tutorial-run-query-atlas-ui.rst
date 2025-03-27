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
      
   .. step:: Run an |fts| multilingual query that searches for an Italian term.

      This query uses the following ``compound`` operator clauses to query the collection:
      
      .. include:: /includes/fts/extracts/fts-multilingual-constant-desc.rst 
      
      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      .. io-code-block::
         :copyable: true
       
         .. input::
            :language: js
            :dedent:
            
            [ 
              { 
                $search: {
                  "index": "multilingual-tutorial",
                  "compound": {
                    "must": [{ 
                      "text": { 
                        "path": "fullplot", 
                        "query":  "coppia"
                      }
                    }], 
                    "mustNot": [{ 
                      "range": { 
                        "path": "released", 
                        "gt": ISODate("2000-01-01T00:00:00.000Z"), 
                        "lt": ISODate("2009-01-01T00:00:00.000Z") 
                      } 
                    }], 
                    "should": [{ 
                      "text": { 
                        "query": "Drama", 
                        "path": "genres" 
                      } 
                    }] 
                  }
                }
              }
            ]
      
         .. output::
            :language: json
            :visible: true
      
            SCORE: 4.606284141540527  _id: "573a1394f29313caabce0561"
              plot: "In a Japanese slum, various residents play out their lives, dreaming o…"
              genres:
                0: "Drama"
              runtime: 137
              fullplot: "Una coppia di gretti usurai gestisce uno squallido dormitorio, nei pre…"
              released: 1957-10-01T00:00:00.000+00:00
            
            SCORE: 3.9604406356811523  _id: "573a1395f29313caabce26d2"
              plot: "Sei persone viaggiano in un vagone-letto da Marsiglia a Parigi. All'ar…"
              genres:
                0: "Mystery"
                1: "Thriller"
              runtime: 95
              fullplot: "Sei persone viaggiano in un vagone-letto da Marsiglia a Parigi. All'ar…"
              released: 1965-11-17T00:00:00.000+00:00
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst    
