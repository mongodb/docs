.. procedure:: 
   :style: normal

   .. step:: Create the query in the ``Program.cs`` file.

      a. Replace the contents of the ``Program.cs`` file with the
         following code.

         The sample query uses the following to query the collection:

         .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 
         
         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline
           
               .. literalinclude:: /includes/fts/facet/tutorial.cs
                  :language: csharp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 9

            .. tab:: $search with $$SEARCH_META 
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/tutorial-variable.cs
                  :language: csharp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 10

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run the ``Program.cs`` file.

      .. io-code-block:: 
         :copyable: true

         .. input::
            :language: bash

            dotnet run Program.cs

         .. output::
            :language: json
            :visible: true

            {  
              "meta" : { 
                "count" : { "lowerBound" : 20878 }, 
                "facet" : { 
                "genresFacet" : { 
                    "buckets" : [
                    { "_id" : "Drama", "count" : 12149 }, 
                    { "_id" : "Comedy", "count" : 6436 }, 
                    { "_id" : "Romance", "count" : 3274 }, 
                    { "_id" : "Crime", "count" : 2429 }, 
                    { "_id" : "Thriller", "count" : 2400 },
                    { "_id" : "Action", "count" : 2349 }, 
                    { "_id" : "Adventure", "count" : 1876 }, 
                    { "_id" : "Documentary", "count" : 1755 }, 
                    { "_id" : "Horror", "count" : 1432 }, 
                    { "_id" : "Biography", "count" : 1244 }
                    ] 
                }, 
                "yearFacet" : { 
                    "buckets" : [
                    { "_id" : 1910, "count" : 14 }, 
                    { "_id" : 1920, "count" : 47 }, 
                    { "_id" : 1930, "count" : 238 }
                    ] 
                } 
                } 
              } 
            }