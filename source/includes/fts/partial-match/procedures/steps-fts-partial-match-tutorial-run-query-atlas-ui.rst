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
      
   .. step:: Run the following |fts| query using the operator for which you created the index.
      
      The following query uses the operator to query the ``plot`` field of 
      the ``sample_mflix.movies`` collection. 
      
      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      .. tabs:: 
      
         .. tab:: autocomplete
            :tabid: autocomplete 
      
            .. include:: /includes/fts/extracts/fts-partial-match-autocomplete-query-desc.rst
      
            .. io-code-block::
               :copyable: true
      
               .. input::
                  :language: js
                  :linenos:
      
                  [
                    {
                      "$search": {
                        "index": "partial-match-tutorial",
                        "autocomplete": {
                          "path": "plot",
                          "query": "new purchase",
                          "tokenOrder": "any",
                          "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 1,
                            "maxExpansions": 256
                          }
                        },
                        "highlight": { 
                            "path": "plot"
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
      
                  SCORE: 3  _id:  "573a13a4f29313caabd112f0"
                    A divorced woman and her diabetic daughter take refuge in their newly-purchased house's safe room, when three men break-in, searching for a missing fortune.
                    Matching fields: plot
                  
                  SCORE: 3  _id:  "573a13d1f29313caabd8e209"
                    A lonely writer develops an unlikely relationship with his newly purchased operating system that's designed to meet his every need.
                    Matching fields: plot
                  
                  SCORE: 2  _id:  "573a13bef29313caabd5b62d"
                    Set in the near future when artificial organs can be bought on credit, it revolves around a man who struggles to make the payments on a heart he has purchased. He must
                    Matching fields: plot
                  
                  SCORE: 2  _id:  "573a13b3f29313caabd3c91e"
                    He is "purchased" by a wealthy television producer and taken to a desolate island where he must fight to the death against nine other condemned killers from all corners of the world, with freedom going to the sole survivor.
                    Matching fields: plot
      
                  SCORE: 2  _id:  "573a1398f29313caabceb931"
                    A country boy becomes the head of a gang through the purchase of some lucky roses from an old lady.
                    Matching fields: plot, plot
      
                  SCORE: 1  _id:  "573a13a7f29313caabd1b5ab"
                    An illegal Nigerian immigrant discovers the unpalatable side of London life.
                    Matching fields: plot
      
                  SCORE: 1  _id:  "573a13a7f29313caabd1b5c0"
                    A young dropout falls in love with a nightclub dancer...
                    Matching fields: plot
      
                  SCORE: 1  _id:  "573a13a7f29313caabd1b62f"
                    In 1990, to protect his fragile mother from a fatal shock after a long coma, a young man must keep her from learning that her beloved nation of East Germany as she knew it has disappeared.
                    Matching fields: plot
      
                  SCORE: 1  _id:  "573a13a7f29313caabd1b6af"
                    Gadget once again has to fight his arch nemesis, Claw.
                    Matching fields: plot
      
         .. tab:: phrase
            :tabid: phrase 
      
            .. include:: /includes/fts/extracts/fts-partial-match-phrase-query-desc.rst
      
            .. io-code-block::
               :copyable: true
      
               .. input::
                  :language: js
                  :linenos:
      
                  [
                    {
                      "$search": {
                        "index": "partial-match-tutorial",
                        "phrase": {
                          "path": "plot",
                          "query": "new purpose",
                          "slop": 5
                        },
                        "highlight": {
                          "path": "plot"
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
      
                  SCORE: 3.7209534645080566  _id:  "573a13b1f29313caabd37ae6"
                    The true story of Richard Pimentel, a brilliant public speaker with a troubled past, who returns from Vietnam severely hearing -impaired and finds a new purpose in his landmark efforts on the behalf of Americans with disabilities.
                    Matching fields: plot
      
                  SCORE: 1.1507558822631836  _id:  "573a13bdf29313caabd58a26"
                    But without a hero, he loses all purpose and must find new meaning to his life.
                    Matching fields: plot
      
                  SCORE: 1.0041160583496094  _id:  "573a1396f29313caabce5197"
                    An aging Pat Garrett is hired as a lawman on behalf of a group of wealthy New Mexico cattle barons--his sole purpose being to bring down his old friend Billy the Kid.
                    Matching fields: plot
      
         .. tab:: regex
            :tabid: regex 
      
            .. include:: /includes/fts/extracts/fts-partial-match-regex-query-desc.rst
      
            .. io-code-block::
               :copyable: true
      
               .. input::
                  :language: js
                  :linenos:
      
                  [
                    {
                      "$search": {
                        "index": "partial-match-tutorial",
                        "regex": {
                          "path": "plot",
                          "query": "(.*)new(.*) pur(.*)"
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
      
                  SCORE: 1  _id:  "573a1397f29313caabce77d9"
                    fullplot: "After the Rebel base on the icy planet Hoth is taken over by the empir…"
                    imdb: Object
                    year: 1980
      
                  SCORE: 1  _id:  "573a1398f29313caabceb893"
                    plot: "The new owner of the Cleveland Indians puts together a purposely horri…"
                    genres: Array
                    runtime: 107
      
                  SCORE: 1  _id:  "573a13b1f29313caabd37ae6"
                    plot: "The true story of Richard Pimentel, a brilliant public speaker with a …"
                    genres: Array
                    runtime: 94
      
                  SCORE: 1  _id:  "573a13d1f29313caabd8e209"
                    fullplot: "Theodore is a lonely man in the final stages of his divorce. When he's…"
                    imdb: Object
                    year: 2013
      
                  SCORE: 1  _id:  "573a13dcf29313caabdb107a"
                    plot: "An adrenaline junkie walks away from a whirlwind romance and embraces …"
                    genres: Array
                    runtime: 146
      
         .. tab:: wildcard
            :tabid: wildcard 
      
            .. include:: /includes/fts/extracts/fts-partial-match-wildcard-query-desc.rst
      
            .. io-code-block::
               :copyable: true
      
               .. input::
                  :language: js
                  :linenos:
      
                  [
                    {
                      "$search": {
                        "index": "partial-match-tutorial",
                        "wildcard": {
                          "path": "plot",
                          "query": "*new* pur*"
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
      
                  SCORE: 1  _id:  "573a1397f29313caabce77d9"
                    fullplot: "After the Rebel base on the icy planet Hoth is taken over by the empir…"
                    imdb: Object
                    year: 1980
      
                  SCORE: 1  _id:  "573a1398f29313caabceb893"
                    plot: "The new owner of the Cleveland Indians puts together a purposely horri…"
                    genres: Array
                    runtime: 107
      
                  SCORE: 1  _id:  "573a13b1f29313caabd37ae6"
                    plot: "The true story of Richard Pimentel, a brilliant public speaker with a …"
                    genres: Array
                    runtime: 94
      
                  SCORE: 1  _id:  "573a13d1f29313caabd8e209"
                    fullplot: "Theodore is a lonely man in the final stages of his divorce. When he's…"
                    imdb: Object
                    year: 2013
      
                  SCORE: 1  _id:  "573a13dcf29313caabdb107a"
                    plot: "An adrenaline junkie walks away from a whirlwind romance and embraces …"
                    genres: Array
                    runtime: 146
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst    
