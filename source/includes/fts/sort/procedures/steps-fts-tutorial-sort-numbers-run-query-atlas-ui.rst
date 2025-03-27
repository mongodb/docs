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
      
   .. step:: Run an |fts| query against the indexed field and sort the results.

      .. include:: /includes/fts/extracts/fts-sort-by-numbers-constant-desc.rst 
      
      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      .. io-code-block::
         :copyable: true 
      
         .. input::
            :language: json
      
            [
              {
                "$search": {
                  "index": "sort-tutorial",
                  "range": {
                    "path": "awards.wins",
                    "gte": 10
                  },
                  "sort": {
                    "awards.wins": -1,
                  }
                }
              }
            ]
            
         .. output::
            :visible: true
            :emphasize-lines: 8, 19, 30, 41, 52, 63, 74, 85, 96, 107
            
            SCORE: 1  _id:  "573a13d5f29313caabd9cae7"
              fullplot: "Based on an incredible true story of one man's fight for survival and …"
              imdb: Object
                ...
              year: 2013
              ...
              awards: Object
                wins: 267
                ...
              ...
      
            SCORE: 1  _id:  "573a13c7f29313caabd74a4d"
              fullplot: "Dr. Ryan Stone (Sandra Bullock) is a brilliant medical engineer on her…"
              imdb: Object
                ...
              year: 2013
              ...
              awards: Object
                wins: 231
                ...
              ...
      
            SCORE: 1  _id:  "573a13cbf29313caabd808d2"
              fullplot: "Dr. Ryan Stone (Sandra Bullock) is a brilliant medical engineer on her…"
              imdb: Object
                ...
              year: 2013
              ...
              awards: Object
                wins: 231
                ...
              ...
      
            SCORE: 1  _id:  “573a13dff29313caabdb7adb”"
              fullplot: "Actor Riggan Thomson is most famous for his movie role from over twent…"
              imdb: Object
                ...
              year: 2014
              ...
              awards: Object
                wins: 210
                ...
              ...
      
            SCORE: 1  _id:  "573a13bef29313caabd5c06c"
              plot: "The life of Mason, from early childhood to his arrival at college."
              imdb: Object
                ...
              runtime: 165
              ...
              awards: Object
                wins: 185
                ...
              ...
      
            SCORE: 1  _id:  "573a139ef29313caabcfbd6a"
              fullplot: "While Frodo & Sam continue to approach Mount Doom to destroy the One R…"
              imdb: Object
                ...
              year: 2003
              ...
              awards: Object
                wins: 175
                ...
              ...
            
            SCORE: 1  _id:  "573a13b5f29313caabd447f5"
              plot: "In rural Texas, welder and hunter Llewelyn Moss discovers the remains …"
              imdb: Object
                ...
              year: 2007
              ...
              awards: Object
                wins: 172
                ...
              ...
      
            SCORE: 1  _id:  "573a13c3f29313caabd68d9f"
              plot: "On a fall night in 2003, Harvard undergrad and computer programming ge…"
              imdb: Object
                ...
              year: 2010
              ...
              awards: Object
                wins: 171
                ...
              ...
      
            SCORE: 1  _id:  "573a13c5f29313caabd6ee61"
              fullplot: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of…"
              imdb: Object
                ...
              year: 2010
              ...
              awards: Object
                wins: 162
                ...
              ...
      
            SCORE: 1  _id:  "573a13bdf29313caabd58fd3"
              plot: "The story of Jamal Malik, an 18 year-old orphan from the slums of Mumb…"
              imdb: Object
                ...
              year: 2008
              ...
              awards: Object
                wins: 161
                ...
              ...
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst  
