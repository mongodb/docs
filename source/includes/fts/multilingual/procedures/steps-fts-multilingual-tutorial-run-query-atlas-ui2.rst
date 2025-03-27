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
      
   .. step:: Run an |fts| multilingual query that searches for an English and Italian term.

      This query uses the following ``compound`` operator clauses to query the collection:
      
      .. include:: /includes/fts/extracts/fts-multilingual2-constant-desc.rst 
      
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
                        "query": "Bella",
                        "path": { "value": "fullplot", "multi": "fullplot_english" }
                      }
                    }], 
                    "mustNot": [{ 
                      "range": { 
                        "path": "released", 
                        "gt": ISODate("1984-01-01T00:00:00.000Z"), 
                        "lt": ISODate("2016-01-01T00:00:00.000Z") 
                      } 
                    }], 
                    "should": [{ 
                      "text": { 
                        "query": "Comedy",
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
      
            SCORE: 3.909510850906372  _id: "573a1397f29313caabce8bad"
              plot: "He is a revenge-obssessed stevedore whose sister was brutally raped an…"
              genres:
                0: "Drama"
              runtime: 137
              fullplot: "In Marseilles, a woman commits suicide after she is raped in an alley.…"
              released: 1983-05-18T00:00:00.000+00:00
            
            SCORE: 3.4253346920013428  _id: "573a1396f29313caabce5735"
              plot: "Giovanna e' una bella ragazza, ma ha qualche problema con gli uomini: …"
              genres:
                0: "Comedy"
              runtime: 100
              fullplot: "Giovanna e' una bella ragazza, ma ha qualche problema con gli uomini: …"
              released: 1974-11-15T00:00:00.000+00:00
            
            SCORE: 3.363344430923462  _id: "573a1395f29313caabce13cf"
              plot: "Gerardo è un attore o almeno cerca di esserlo, ma il pubblico non è de…"
              genres:
                0: "Comedy"
              runtime: 95
              fullplot: "Gerardo è un attore o almeno cerca di esserlo, ma il pubblico non è de…"
              released: 1960-02-10T00:00:00.000+00:00
            
            SCORE: 1.9502882957458496  _id: "573a1396f29313caabce5299"
              plot: "Dr Tremayne is an enigmatic Psychiatrist running a
              Futuristic asylum h…"
              genres:
                0: "Horror"
              runtime: 90
              fullplot: "Dr Tremayne is an enigmatic Psychiatrist running a Futuristic asylum h…"
              released: 1973-10-31T00:00:00.000+00:00
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst 
