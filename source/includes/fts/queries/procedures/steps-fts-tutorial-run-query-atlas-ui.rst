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
      
   .. step:: Run a simple |fts| query on the ``movies`` collection.
      
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
                  index: "default",
                  text: {
                    query: "baseball",
                    path: "plot"
                  }
                }
              }
            ]
      
         .. output::
            :visible: true
               
            SCORE: 3.8531038761138916  _id:  "573a13b3f29313caabd3b409"
              fullplot: "Three guys, all their lives, have been living in the shadow of bullies…"
              imdb: Object
              year: 2006 
      
            SCORE: 3.6254453659057617  _id:  "573a1399f29313caabcee801"
              plot: "A young boy is bequeathed the ownership of a professional baseball tea..."
              genres: Array
              runtime: 119
      
            SCORE: 3.6254453659057617  _id:  "573a139af29313caabcefe18"
              plot: "A trained chimpanzee plays third base for a minor-league baseball team..."
              genres: Array
              runtime: 94
      
            SCORE: 3.489243507385254  _id:  "573a1393f29313caabcdca79"
              plot: "The story of the life and career of the famed baseball player, Lou Geh..."
              genres: Array
              runtime: 128
      
            SCORE: 3.489243507385254  _id:  "573a1399f29313caabcecef1"
              plot: "Babe Ruth becomes a baseball legend but is unheroic to those who know ..." 
              genres: Array
              runtime: 115
            
            SCORE: 3.4249095916748047  _id:  "573a1398f29313caabcebccf"
              plot: "Two disquieted junior baseball players seek revenge on the local yakuz…"
              genres: Array
              runtime: 96
      
            SCORE: 3.4249095916748047  _id:  "573a13bdf29313caabd5813d"
              plot: "Dominican baseball star Miguel "Sugar" Santos is recruited to play in …"
              genres: Array
              runtime: 114
      
            SCORE: 3.3629050254821777  _id:  "573a139af29313caabcefe79"
              plot: "An all star baseball player becomes the unhealthy focus of a down on h…"
              genres: Array
              runtime: 116
      
            SCORE: 3.303105354309082  _id:  "573a1399f29313caabced370"
              plot: "A fading baseball player is traded to a Japanese team and has trouble …"
              genres: Array
              runtime: 108
      
            SCORE: 3.303105354309082  _id:  "573a13a0f29313caabd05773"
              fullplot: "The story of Baseball Hall-of-Famer Hank Greenberg is told through arc…"
              imdb: Object
              year: 1998
      
      To learn more about the :ref:`$search <query-syntax-ref>`
      pipeline stage, see its reference page. For complete aggregation
      pipeline documentation, see the :manual:`MongoDB Server Manual
      </aggregation>`.
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
      
