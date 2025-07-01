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
      
   .. step:: Run an |fts| query with the ``compound`` and ``autocomplete`` operators on the ``movies`` collection.
      
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
                  index: "autocomplete-tutorial",
                  compound: {
                    should: [{
                      autocomplete: {
                        query: "pri",
                        path: "title"
                      }
                    },
                    {
                      autocomplete: {
                        query: "pri",
                        path: "plot"
                      }
                    }],
                    minimumShouldMatch: 1
                  }
                }
              }
            ]
            
         .. output::
            :visible: true
            
            SCORE: 7.52535343170166  _id:  "573a13e7f29313caabdc80cd"
              plot: "Prison Terminal: The Last Days of Private Jack Hall is a moving cinema…"
              genre: Array
              runtime: 40
      
            SCORE: 7.235145568847656  _id:  "573a13adf29313caabd2b504"
              plot: "Now settled in Genovia, Princess Mia faces a new revelation: she is be…"
              genres: Array
              runtime: 113
      
            SCORE: 7.202958106994629  _id:  "573a13b5f29313caabd43816"
              plot: "A young fugitive prince and princess must stop a villain who unknowing…"
              genres: Array
              runtime: 116
      
            SCORE: 7.201740264892578  _id:  "573a139af29313caabcf0d54"
              plot: "The first wedding anniversary of Princess Odette and Prince Derek is d…"
              genres: Array
              runtime: 71
      
            SCORE: 7.174992561340332  _id:  "573a1399f29313caabceeead"
              plot: "Jane Austen's classic novel about the prejudice that occurred between …"
              genres: Array
              runtime: 327
            
            SCORE: 7.173888206481934  _id:  "573a13c1f29313caabd63a21"
              plot: "A princess whose country has been invaded goes into hiding in Louisian…"
              genres: Array
              countries: Array
      
            SCORE: 7.163987159729004  _id:  "573a13eef29313caabdd51a6"
              plot: "Follows the people racing to bring the hot new 3D printing technology …"
              genres: Array
              runtime: 100
      
            SCORE: 7.155245780944824  _id:  "573a13a5f29313caabd14adf"
              plot: "When her father is captured by The Sheriff of Nottingham and Prince Jo…"
              genres: Array
              runtime: 88
      
            SCORE: 7.146618843078613  _id:  "573a139af29313caabcf0efc"
              plot: "An Egyptian prince learns of his identity as a Hebrew and, later his d…"
              genres: Array
              runtime: 99
      
            SCORE: 7.132328987121582  _id:  "573a139af29313caabcf003b"
              plot: "Two Russian soldiers, one battle-seasoned and the other barely into hi…"
              genres: Array
              runtime: 99
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
      
