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
      
   .. step:: Run an |fts| query against the indexed date field and sort the results.

      .. include:: /includes/fts/extracts/fts-sort-by-date-constant-desc.rst
      
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
                    "filter": [{
                      "wildcard": {
                        "query": "Summer*",
                        "path": "title"
                      }
                    }],
                    "must": [{
                      "near": {
                        "pivot": 13149000000,
                        "path": "released",
                        "origin": ISODate("2014-04-18T00:00:00.000+00:00")
                      }
                    }]
                  },
                  "sort": {
                    "released": -1,
                    "title": 1
                  }
                }
              }
            ]
            
         .. output::
            :visible: true
      
            SCORE: 0.348105788230896  _id:  "573a13f0f29313caabddaf7a"
              countries: Array
              runtime: 104
              cast: Array
              ...
              title: "Summer Nights"
              ...
              released: 2015-01-28T00:00:00.000+00:00
              ...
      
            SCORE: 0.5917375683784485  _id:  "573a13e6f29313caabdc673b"
              plot: "25-year-old Iiris and Karoliina have been best friends since childhood…"
              genres: Array
              runtime: 90
              ...
              title: "Summertime"
              ...
              released: 2014-08-01T00:00:00.000+00:00
              ...
      
            SCORE: 0.9934720396995544  _id:  "573a13eff29313caabdd760c"
              plot: "Erik Sparrow is one of the lucky ones. He's got a good job. He's in a …"
              genres: Array
              runtime: 86
              ...
              title: "Summer of Blood"
              ...
              released: 2014-04-17T00:00:00.000+00:00
              ...
      
            SCORE: 0.15982933342456818  _id:  "573a13cff29313caabd8ab74"
              plot: "The story of an adult and a teenage couple during a brief summer holid…"
              genres: Array
              countries: Array
              ...
              title: "Summer Games"
              ...
              released: 2012-02-08T00:00:00.000+00:00
              ...
      
            SCORE: 0.13038821518421173  _id:  "573a13cef29313caabd87f4e"
              plot: "Summer of Goliath is a documentary/fiction hybrid that narrates variou…"
              genres: Array
              runtime: 78
              ...
              title: "Summer of Goliath"
              ...
              released: 2011-07-08T00:00:00.000+00:00
              ...
      
            SCORE: 0.08124520629644394  _id:  "573a13c7f29313caabd7608d"
              plot: "A student tries to fix a problem he accidentally caused in OZ, a digit…"
              genres: Array
              runtime: 114
              ...
              title: "Summer Wars"
              ...
              released: 2009-08-01T00:00:00.000+00:00
      
            SCORE: 0.0711759403347969  _id:  "573a13bbf29313caabd54ee6"
              plot: "The life of a public school epitomized by disobedient student Jonah Ta…"
              genres: Array
              runtime: 30
              ...
              title: "Summer Heights High"
              ...
              released: 2008-11-09T00:00:00.000+00:00
              ...
      
            SCORE: 0.06951779872179031  _id:  "573a13bff29313caabd5f935"
              plot: "On his spring break at the seaside, with his wife and his four year ol…"
              genres: Array
              runtime: 102
              ...
              title: "Summer Holiday"
              ...
              released: 2008-09-19T00:00:00.000+00:00
              ...
      
            SCORE: 0.05834990739822388  _id:  "573a13c0f29313caabd628ac"
              plot: "Kochi Uehara is a fourth grade student living in the suburb of Tokyo. …"
              genres: Array
              runtime: 138
              ...
              title: "Summer Days with Coo"
              ...
              released: 2007-07-28T00:00:00.000+00:00
              ...
      
            SCORE: 0.056174591183662415  _id:  "573a13b8f29313caabd4c1d0"
              fullplot: "Country girl Yu Hong leaves her village, her family and her lover to s…"
              genres: Array
              runtime: 158
              ...
              title: "Summer Palace"
              ...
              released: 2007-04-18T00:00:00.000+00:00
              ...
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst    
