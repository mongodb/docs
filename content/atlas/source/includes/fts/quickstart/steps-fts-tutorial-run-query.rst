.. procedure::
   :style: normal

   .. step:: Run a basic query.

      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst      
      .. include:: /includes/fts/extracts/fts-basic-query-desc.rst

      .. io-code-block::
         :copyable: true

         .. input::
            :language: javascript
            :linenos:

            db.movies.aggregate([
              {
                $search: 
                {
                  "text": { 
                    "query": "baseball", 
                    "path": "plot"
                  }
                }
              },
              {
                $limit: 3
              },
              {
                $project: {
                  "_id": 0,
                  "title": 1,
                  "plot": 1
                }
              }
            ])

         .. output::
            :language: shell
            :visible: false
               
            { 
              "plot" : "A trio of guys try and make up for missed 
              opportunities in childhood by forming a three-player 
              baseball team to compete against standard children 
              baseball squads.", 
              "title" : "The Benchwarmers" 
            }
            { 
              "plot" : "A young boy is bequeathed the ownership of a 
              professional baseball team.", 
              "title" : "Little Big League" 
            }
            { 
              "plot" : "A trained chimpanzee plays third base for a 
              minor-league baseball team.", 
              "title" : "Ed" 
            }

   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst
      .. include:: /includes/fts/extracts/fts-compound-query-desc.rst    

      .. io-code-block::
         :copyable: true

         .. input::
            :language: javascript
            :emphasize-lines: 2-5, 12-23, 32
            :linenos:

            db.movies.aggregate([
              {
                $search: {
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
              }, 
              {
                $limit: 3
              },
              { 
                $project: { 
                  "_id": 0,
                  "title": 1,
                  "plot": 1,
                  "genres": 1
                } 
              }
            ])

         .. output::
            :language: shell
            :visible: false
               
            [
              {
                plot: 'The story of the life and career of the famed baseball player, Lou Gehrig.',
                genres: [ 'Biography', 'Drama', 'Family' ],
                title: 'The Pride of the Yankees'
              },
              {
                plot: 'Babe Ruth becomes a baseball legend but is unheroic to those who know him.',
                genres: [ 'Biography', 'Drama', 'Sport' ],
                title: 'The Babe'
              },
              {
                plot: 'Dominican baseball star Miguel "Sugar" Santos is recruited to play in the U.S. minor-leagues.',
                genres: [ 'Drama', 'Sport' ],
                title: 'Sugar'
              }
            ]

   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst
      .. include:: /includes/fts/extracts/fts-process-results-desc.rst

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell
            :linenos:
            :emphasize-lines: 17-20, 32

            db.movies.aggregate([
              {
                $search: {
                  "compound": {
                    "must": [ {
                      "text": { 
                        "query": "baseball", 
                        "path": "plot"
                      }
                    }],
                    "mustNot": [ {
                      "text": {
                        "query": ["Comedy", "Romance"],
                        "path": "genres"
                      }
                    } ]
                  },
                  "sort": {
                    "released": -1
                  }
                }
              }, 
              {
                $limit: 3
              },
              { 
                $project: { 
                  "_id": 0,
                  "title": 1,
                  "plot": 1,
                  "genres": 1,
                  "released": 1
                } 
              }
            ])

         .. output::
            :language: shell
            :visible: false

            [
              {
                plot: 'A sports agent stages an unconventional recruitment strategy to get talented Indian cricket players to play Major League Baseball.',
                genres: [ 'Biography', 'Drama', 'Sport' ],
                title: 'Million Dollar Arm',
                released: ISODate('2014-05-16T00:00:00.000Z')
              },
              {
                plot: 'A Taiwanese high school baseball team travels to Japan in 1931 to compete in a national tournament.',
                genres: [ 'Biography', 'Drama', 'History' ],
                title: 'Kano',
                released: ISODate('2014-02-27T00:00:00.000Z')
              },
              {
                plot: "12-year-old Josh is a mixed race boy and a promising baseball player...",
                genres: [ 'Drama' ],
                title: 'Calloused Hands',
                released: ISODate('2013-03-03T00:00:00.000Z')
              }
            ]
