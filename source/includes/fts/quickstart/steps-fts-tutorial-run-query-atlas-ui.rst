.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Go to the :guilabel:`Search Tester`.
      
      Click the :guilabel:`Query` button to the right of the index to 
      query.
      
   .. step:: View and edit the query syntax.
      
      Click :guilabel:`Edit Query` to view a default query syntax 
      sample in |json| format.
      
   .. step:: Run a basic query.
      
      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst
      .. include:: /includes/fts/extracts/fts-basic-query-desc-ui.rst

      Paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.

      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: json
            :linenos:
      
            [
              {
                $search: 
                  {
                    text: {
                      query: "baseball",
                      path: "plot"
                  }
                }
              }
            ]
      
         .. output::
            :visible: false
               
            SCORE: 3.8531038761138916  _id:  "573a13b3f29313caabd3b409"
              fullplot: "Three guys, all their lives, have been living in the shadow of bullies…"
              imdb: Object
              year: 2006 
              ...
      
            SCORE: 3.6254453659057617  _id:  "573a1399f29313caabcee801"
              plot: "A young boy is bequeathed the ownership of a professional baseball tea..."
              genres: Array
              runtime: 119
              ...
      
            SCORE: 3.6254453659057617  _id:  "573a139af29313caabcefe18"
              plot: "A trained chimpanzee plays third base for a minor-league baseball team..."
              genres: Array
              runtime: 94
              ...
              
            ... 

      .. note::

         .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst

   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst
      .. include:: /includes/fts/extracts/fts-compound-query-desc-ui.rst
            
      Paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: json
            :emphasize-lines: 1-5, 12-24
            :linenos:

            [
              {
                "$search": {
                  "compound": {
                    "must": [
                      {
                        "text": {
                          "query": "baseball",
                          "path": "plot"
                        }
                      }
                    ],
                    "mustNot": [
                      {
                        "text": {
                          "query": ["Comedy", "Romance"],
                          "path": "genres"
                        }
                      }
                    ]
                  }
                }
              }
            ]
         
         .. output::
            :visible: false
               
            SCORE: 3.4706974029541016  _id:  "573a1393f29313caabcdca79"
              title: "The Pride of the Yankees"
              plot: "The story of the life and career of the famed baseball player, Lou Geh…"
              genres: ["Biography", "Drama", "Family"]
              ...
      
            SCORE: 3.4706974029541016  _id:  "573a1399f29313caabcecef1"
              title: "The Babe"
              plot: "Babe Ruth becomes a baseball legend but is unheroic to those who know …"
              genres: ["Biography", "Drama", "Sport"]
              ...

      
            SCORE: 3.406810760498047  _id:  "573a13bdf29313caabd5813d"
              title: "Sugar"
              plot: "Dominican baseball star Miguel \"Sugar\" Santos is recruited to play in …"
              genres: ["Drama", "Sport"]
              ...

            ...

   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst
      .. include:: /includes/fts/extracts/fts-process-results-desc-ui.rst

      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: json
            :emphasize-lines: 21-24
            :linenos:

            [
              {
                "$search": {
                  "compound": {
                    "must": [
                      {
                        "text": {
                          "query": "baseball",
                          "path": "plot"
                        }
                      }
                    ],
                    "mustNot": [
                      {
                        "text": {
                          "query": ["Comedy", "Romance"],
                          "path": "genres"
                        }
                      }
                    ]
                  },
                  "sort": {
                    "released": -1
                  }
                }
              }
            ]

         .. output::
            :visible: false
            
            SCORE: 3.173170804977417  _id: "573a13ccf29313caabd832f5"
              plot: "A sports agent stages an unconventional recruitment strategy to get ta…"
              title: "Million Dollar Arm"
              genres: Array (3)
              released: 2014-05-16T00:00:00.000+00:00
              ...
              
            SCORE: 3.2858426570892334  _id: "573a13d9f29313caabda97d8"
              plot: "A Taiwanese high school baseball team travels to Japan in 1931 to comp…"
              title: "Kano"
              genres: Array (3)
              released: 2014-02-27T00:00:00.000+00:00
              ...
              
            SCORE: 2.4570295810699463  _id: "573a13daf29313caabdad92d"
              plot: "12-year-old Josh is a mixed race boy and a promising baseball player..."
              title: "Calloused Hands"
              genres: Array (1)
              released: 2013-03-03T00:00:00.000+00:00
              ...
            
            ...
