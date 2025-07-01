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
      
   .. step:: Run an |fts| diacritic-insensitive query.

      This query uses the :pipeline:`$search` stage to query the collection
      using the ``compound`` operator. The ``compound`` operator uses
      the following clauses:
      
      .. include:: /includes/fts/extracts/fts-diacritic-insensitive-constant-desc.rst 
      
      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: js
            :linenos:
      
            [
              {
                "$search" : {
                  "index": "diacritic-insensitive-tutorial",
                  "compound" : {
                    "must": [{
                        "wildcard" : {
                          "query" : "alle*",
                          "path": "title",
                          "allowAnalyzedField": true
                    }
                    }],
                    "should": [{
                      "text": {
                        "query" : "Drama",
                        "path" : "genres"
                      }
                    }]
                  }
                }
              }
            ]
      
         .. output::
            :visible: true
      
            SCORE: 1.2084882259368896  _id:  "573a13a1f29313caabd07bb6"
              plot: "A group of hip retro teenage outsiders become involved in an interscho…"
              genres:
                0: "Drama"
                1: "Family"
                2: "Sport"
              runtime: 103
              title: "Alley Cats Strike"
      
            SCORE: 1.179288625717163  _id:  "573a13b1f29313caabd382a2"
              plot: "Famous pianist Zetterstrèm returns home to his native Denmark, to give…"
              genres:
                0: "Drama"
                1: "Romance"
                2: "Sci-Fi"
              runtime: 88
              title: "Allegro"
      
            SCORE: 1  _id:  "573a1397f29313caabce5f15"
              plot: "An enthusiastic filmmaker thinks he's come up with a totally original …"
              genres:
                0: "Animation"
                1: "Comedy"
                2: "Fantasy"
              runtime: 75
              title: "Allegro non troppo"
      
            SCORE: 1  _id:  "573a13d1f29313caabd8f84b"
              plot: "The eleven year old cycling talent Freddy is the son of a butcher in a…"
              genres:
                0: "Comedy"
              runtime: 100
              title: "Allez, Eddy!"
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
      
      .. include:: /includes/fts/extracts/fts-diacritic-insensitive-results.rst      
