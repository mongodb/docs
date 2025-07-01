.. procedure::
   :style: normal

   .. step:: Run a basic query.
      
      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst
      
      a. Replace the contents of the ``Program.cs`` file with the
         following code.

         .. include:: /includes/fts/extracts/fts-basic-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/simple-fts-query.cs
            :language: csharp
            :linenos:
            :emphasize-lines: 9

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: shell
            
               dotnet run Program.cs

            .. output::
               :language: shell
               :visible: false

               { "plot" : "A trio of guys try and make up for missed opportunities in childhood by forming a three-player baseball team to compete against standard children baseball squads.", "title" : "The Benchwarmers" }
               { "plot" : "A young boy is bequeathed the ownership of a professional baseball team.", "title" : "Little Big League" }
               { "plot" : "A trained chimpanzee plays third base for a minor-league baseball team.", "title" : "Ed" }

   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst     

      a. Modify your ``Program.cs`` file with the following code.

         .. include:: /includes/fts/extracts/fts-compound-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/complex-fts-query.cs
            :language: csharp
            :linenos:
            :emphasize-lines: 22-23, 27-29, 34, 53

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: shell
            
               dotnet run Program.cs

            .. output::
               :language: shell
               :visible: false
            
               { "plot" : "The story of the life and career of the famed baseball player, Lou Gehrig.", "title" : "The Pride of the Yankees", "genres" : ["Biography", "Drama", "Family"] }
               { "plot" : "Babe Ruth becomes a baseball legend but is unheroic to those who know him.", "title" : "The Babe", "genres" : ["Biography", "Drama", "Sport"] }
               { "plot" : "Dominican baseball star Miguel \"Sugar\" Santos is recruited to play in the U.S. minor-leagues.", "title" : "Sugar", "genres" : ["Drama", "Sport"] }

   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst

      a. Modify your ``Program.cs`` file with the following code.

         .. include:: /includes/fts/extracts/fts-process-results-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/sort-query.cs
            :language: csharp
            :linenos:
            :dedent:
            :emphasize-lines: 25-29, 35, 41, 61
         
      #. Specify the ``<connection-string>``, then run the query:
         
         .. io-code-block::
            :copyable: true
         
            .. input::
               :language: shell
         
               dotnet run Program.cs
         
            .. output::
               :language: shell
               :visible: false
                          
               { "plot" : "A sports agent stages an unconventional recruitment strategy to get talented Indian cricket players to play Major League Baseball.", "title" : "Million Dollar Arm", "genres" : ["Biography", "Drama", "Sport"], "released" : { "$date" : "2014-05-16T00:00:00Z" } }
               { "plot" : "A Taiwanese high school baseball team travels to Japan in 1931 to compete in a national tournament.", "title" : "Kano", "genres" : ["Biography", "Drama", "History"], "released" : { "$date" : "2014-02-27T00:00:00Z" } }
               { "plot" : "12-year-old Josh is a mixed race boy and a promising baseball player. He is abused by his mother's boyfriend Byrd, and neglected by his mother Debbie. He forges his own path in life when ...", "title" : "Calloused Hands", "genres" : ["Drama"], "released" : { "$date" : "2013-03-03T00:00:00Z" } }
