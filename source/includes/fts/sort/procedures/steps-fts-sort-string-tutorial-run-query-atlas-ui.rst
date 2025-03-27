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
      
   .. step:: Run an |fts| query against the indexed string field and sort the results.
    
      .. include:: /includes/fts/extracts/fts-sort-by-string-desc.rst
      
      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      .. io-code-block::
         :copyable: true 
      
         .. input::
            :language: json
      
            [
              { 
                $search: { 
                  "index": "sort-tutorial",
                  "compound": {
                    "should": [{
                      "wildcard": {
                        "query": ["Prance*"],
                        "path": "title",
                        "allowAnalyzedField": true
                      }
                    },
                    {
                      "wildcard": {
                        "query": ["Prince*"],
                        "path": "title",
                        "allowAnalyzedField": true
                      }
                    }]
                  },
                  "sort": {
                    "title": 1
                  }
                }
              }
            ]
            
         .. output::
            :visible: true
            
            SCORE: 1  _id:  "573a1398f29313caabceb98e"
              plot: "A farm girl nurses a wounded reindeer she believes is one of Santa's, …"
              genres: Array
              runtime: 103
              ...
              title: "Prancer"
              ...
      
            SCORE: 1  _id:  "573a13a5f29313caabd14f54"
              plot: "Preteen brothers from a broken marriage live with their mother, Denise…"
              genres: Array
              runtime: 91
              ...
              title: "Prancer Returns"
              ...
      
            SCORE: 1  _id:  "573a13f5f29313caabde3755"
              plot: "A troubled teenager attempts to conquer the love of his life by becomi…"
              genres: Array
              runtime: 78
              ...
              title: "Prince"
              ...
      
            SCORE: 1  _id:  "573a13d8f29313caabda665f"
              fullplot: "Two highway road workers spend the summer of 1988 away from their city…"
              imdb: Object
              year: 2013
              ...
              title: "Prince Avalanche"
              ...
      
            SCORE: 1  _id:  "573a13bdf29313caabd5898a"
              plot: "A New York street drama about the lives of immigrants in America seeki…"
              genres: Array
              runtime: 70
              ...
              title: "Prince of Broadway"
              ...
      
            SCORE: 1  _id:  "573a1398f29313caabcea967"
              fullplot: "A sinister secret has been kept in the basement of an abandoned Los An…"
              imdb: Object
              year: 1987
              ...
              title: "Prince of Darkness"
              ...
      
            SCORE: 1  _id:  "573a1393f29313caabcde40d"
              plot: "An unscrupulous agent for the Borgias suffers a change of heart when a…"
              genres: Array
              runtime: 107
              ...
              title: "Princess of Foxes"
              ...
      
            SCORE: 1  _id:  "573a13b5f29313caabd43816"
              plot: "A young fugitive prince and princess must stop a villain who unknowing…"
              genres: Array
              runtime: 116
              ...
              title: "Prince of Persia: The Sands of Time"
              ...
      
            SCORE: 1  _id:  "573a1397f29313caabce8081"
              plot: "A New York City narcotics detective reluctantly agrees to cooperate wi…"
              genres: Array
              runtime: 167
              ...
              title: "Prince of the City"
              ...
      
            SCORE: 1  _id:  "573a13a2f29313caabd0a767"
              plot: "Six old-style funny silhouetted fairy tales for not so-old-style peopl…"
              genres: Array
              runtime: 70
              ...
              title: "Princes and Princesses"
              ...
      
      .. include:: /includes/fts/extracts/fts-sort-by-string-results.rst
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst  
