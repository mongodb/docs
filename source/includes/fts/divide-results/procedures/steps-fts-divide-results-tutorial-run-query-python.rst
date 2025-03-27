.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``divide-query-results.py``.

   .. step:: Copy and paste the query into the ``divide-query-results.py`` file.

      .. tabs:: 

         .. tab:: Paginate Results 
            :tabid: basic

            .. include:: /includes/fts/extracts/fts-paginate-results-basic-query-desc.rst

            .. literalinclude:: /includes/fts/divide-results/simple_query.py 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 4

         .. tab:: Return Total and Paginate Results 
            :tabid: facet

            .. include:: /includes/fts/extracts/fts-paginate-results-facet-query-desc.rst

            .. literalinclude:: /includes/fts/divide-results/facet-query.py 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 4

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the command to query your collection.

      .. tabs::
         :hidden: 

         .. tab:: Basic Example 
            :tabid: basic

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell
           
                  python divide-query-results.py

               .. output::
                  :language: json
                  :visible: true
            
                  {'title': 'Toy Story', 'cast': ['Tom Hanks', 'Tim Allen', 'Don Rickles', 'Jim Varney']}
                  {'title': 'Toy Story 2', 'cast': ['Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Kelsey Grammer']}
                  {'cast': ['Tom Hanks', 'Nick Searcy', 'Lane Smith', 'David Andrews'], 'title': 'From the Earth to the Moon'}
                  {'title': "You've Got Mail", 'cast': ['Tom Hanks', 'Meg Ryan', 'Greg Kinnear', 'Parker Posey']}v
                  {'cast': ['Tom Hanks', 'Stephen Ambrose', 'Russ Meyer', 'Walter Rosenblum'], 'title': 'Shooting War'}
                  {'title': 'Catch Me If You Can', 'cast': ['Leonardo DiCaprio', 'Tom Hanks', 'Christopher Walken', 'Martin Sheen']}
                  {'title': 'The Polar Express', 'cast': ['Tom Hanks', 'Leslie Zemeckis', 'Eddie Deezen', 'Nona Gaye']}
                  {'cast': ['Tom Hanks', 'Audrey Tautou', 'Ian McKellen', 'Jean Reno'], 'title': 'The Da Vinci Code'}
                  {'cast': ['Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Ned Beatty'], 'title': 'Toy Story 3'}
                  {'cast': ['Tom Hanks', 'Thomas Horn', 'Sandra Bullock', 'Zoe Caldwell'], 'title': 'Extremely Loud & Incredibly Close'}

         .. tab:: Facet Example 
            :tabid: facet

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell
           
                  python divide-query-results.py

               .. output::
                  :language: json
                  :visible: true

                  {
                    'rows': [
                       {'title': 'Toy Story', 'cast': ['Tom Hanks', 'Tim Allen', 'Don Rickles', 'Jim Varney'], 'score': 4.617640972137451}, 
                       {'title': 'Toy Story 2', 'cast': ['Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Kelsey Grammer'], 'score': 4.617640972137451}, 
                       {'cast': ['Tom Hanks', 'Nick Searcy', 'Lane Smith', 'David Andrews'], 'title': 'From the Earth to the Moon', 'score': 4.617640972137451}, 
                       {'title': "You've Got Mail", 'cast': ['Tom Hanks', 'Meg Ryan', 'Greg Kinnear', 'Parker Posey'], 'score': 4.617640972137451}, 
                       {'cast': ['Tom Hanks', 'Stephen Ambrose', 'Russ Meyer', 'Walter Rosenblum'], 'title': 'Shooting War', 'score': 4.617640972137451}, 
                       {'title': 'Catch Me If You Can', 'cast': ['Leonardo DiCaprio', 'Tom Hanks', 'Christopher Walken', 'Martin Sheen'], 'score': 4.617640972137451}, 
                       {'title': 'The Polar Express', 'cast': ['Tom Hanks', 'Leslie Zemeckis', 'Eddie Deezen', 'Nona Gaye'], 'score': 4.617640972137451}, 
                       {'cast': ['Tom Hanks', 'Audrey Tautou', 'Ian McKellen', 'Jean Reno'], 'title': 'The Da Vinci Code', 'score': 4.617640972137451}, 
                       {'cast': ['Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Ned Beatty'], 'title': 'Toy Story 3', 'score': 4.617640972137451}, 
                       {'cast': ['Tom Hanks', 'Thomas Horn', 'Sandra Bullock', 'Zoe Caldwell'], 'title': 'Extremely Loud & Incredibly Close', 'score': 4.617640972137451}
                    ], 
                    'totalRows': {'count': {'lowerBound': 435}}
                  }
