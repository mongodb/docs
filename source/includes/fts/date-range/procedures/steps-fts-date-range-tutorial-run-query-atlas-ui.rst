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
      
   .. step:: Run an |fts| ``compound`` query with two clauses on the ``movies`` collection.
      
      The following example uses the ``compound`` operator with subqueries 
      to search for movies between the years ``2010`` to ``2015``. The 
      query uses the following clauses:
      
      .. include:: /includes/fts/extracts/fts-date-range-clauses.rst
      
      .. include:: /includes/fts/extracts/fts-date-range-stages.rst
      
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
                $search: {
                  "index": "date-range-tutorial",
                  "compound": {
                    "must": [{
                      "range": {
                        "path": "released",
                        "gt": ISODate("2015-01-01T00:00:00.000Z"),
                        "lt": ISODate("2015-12-31T00:00:00.000Z")
                      }
                    }],
                    "should": [{
                      "near": {
                        "path": "released",
                        "origin": ISODate("2015-07-01T00:00:00.000+00:00"),
                        "pivot": 2629800000
                      }
                    }]
                  }
                }
              }
            ]
      
         .. output::
            :visible: true
      
            SCORE: 2  _id:  "573a13c4f29313caabd6c383"
              fullplot: "When John Connor (Jason Clarke), leader of the human resistance, sends…"
              imdb: Object
              year: 2015
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 2  _id:  "573a13d9f29313caabdaa9e2"
              fullplot: "Three years after Mike bowed out of the stripper life at the top of hi…"
              imdb: Object
              year: 2015
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 2  _id:  "573a13e9f29313caabdcd223"
              plot: "A documentary about the power of transformation told through the eyes …"
              genres: Array
              runtime: 87
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 2  _id:  "573a13f4f29313caabde1138"
              plot: "Dedicated home care nurse Vlasta lives for her husband Lada, her daugh…"
              genres: Array
              runtime: 92
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 2  _id:  "573a13f9f29313caabdeb320"
              plot: "For anyone who has not fully understood the controversial Bitcoin yet,…"
              genres: Array
              runtime: 60
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 1.9681909084320068  _id:  "573a13c2f29313caabd67986"
              plot: "A man wakes up alone in the middle of the desert with a black hood on …"
              genres: Array
              runtime: 90
              ...
              released: 2015-07-02T00:00:00.000+00:00
              ...
      
            SCORE: 1.9681909084320068  _id:  "573a13f4f29313caabde14cf"
              plot: "In 1836 the Danish romantic visionary Wulff travels to Africa to creat…"
              genres: Array
              runtime: 114
              ...
              released: 2015-07-02T00:00:00.000+00:00
              ...
      
            SCORE: 1.9383430480957031  _id:  "573a13d6f29313caabd9f77d"
              plot: "The plot of the film has a grandfather telling his grand kids the stor…"
              genres: Array
              runtime: 78
              ...
              released: 2015-07-03T00:00:00.000+00:00
              ...
      
            SCORE: 1.9383430480957031  _id:  "573a13e3f29313caabdbfb00"
              plot: "The story of Amy Winehouse in her own words, featuring unseen archival…"
              genres: Array
              runtime: 128
              ...
              released: 2015-07-02T00:00:00.000+00:00
              ...
      
            SCORE: 1.9383430480957031  _id:  "573a13e9f29313caabdcbe1e"
              plot:  "A modern day train hopper fighting to become a successful musician, an…"
              genres: Array
              runtime: 90
              ...
              released: 2015-07-02T00:00:00.000+00:00
              ...
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
      
      .. include:: /includes/fts/extracts/fts-date-range-results.rst
      
   .. step:: Run an |fts| ``compound`` query with three clauses on the ``movies`` collection.
      
      The following example adds on to the previous example. 
      
      .. include:: /includes/fts/extracts/fts-date-range-complex-clauses.rst
      
      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: js
            :linenos:
      
            [
              {
                $search: {
                  "index": "date-range-tutorial",
                  "compound": {
                    "must": [{
                      "range": {
                        "path": "released",
                        "gt": ISODate("2015-01-01T00:00:00.000Z"),
                        "lt": ISODate("2015-12-31T00:00:00.000Z")
                      }
                    }],
                    "should": [{
                      "near": {
                        "path": "released",
                        "origin": ISODate("2015-07-01T00:00:00.000+00:00"),
                        "pivot": 2629800000
                      }
                    }],
                    "mustNot": [{
                      "text": {
                        "query": "documentary",
                        "path": "genres"
                      }
                    }]
                  }
                }
              }
              ]
      
         .. output::
            :visible: true
      
            SCORE: 2  _id:  "573a13c4f29313caabd6c383"
              fullplot: "When John Connor (Jason Clarke), leader of the human resistance, sends…"
              imdb: Object
              year: 2015
              ...
              genres:
                0: "Action"
                1: "Adventure"
                2: "Sci-Fi"
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 2  _id:  "573a13d9f29313caabdaa9e2"
              fullplot: "Three years after Mike bowed out of the stripper life at the top of hi…"
              imdb: Object
              year: 2015
              ...
              genres:
                0: "Comedy"
                1: "Drama"
                2: "Music"
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 2  _id:  "573a13f4f29313caabde1138"
              plot: "Dedicated home care nurse Vlasta lives for her husband Lada, her daugh…"
              genres:
                0: "Comedy"
                1: "Drama"
              runtime: 92
              ...
              released: 2015-07-01T00:00:00.000+00:00
              ...
      
            SCORE: 1.9681909084320068  _id: "573a13c2f29313caabd67986"
              plot:  "A man wakes up alone in the middle of the desert with a black hood on …"
              genres:
                0: "Drama"
                1: "Mystery"
                2: "Sci-Fi"
              runtime: 90
              ...
              released: 2015-07-02T00:00:00.000+00:00
              ...
      
            SCORE: 1.9681909084320068  _id:  "573a13f4f29313caabde14cf"
              plot: "In 1836 the Danish romantic visionary Wulff travels to Africa to creat…"
              genres:
                0: "Drama"
                1: "History"
                2: "Romance"
              runtime: 114
              ...
              released: 2015-07-02T00:00:00.000+00:00
              ...
      
            SCORE: 1.9383430480957031  _id:  "573a13d6f29313caabd9f77d"
              plot: "The plot of the film has a grandfather telling his grand kids the stor…"
              genres:
                0: "Animation"
                1: "Family"
              runtime: 78
              ...
              released: 2015-07-03T00:00:00.000+00:00
              ...
      
            SCORE: 1.9383430480957031  _id:  "573a13e9f29313caabdcbe1e"
              plot: "A modern day train hopper fighting to become a successful musician, an…"
              genres:
                0: "Drama"
              runtime: 90
              ...
              released: 2015-07-03T00:00:00.000+00:00
              ...
      
            SCORE: 1.9383430480957031  _id:  "573a13e9f29313caabdccb5b"
              plot: "A fancy garden party turns into upper class prey when a colony of kill…"
              genres:
                0: "Comedy"
                1: "Horror"
              runtime: 87
              ...
              released: 2015-07-03T00:00:00.000+00:00
              ...
      
            SCORE: 1.9102803468704224  _id:  "573a13faf29313caabdec74f"
              countries: Array
              genres:
                0: "Drama"
              runtime: 104
              ...
              released: 2015-07-03T00:00:00.000+00:00
              ...
      
            SCORE: 1.8838474750518799  _id:  "573a13eef29313caabdd531d"
              plot: "A fantasy love story that drifts between this world and heaven. Chasuk…"
              genres:
                0: "Comdedy"
              countries: Array
              ...
              released: 2015-06-27T00:00:00.000+00:00
              ...
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
      
      .. include:: /includes/fts/extracts/fts-date-range-results.rst     
