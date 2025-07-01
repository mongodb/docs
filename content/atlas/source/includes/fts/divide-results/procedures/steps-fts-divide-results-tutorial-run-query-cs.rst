.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``divide-query-results`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir divide-query-results
            cd divide-query-results
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/fts-paginate-results-basic-query-desc.rst 

            .. literalinclude:: /includes/fts/divide-results/simple-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

         .. tab:: Facet Example 
            :tabid: facet

            .. include:: /includes/fts/extracts/fts-paginate-results-facet-query-desc.rst 

            .. literalinclude:: /includes/fts/divide-results/facet-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 12

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Paginate Results 
            :tabid: basic

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run divide-query-results.csproj

               .. output:: 
                  :language: javascript

                  { "title" : "Toy Story", "cast" : ["Tom Hanks", "Tim Allen", "Don Rickles", "Jim Varney"], "score" : 4.6176409721374512 }, 
                  { "title" : "Toy Story 2", "cast" : ["Tom Hanks", "Tim Allen", "Joan Cusack", "Kelsey Grammer"], "score" : 4.6176409721374512 }, 
                  { "cast" : ["Tom Hanks", "Nick Searcy", "Lane Smith", "David Andrews"], "title" : "From the Earth to the Moon", "score" : 4.6176409721374512 }, 
                  { "title" : "You've Got Mail", "cast" : ["Tom Hanks", "Meg Ryan", "Greg Kinnear", "Parker Posey"], "score" : 4.6176409721374512 }, 
                  { "cast" : ["Tom Hanks", "Stephen Ambrose", "Russ Meyer", "Walter Rosenblum"], "title" : "Shooting War", "score" : 4.6176409721374512 }, 
                  { "title" : "Catch Me If You Can", "cast" : ["Leonardo DiCaprio", "Tom Hanks", "Christopher Walken", "Martin Sheen"], "score" : 4.6176409721374512 }, 
                  { "title" : "The Polar Express", "cast" : ["Tom Hanks", "Leslie Zemeckis", "Eddie Deezen", "Nona Gaye"], "score" : 4.6176409721374512 }, 
                  { "cast" : ["Tom Hanks", "Audrey Tautou", "Ian McKellen", "Jean Reno"], "title" : "The Da Vinci Code", "score" : 4.6176409721374512 }, 
                  { "cast" : ["Tom Hanks", "Tim Allen", "Joan Cusack", "Ned Beatty"], "title" : "Toy Story 3", "score" : 4.6176409721374512 }, 
                  { "cast" : ["Tom Hanks", "Thomas Horn", "Sandra Bullock", "Zoe Caldwell"], "title" : "Extremely Loud & Incredibly Close", "score" : 4.6176409721374512 }

         .. tab:: Return Total and Paginate Results 
            :tabid: facet

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run divide-query-results.csproj

               .. output:: 
                  :language: javascript

                  { 
                    "rows" : [
                       { "title" : "Toy Story", "cast" : ["Tom Hanks", "Tim Allen", "Don Rickles", "Jim Varney"], "score" : 4.6176409721374512 }, 
                       { "title" : "Toy Story 2", "cast" : ["Tom Hanks", "Tim Allen", "Joan Cusack", "Kelsey Grammer"], "score" : 4.6176409721374512 }, 
                       { "cast" : ["Tom Hanks", "Nick Searcy", "Lane Smith", "David Andrews"], "title" : "From the Earth to the Moon", "score" : 4.6176409721374512 }, 
                       { "title" : "You've Got Mail", "cast" : ["Tom Hanks", "Meg Ryan", "Greg Kinnear", "Parker Posey"], "score" : 4.6176409721374512 }, 
                       { "cast" : ["Tom Hanks", "Stephen Ambrose", "Russ Meyer", "Walter Rosenblum"], "title" : "Shooting War", "score" : 4.6176409721374512 }, 
                       { "title" : "Catch Me If You Can", "cast" : ["Leonardo DiCaprio", "Tom Hanks", "Christopher Walken", "Martin Sheen"], "score" : 4.6176409721374512 }, 
                       { "title" : "The Polar Express", "cast" : ["Tom Hanks", "Leslie Zemeckis", "Eddie Deezen", "Nona Gaye"], "score" : 4.6176409721374512 }, 
                       { "cast" : ["Tom Hanks", "Audrey Tautou", "Ian McKellen", "Jean Reno"], "title" : "The Da Vinci Code", "score" : 4.6176409721374512 }, 
                       { "cast" : ["Tom Hanks", "Tim Allen", "Joan Cusack", "Ned Beatty"], "title" : "Toy Story 3", "score" : 4.6176409721374512 }, 
                       { "cast" : ["Tom Hanks", "Thomas Horn", "Sandra Bullock", "Zoe Caldwell"], "title" : "Extremely Loud & Incredibly Close", "score" : 4.6176409721374512 }
                    ], 
                    "totalRows" : { "count" : { "lowerBound" : NumberLong(435) } } 
                  }
