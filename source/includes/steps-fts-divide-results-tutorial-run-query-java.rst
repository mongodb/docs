.. procedure:: 
   :style: normal 

   .. step:: Ensure that your ``CLASSPATH`` contains the following libraries.

      .. list-table::
         :widths: 30 70 

         * - ``junit``
           - 4.11 or higher version 

         * - ``mongodb-driver-sync``
           - 4.3.0 or higher version

         * - ``slf4j-log4j12``
           - 1.7.30 or higher version

   .. step:: Create a file named ``DivideQueryResults.java``.

   .. step:: Copy and paste the query into the ``DivideQueryResults.java`` file.

      .. tabs:: 

         .. tab:: Paginate Results 
            :tabid: basic

            .. include:: /includes/extracts/fts-paginate-results-basic-query-desc.rst 

            .. literalinclude:: /includes/fts-tutorial/divide-results/simple-query.java
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 18

         .. tab:: Return Total and Paginate Results
            :tabid: facet

            .. include:: /includes/extracts/fts-paginate-results-facet-query-desc.rst 

            .. literalinclude:: /includes/fts-tutorial/divide-results/facet-query.java 
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 13

      .. note:: 

         To run the sample code in your Maven environment, add the 
         following code above the import statements in your file.

         .. code-block:: 

            package com.mongodb.drivers;

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Compile and run the ``DivideQueryResults.java`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Basic Example
            :tabid: basic

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac DivideQueryResults.java
                  java DivideQueryResults
        
               .. output::
                  :language: json
                  :visible: true

                  {"title": "Toy Story", "cast": ["Tom Hanks", "Tim Allen", "Don Rickles", "Jim Varney"]}
                  {"title": "Toy Story 2", "cast": ["Tom Hanks", "Tim Allen", "Joan Cusack", "Kelsey Grammer"]}
                  {"cast": ["Tom Hanks", "Nick Searcy", "Lane Smith", "David Andrews"], "title": "From the Earth to the Moon"}
                  {"title": "You've Got Mail", "cast": ["Tom Hanks", "Meg Ryan", "Greg Kinnear", "Parker Posey"]}
                  {"cast": ["Tom Hanks", "Stephen Ambrose", "Russ Meyer", "Walter Rosenblum"], "title": "Shooting War"}
                  {"title": "Catch Me If You Can", "cast": ["Leonardo DiCaprio", "Tom Hanks", "Christopher Walken", "Martin Sheen"]}
                  {"title": "The Polar Express", "cast": ["Tom Hanks", "Leslie Zemeckis", "Eddie Deezen", "Nona Gaye"]}
                  {"cast": ["Tom Hanks", "Audrey Tautou", "Ian McKellen", "Jean Reno"], "title": "The Da Vinci Code"}
                  {"cast": ["Tom Hanks", "Tim Allen", "Joan Cusack", "Ned Beatty"], "title": "Toy Story 3"}
                  {"cast": ["Tom Hanks", "Thomas Horn", "Sandra Bullock", "Zoe Caldwell"], "title": "Extremely Loud & Incredibly Close"}

         .. tab:: Facet Example
            :tabid: facet

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac DivideQueryResults.java
                  java DivideQueryResults
        
               .. output::
                  :language: json
                  :visible: true

                  {
                    "rows": [
                      {"title": "Toy Story", "cast": ["Tom Hanks", "Tim Allen", "Don Rickles", "Jim Varney"], "score": 4.617640972137451}, 
                      {"title": "Toy Story 2", "cast": ["Tom Hanks", "Tim Allen", "Joan Cusack", "Kelsey Grammer"], "score": 4.617640972137451}, 
                      {"cast": ["Tom Hanks", "Nick Searcy", "Lane Smith", "David Andrews"], "title": "From the Earth to the Moon", "score": 4.617640972137451}, 
                      {"title": "You've Got Mail", "cast": ["Tom Hanks", "Meg Ryan", "Greg Kinnear", "Parker Posey"], "score": 4.617640972137451}, 
                      {"cast": ["Tom Hanks", "Stephen Ambrose", "Russ Meyer", "Walter Rosenblum"], "title": "Shooting War", "score": 4.617640972137451}, 
                      {"title": "Catch Me If You Can", "cast": ["Leonardo DiCaprio", "Tom Hanks", "Christopher Walken", "Martin Sheen"], "score": 4.617640972137451}, 
                      {"title": "The Polar Express", "cast": ["Tom Hanks", "Leslie Zemeckis", "Eddie Deezen", "Nona Gaye"], "score": 4.617640972137451}, 
                      {"cast": ["Tom Hanks", "Audrey Tautou", "Ian McKellen", "Jean Reno"], "title": "The Da Vinci Code", "score": 4.617640972137451}, 
                      {"cast": ["Tom Hanks", "Tim Allen", "Joan Cusack", "Ned Beatty"], "title": "Toy Story 3", "score": 4.617640972137451}, 
                      {"cast": ["Tom Hanks", "Thomas Horn", "Sandra Bullock", "Zoe Caldwell"], "title": "Extremely Loud & Incredibly Close", "score": 4.617640972137451}
                    ], 
                    "totalRows": {"count": {"lowerBound": 435}}
                  }

