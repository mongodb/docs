.. procedure::
   :style: normal

   .. step:: Navigate to the collection in |compass|.

      On the :guilabel:`Database` screen, click the ``sample_mflix``
      database, then click the ``movies`` collection.

   .. step:: Run a basic query.
      
      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst
      
      To run this query in |compass|:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the following 
         pipeline stages by selecting the stage from the dropdown and adding
         the query for that stage. Click :guilabel:`Add Stage` to add 
         additional stages.

         .. include:: /includes/fts/extracts/fts-basic-query-desc.rst

         .. list-table::
            :header-rows: 1
            :widths: 25 75

            * - Pipeline Stage
              - Query

            * - ``$search``
              - .. code-block:: javascript

                   {
                     "text": { 
                       "query": "baseball", 
                       "path": "plot"
                     }
                   }

            * - ``$limit``
              - .. code-block:: javascript

                   3

            * - ``$project``
              - .. code-block:: javascript

                   {
                     "_id": 0,
                     "title": 1,
                     "plot": 1,
                   }


      If you enabled :guilabel:`Auto Preview`, |compass| displays the 
      following documents next to the ``$project``
      pipeline stage:

      .. code-block:: shell
         :copyable: false

          { 
            "plot" : "A trio of guys try and make up for missed opportunities in childhood by forming a three-player baseball team to compete against standard children baseball squads.", 
            "title" : "The Benchwarmers" 
          }
          { 
            "plot" : "A young boy is bequeathed the ownership of a professional baseball team.", 
            "title" : "Little Big League" 
          }
          { 
            "plot" : "A trained chimpanzee plays third base for a minor-league baseball team.", 
            "title" : "Ed" 
          }

   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst   
      .. include:: /includes/fts/extracts/fts-compound-query-desc.rst   

      Update the following pipeline stages in |compass|:

      .. list-table::
         :header-rows: 1
         :widths: 25 75

         * - Pipeline Stage
           - Query

         * - ``$search``
           - .. code-block:: javascript
                :emphasize-lines: 1-3, 10-20

                {
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

         * - ``$project``
           - .. code-block:: javascript
                :emphasize-lines: 5

                { 
                  "_id": 0,
                  "title": 1,
                  "plot": 1,
                  "genres": 1,
                } 

      If you enabled :guilabel:`Auto Preview`, |compass| displays the 
      following documents next to the ``$project``
      pipeline stage:

      .. code-block:: shell
         :copyable: false

          { 
            "plot" : "The story of the life and career of the famed baseball player, Lou Gehrig.",
            "genres" : [ "Biography", "Drama", "Family" ],
            "title" : "The Pride of the Yankees" 
          }
          { 
            "plot" : "Babe Ruth becomes a baseball legend but is unheroic to those who know him.",
            "genres" : [ "Biography", "Drama", "Sport" ], 
            "title" : "The Babe" 
          }
          { 
            "plot" : "Dominican baseball star Miguel \"Sugar\" Santos is recruited to play in the U.S. minor-leagues.",
            "genres" : [ "Drama", "Sport" ], 
            "title" : "Sugar" 
          }
    
   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst
      .. include:: /includes/fts/extracts/fts-process-results-desc.rst

      Update the following pipeline stages in |compass|:

      .. list-table::
         :header-rows: 1
         :widths: 25 75

         * - Pipeline Stage
           - Query

         * - ``$search``
           - .. code-block:: javascript
                :emphasize-lines: 19-22

                {
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

         * - ``$project``
           - .. code-block:: javascript
                :emphasize-lines: 6

                {
                  "_id": 0,
                  "title": 1,
                  "plot": 1,
                  "genres": 1,
                  "released": 1,
                }
      
      If you enabled :guilabel:`Auto Preview`, |compass| displays the 
      following documents next to the ``$project`` pipeline stage:

      .. code-block:: shell
         :copyable: false

         [
           {
             plot: 'A sports agent stages an unconventional recruitment strategy to get talented Indian cricket players to play Major League Baseball.',
             genres: [ 'Biography', 'Drama', 'Sport' ],
             title: 'Million Dollar Arm',
             released: 2014-05-16T00:00:00.000+00:00
           },
           {
             plot: 'A Taiwanese high school baseball team travels to Japan in 1931 to compete in a national tournament.',
             genres: [ 'Biography', 'Drama', 'History' ],
             title: 'Kano',
             released: 2014-02-27T00:00:00.000+00:00
           },
           {
             plot: "12-year-old Josh is a mixed race boy and a promising baseball player...",
             genres: [ 'Drama' ],
             title: 'Calloused Hands',
             released: 2013-03-03T00:00:00.000+00:00
           }
         ]

     