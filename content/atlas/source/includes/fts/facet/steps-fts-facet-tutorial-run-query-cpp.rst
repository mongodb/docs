.. procedure:: 
   :style: normal

   .. step:: Create the query in the ``FacetQuery.cpp`` file.

      a. Create a ``FacetQuery.cpp`` file in your project directory, 
         and copy and paste the following code into the file.

         The sample query uses the following to query the collection:

         .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 
         
         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline
           
               .. literalinclude:: /includes/fts/facet/Tutorial.cpp
                  :language: cpp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 20

            .. tab:: $search with $$SEARCH_META 
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/TutorialVariable.cpp
                  :language: cpp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 20

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run the ``FacetQuery.cpp`` file.

      .. io-code-block:: 
         :copyable: true

         .. input::
            :language: bash

            c++ --std=c++17 FacetQuery.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

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

      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl``,``-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh
         
            c++ --std=c++17 CreateIndex.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out