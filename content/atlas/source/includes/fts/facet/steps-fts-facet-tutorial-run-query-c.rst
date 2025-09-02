.. procedure:: 
   :style: normal 

   .. step:: Create a ``facet_query.c`` file in your project directory.

      a. Copy and paste the following code into the ``facet_query.c`` file.

         The sample query uses the following to query the collection:

         .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 
         
         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline
           
               .. literalinclude:: /includes/fts/facet/tutorial.c
                  :language: c
                  :linenos:
                  :dedent:
                  :emphasize-lines: 19

            .. tab:: $search with $$SEARCH_META 
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/tutorial_variable.c
                  :language: c
                  :linenos:
                  :dedent:
                  :emphasize-lines: 20

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Set up a CMake application.

      To configure your application, create a ``CMakeLists.txt`` file in
      your project directory. Then, add the following code to the file:

      .. literalinclude:: /includes/fts/facet/initialize-cmake-c.rst
         :caption: CMakeLists.txt
         :language: txt
         :linenos:
         :copyable:

      The preceding code performs the following actions:
      
      - Configures a C project.
      - Creates a ``index.out`` executable for your application.
      - Finds and requires the C driver. Replace the ``<version>``
        placeholder with your C driver version facet, such as ``2.0.0``.
      - Links the program to the ``libmongoc`` library.

      .. note::

         In the sample ``CMakeLists.txt`` file, the ``mongoc::mongoc`` target
         points to either the static library or the shared library.
         The library type depends on which one is available and
         whichever type the user specifies in the ``MONGOC_DEFAULT_IMPORTED_LIBRARY_TYPE``
         CMake configuration setting. If you don't set this value and
         both library types are available, ``mongoc::mongoc`` uses
         the static library.

         You can use the ``mongoc::static`` target to explicitly use the 
         static library or the ``mongoc::shared`` target to use the shared
         library.

   .. step:: Compile and run the ``facet_query.c`` file.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake -S. -Bcmake-build
            cmake --build cmake-build --target query.out
            ./cmake-build/query.out

         .. output::
            :language: json
            :visible: true

            {  
              "meta" : { 
                "count" : { "lowerBound" : { "$numberLong" : "20878" } }, 
                "facet" : { 
                  "genresFacet" : { 
                    "buckets" : [
                      { "_id" : "Drama", "count" : { "$numberLong" : "12149" } }, 
                      { "_id" : "Comedy", "count" : { "$numberLong" : "6436" } }, 
                      { "_id" : "Romance", "count" : { "$numberLong" : "3274" } }, 
                      { "_id" : "Crime", "count" : { "$numberLong" : "2429" } }, 
                      { "_id" : "Thriller", "count" : { "$numberLong" : "2400" } },
                      { "_id" : "Action", "count" : { "$numberLong" : "2349" } }, 
                      { "_id" : "Adventure", "count" : { "$numberLong" : "1876" } }, 
                      { "_id" : "Documentary", "count" : { "$numberLong" : "1755" } }, 
                      { "_id" : "Horror", "count" : { "$numberLong" : "1432" } }, 
                      { "_id" : "Biography", "count" : { "$numberLong" : "1244" } }
                    ] 
                  }, 
                  "yearFacet" : { 
                    "buckets" : [
                      { "_id" : { "$numberInt" : "1910" }, "count" : { "$numberLong" : "14" } }, 
                      { "_id" : { "$numberInt" : "1920" }, "count" : { "$numberLong" : "47" } }, 
                      { "_id" : { "$numberInt" : "1930" }, "count" : { "$numberLong" : "238" } }
                    ] 
                  } 
                } 
              } 
            }