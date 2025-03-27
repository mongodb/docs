.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``divide-query-results.js``.

   .. step:: Copy and paste the sample query into the ``divide-query-results.js`` file.

      .. tabs:: 

         .. tab:: Paginate Results 
            :tabid: basic

            .. include:: /includes/fts/extracts/fts-paginate-results-basic-query-desc.rst 

            .. literalinclude:: /includes/fts/divide-results/simple-query.js 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 27

         .. tab:: Return Total and Paginate Results 
            :tabid: facet

            .. include:: /includes/fts/extracts/fts-paginate-results-facet-query-desc.rst 

            .. literalinclude:: /includes/fts/divide-results/facet-query.js 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 42

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Query your collection.

      Run the following command to query your collection: 
  
      .. tabs:: 
         :hidden:

         .. tab:: Basic Example 
            :tabid: basic

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  node divide-query-results.js
        
               .. output::
                  :language: js
                  :visible: true

                  {
                    title: 'Toy Story',
                    cast: [ 'Tom Hanks', 'Tim Allen', 'Don Rickles', 'Jim Varney' ]
                  }
                  {
                    title: 'Toy Story 2',
                    cast: [ 'Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Kelsey Grammer' ]
                  }
                  {
                    cast: [ 'Tom Hanks', 'Nick Searcy', 'Lane Smith', 'David Andrews' ],
                    title: 'From the Earth to the Moon'
                  }
                  {
                    title: "You've Got Mail",
                    cast: [ 'Tom Hanks', 'Meg Ryan', 'Greg Kinnear', 'Parker Posey' ]
                  }
                  {
                    cast: [ 'Tom Hanks', 'Stephen Ambrose', 'Russ Meyer', 'Walter Rosenblum' ],
                    title: 'Shooting War'
                  }
                  {
                    title: 'Catch Me If You Can',
                    cast: [ 'Leonardo DiCaprio', 'Tom Hanks', 'Christopher Walken', 'Martin Sheen' ]
                  }
                  {
                    title: 'The Polar Express',
                    cast: [ 'Tom Hanks', 'Leslie Zemeckis', 'Eddie Deezen', 'Nona Gaye' ]
                  }
                  {
                    cast: [ 'Tom Hanks', 'Audrey Tautou', 'Ian McKellen', 'Jean Reno' ],
                    title: 'The Da Vinci Code'
                  }
                  {
                    cast: [ 'Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Ned Beatty' ],
                    title: 'Toy Story 3'
                  }
                  {
                    cast: [ 'Tom Hanks', 'Thomas Horn', 'Sandra Bullock', 'Zoe Caldwell' ],
                    title: 'Extremely Loud & Incredibly Close'
                  }

         .. tab:: Facet Example 
            :tabid: facet

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  node divide-query-results.js
        
               .. output::
                  :language: js
                  :visible: true

                  {
                    rows: [
                      { title: 'Toy Story', cast: [Array], score: 4.617640972137451 },
                      { title: 'Toy Story 2', cast: [Array], score: 4.617640972137451 },
                      {
                        cast: [Array],
                        title: 'From the Earth to the Moon',
                        score: 4.617640972137451
                      },
                      {
                        title: "You've Got Mail",
                        cast: [Array],
                        score: 4.617640972137451
                      },
                      { cast: [Array], title: 'Shooting War', score: 4.617640972137451 },
                      {
                        title: 'Catch Me If You Can',
                        cast: [Array],
                        score: 4.617640972137451
                      },
                      {
                        title: 'The Polar Express',
                        cast: [Array],
                        score: 4.617640972137451
                      },
                      {
                        cast: [Array],
                        title: 'The Da Vinci Code',
                        score: 4.617640972137451
                      },
                      { cast: [Array], title: 'Toy Story 3', score: 4.617640972137451 },
                      {
                        cast: [Array],
                        title: 'Extremely Loud & Incredibly Close',
                        score: 4.617640972137451
                      }
                    ],
                    totalRows: { count: { lowerBound: 435 } }
                  }
