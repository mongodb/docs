.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Go to the :guilabel:`Search Tester`.
  
      Click the :guilabel:`Query` button to the right of the index to
      query. 

   .. step:: View and edit the query syntax.

      Click :guilabel:`Edit Query` to view a default query
      syntax sample in |json| format. 

   .. step:: Run an |fts| query against the indexed field and sort the results.

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-desc.rst

      .. io-code-block::
         :copyable: true
      
         .. input:: 
            :language: json

            [
              {
                "$search": {
                  "index": "sort-tutorial",
                  "text": {
                    "path": "title",
                    "query": "train",
                  },
                  "sort": {
                    "title": 1
                  }
                }
              }
            ]
      
         .. output:: 
            :language: shell
                
            SCORE: 3.317898988723755  _id: "573a139cf29313caabcf662c"
            plot: "A train filled with atomic devices threatens to destroy the city of De…"
            genres: Array
            runtime: 122

            SCORE: 3.317898988723755  _id: "64de50ae2932de4dd3203061"
            genres: Array
            title: "atomic train"
            awards: Object

            SCORE: 2.228306293487549  _id: "573a13bbf29313caabd52ff4"
            fullplot: "Long ago up North on the Island of Berk, the young Viking, Hiccup, wan…"
            imdb: Object
            year: 2010
                
            SCORE: 2.228306293487549  _id: "64de50da2932de4dd3204393"
            genres: Array
            title: "how to train your dragon"
            awards: Object

            SCORE: 2.008449077606201  _id: "573a13ccf29313caabd83281"
            plot: "When Hiccup and Toothless discover an ice cave that is home to hundred…"
            genres: Array
            runtime: 102

            SCORE: 1.4400973320007324  _id: "573a13b1f29313caabd36490"
            plot: "The life and times of Howard Zinn: the historian, activist, and author…"
            genres: Array
            runtime: 78

            SCORE: 2.228306293487549  _id: "573a1394f29313caabce0fb4"
            plot: "A marshal tries to bring the son of an old friend, an autocratic cattl…"
            genres: Array
            runtime: 95

            SCORE: 2.8528976440429688  _id: "573a13c8f29313caabd78a6b"
            plot: "A couple embarks on a journey home for Chinese new year along with 130…"
            genres: Array
            runtime: 85

            SCORE: 2.502213716506958  _id: "573a13baf29313caabd50811"
            plot: "Two thugs from the Perth suburb of Midland catch the last train to Fre…"
            genres: Array
            runtime: 89

            SCORE: 2.502213716506958  _id: "573a13a7f29313caabd1b667"
            fullplot: "A teacher and a gangster meet by chance in a small town pharmacy. As a…"
            imdb: Object
            year: 2002


      .. include:: /includes/fts/extracts/fts-normalized-sort-query-results.rst

      .. code-block:: json
         :copyable: false 
                
         SCORE: 3.317898988723755  _id: "573a139cf29313caabcf662c"
         plot: "A train filled with atomic devices threatens to destroy the city of De…"
         genres: Array
         runtime: 122

         SCORE: 2.2382168769836426  _id: "573a13bbf29313caabd52ff4"
         fullplot: "Long ago up North on the Island of Berk, the young Viking, Hiccup, wan…"
         imdb: object
         year: 2010

         SCORE: 2.008449077606201  _id: "573a13ccf29313caabd83281"
         plot: "When Hiccup and Toothless discover an ice cave that is home to hundred…"
         genres: Array
         runtime: 102

         SCORE: 1.4400973320007324  _id: "573a13b1f29313caabd36490"
         plot: "The life and times of Howard Zinn: the historian, activist, and author…"
         genres: Array
         runtime: 78

         SCORE: 2.8528976440429688  _id: "573a13c8f29313caabd78a6b"
         plot: "A couple embarks on a journey home for Chinese new year along with 130…"
         genres: Array
         runtime: 85

         SCORE: 2.228306293487549  _id: "573a1394f29313caabce0fb4"
         plot: "A marshal tries to bring the son of an old friend, an autocratic cattl…"
         genres: Array
         runtime: 95

         SCORE: 2.502213716506958  _id: "573a13baf29313caabd50811"
         plot: "Two thugs from the Perth suburb of Midland catch the last train to Fre…"
         genres: Array
         runtime: 89

         SCORE: 2.502213716506958  _id: "573a13a7f29313caabd1b667"
         fullplot: "A teacher and a gangster meet by chance in a small town pharmacy. As a…"
         imdb: Object
         year: 2002

         SCORE: 3.3326687812805176  _id: "573a139af29313caabcef573"
         plot: "A vengeful New York transit cop decides to steal a trainload of subway…"
         genres: Array
         runtime: 110
                
         SCORE: 3.3326687812805176  _id: "573a1398f29313caabceb8f2"
         plot: "Three stories are connected by a Memphis hotel and the spirit of Elvis…"
         genres: Array
         runtime: 110

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-run-query.rst 

   .. step:: Expand your query results.

      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
