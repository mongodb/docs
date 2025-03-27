.. procedure::
   :style: normal

   .. step:: Connect to your {+cluster+} in {+mongosh+}.

      Open {+mongosh+} in a terminal window and
      connect to your {+cluster+}. For detailed instructions on 
      connecting, see :doc:`/mongo-shell-connection`.

   .. step:: Use the ``sample_mflix`` database.

      Run the following command in the {+mongosh+} prompt:

      .. code-block:: javascript

         use sample_mflix

   .. step:: Run an |fts| query against the ``movies`` collection.

      .. tabs::

         .. tab:: Paginate Results
            :tabid: pagination

            .. include:: /includes/fts/extracts/fts-paginate-results-basic-query-desc.rst

            .. io-code-block::
               :copyable: true 

               .. input:: /includes/fts/divide-results/simple-query.json
                  :language: json
                  :linenos:

               .. output::
                  :language: json
                  :visible: true

                  [
                    {
                      title: 'Toy Story',
                      cast: [ 'Tom Hanks', 'Tim Allen', 'Don Rickles', 'Jim Varney' ]
                    },
                    {
                      title: 'Toy Story 2',
                      cast: [ 'Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Kelsey Grammer' ]
                    },
                    {
                      cast: [ 'Tom Hanks', 'Nick Searcy', 'Lane Smith', 'David Andrews' ],
                      title: 'From the Earth to the Moon'
                    },
                    {
                      title: "You've Got Mail",
                      cast: [ 'Tom Hanks', 'Meg Ryan', 'Greg Kinnear', 'Parker Posey' ]
                    },
                    {
                      cast: [
                        'Tom Hanks',
                        'Stephen Ambrose',
                        'Russ Meyer',
                        'Walter Rosenblum'
                      ],
                      title: 'Shooting War'
                    },
                    {
                      title: 'Catch Me If You Can',
                      cast: [
                        'Leonardo DiCaprio',
                        'Tom Hanks',
                        'Christopher Walken',
                        'Martin Sheen'
                      ]
                    },
                    {
                      title: 'The Polar Express',
                      cast: [ 'Tom Hanks', 'Leslie Zemeckis', 'Eddie Deezen', 'Nona Gaye' ]
                    },
                    {
                      cast: [ 'Tom Hanks', 'Audrey Tautou', 'Ian McKellen', 'Jean Reno' ],
                      title: 'The Da Vinci Code'
                    },
                    {
                      cast: [ 'Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Ned Beatty' ],
                      title: 'Toy Story 3'
                    },
                    {
                      cast: [ 'Tom Hanks', 'Thomas Horn', 'Sandra Bullock', 'Zoe Caldwell' ],
                      title: 'Extremely Loud & Incredibly Close'
                    }
                  ]
            
         .. tab:: Return Total and Paginate Results
            :tabid: return-total

            .. include:: /includes/fts/extracts/fts-paginate-results-facet-query-desc.rst

            .. io-code-block::
               :copyable: true 

               .. input:: /includes/fts/divide-results/facet-query.json
                  :language: json
                  :linenos:

               .. output::
                  :language: json

                  [
                    {
                      rows: [
                        {
                          title: 'Toy Story',
                          cast: [ 'Tom Hanks', 'Tim Allen', 'Don Rickles', 'Jim Varney' ],
                          score: 4.617640972137451
                        },
                        {
                          title: 'Toy Story 2',
                          cast: [ 'Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Kelsey Grammer' ],
                          score: 4.617640972137451
                        },
                        {
                          cast: [ 'Tom Hanks', 'Nick Searcy', 'Lane Smith', 'David Andrews' ],
                          title: 'From the Earth to the Moon',
                          score: 4.617640972137451
                        },
                        {
                          title: "You've Got Mail",
                          cast: [ 'Tom Hanks', 'Meg Ryan', 'Greg Kinnear', 'Parker Posey' ],
                          score: 4.617640972137451
                        },
                        {
                          cast: [
                            'Tom Hanks',
                            'Stephen Ambrose',
                            'Russ Meyer',
                            'Walter Rosenblum'
                          ],
                          title: 'Shooting War',
                          score: 4.617640972137451
                        },
                        {
                          title: 'Catch Me If You Can',
                          cast: [
                            'Leonardo DiCaprio',
                            'Tom Hanks',
                            'Christopher Walken',
                            'Martin Sheen'
                          ],
                          score: 4.617640972137451
                        },
                        {
                          title: 'The Polar Express',
                          cast: [ 'Tom Hanks', 'Leslie Zemeckis', 'Eddie Deezen', 'Nona Gaye' ],
                          score: 4.617640972137451
                        },
                        {
                          cast: [ 'Tom Hanks', 'Audrey Tautou', 'Ian McKellen', 'Jean Reno' ],
                          title: 'The Da Vinci Code',
                          score: 4.617640972137451
                        },
                        {
                          cast: [ 'Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Ned Beatty' ],
                          title: 'Toy Story 3',
                          score: 4.617640972137451
                        },
                        {
                          cast: [ 
                            'Tom Hanks',
                            'Thomas Horn',
                            'Sandra Bullock',
                            'Zoe Caldwell' ],
                          title: 'Extremely Loud & Incredibly Close',
                          score: 4.617640972137451
                        }
                      ]
                      totalRows: { count: { lowerBound: Long("435") } }
                    }
                  ]
