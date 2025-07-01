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
      
   .. step:: Run an |fts| query with the ``autocomplete`` operator on the ``movies`` collection.
      
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
                  autocomplete: {
                    query: "ger",
                    path: "title"
                  }
                }
              }
            ]
            
         .. output::
            :visible: true
            
            SCORE: 6.085907459259033  _id:  "573a1390f29313caabcd50e5"
              plot: "The cartoonist, Winsor McCay, brings the Dinosaurus back to life in th…"
              genre: Array
              runtime: 12
      
            SCORE: 6.085907459259033  _id:  "573a1393f29313caabcddae1"
              plot: "Edmund, a young boy who lives in war-devastated Germany after the Seco…"
              genres: Array
              runtime: 78
      
            SCORE: 6.085907459259033  _id:  "573a1397f29313caabce6b75"
              plot: "Germany in Autumn does not have a plot per se; it mixes documentary fo…"
              genres: Array
              runtime: 123
      
            SCORE: 6.085907459259033  _id:  "573a1397f29313caabce77b5"
              plot: "Germany 1939. Hans and Lene marry the day before the war breaks out, a…"
              genres: Array
              runtime: 123
      
            SCORE: 6.085907459259033  _id:  "573a13d4f29313caabd99fa2"
              plot: "A documentary on the German artist that includes glimpses at his studi…"
              genres: Array
              runtime: 97
            
            SCORE: 6.046686172485352  _id:  "573a1399f29313caabcedb50"
              plot: "The story of the Apache chief and his armed resistance to the US Gover…"
              genres: Array
              runtime: 115
      
            SCORE: 5.8947296142578125  _id:  "573a13a5f29313caabd15dae"
              num_mflix_comments: 1
              genres: Array
              runtime: 83
      
            SCORE: 5.826231956481934  _id:  "573a139bf29313caabcf36bd"
              plot: "Geri sets up a chess game to play his greatest opponent - himself."
              genres: Array
              runtime: 4
      
            SCORE: 5.772464752197266  _id:  "573a13d2f29313caabd922de"
              plot: "The true story of an Argentine family who lived with Josef Mengele wit…"
              genres: Array
              runtime: 93
      
            SCORE: 5.772464752197266  _id:  "573a13b4f29313caabd41bb7"
              plot: "In 1928, Dr. Max Gerson, a German-Jewish researcher, stumbled upon a t…"
              genres: Array
              countries: Array
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
      
