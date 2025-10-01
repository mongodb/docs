.. procedure::
   :style: normal

   .. step:: Run simple |fts| queries on the ``movies`` collection.

      These code examples perform the following tasks:

      - Imports ``mongodb`` packages and dependencies.
      - Establishes a connection to your cluster.
      - Iterates over the cursor to print the documents that match the 
        query.

      |fts| query results vary based on the type of word mapping defined in 
      the synonyms source collection. 

      .. tabs:: 

         .. tab:: equivalent Mapping Type
            :tabid: equivalent

            a. Create a file named ``SynonymsEquivalentQuery.cpp``. 
            #. Copy and paste the code example into the 
               ``SynonymsEquivalentQuery.cpp`` file.

               The code example contains the following stages:
               
               - :pipeline:`$search` stage to search the ``title`` field 
                 for the word ``automobile`` and uses the synonym mapping 
                 definition named ``transportSynonyms`` to search for words 
                 configured as synonyms of the query word ``automobile`` in 
                 the synonyms source collection named 
                 ``transport_synonyms``. 
               - :pipeline:`$limit` stage to limit the output to 10 
                 results. 
               - :pipeline:`$project` stage to exclude all fields except 
                 ``title`` and add a field named ``score``.

               .. literalinclude:: /includes/fts/tutorials/synonyms/SynonymsEquivalentQuery.cpp
                  :language: cpp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 17

            #. .. include:: /includes/search-shared/find-connection-string.rst

            #. Run the query.    

               In your terminal, run the following commands to build and run this 
               application:  
               
               .. io-code-block::
                  :copyable: true

                  .. input::
                     :language: shell

                     c++ --std=c++17 SynonymsEquivalentQuery.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
                     ./app.out

                  .. output::
                     :visible: true

                     [{title Cars} {score 4.197734832763672}]
                     [{title Planes, Trains & Automobiles} {score 3.8511905670166016}]
                     [{title Car Wash} {score 3.39473032951355}]
                     [{title Used Cars} {score 3.39473032951355}]
                     [{title Blue Car} {score 3.39473032951355}]
                     [{title Cars 2} {score 3.39473032951355}]
                     [{title Stealing Cars} {score 3.39473032951355}]
                     [{title Cop Car} {score 3.39473032951355}]
                     [{title The Cars That Eat People} {score 2.8496146202087402}]
                     [{title Khrustalyov, My Car!} {score 2.8496146202087402}]

               .. include:: /includes/fts/extracts/fts-synonyms-tutorial-equivalent-query-output.rst

         .. tab:: explicit Mapping Type
            :tabid: explicit

            a. Create a file named ``SynonymsExplicitQuery.cpp``. 
            #. Copy and paste the code example into the 
               ``SynonymsExplicitQuery.cpp`` file.

               The code example contains the following stages:
               
               - :pipeline:`$search` stage to search the ``title`` field 
                 for the word ``boat`` and uses the synonym mapping 
                 definition named ``transportSynonyms`` to search for words 
                 configured as synonyms of the query word ``boat`` in the 
                 synonyms source collection named ``transport_synonyms``. 
               - :pipeline:`$limit` stage to limit the output to 10 
                 results. 
               - :pipeline:`$project` stage to exclude all fields except 
                 ``title`` and add a field named ``score``.

               .. literalinclude:: /includes/fts/tutorials/synonyms/SynonymsExplicitQuery.cpp
                  :language: cpp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 17

            #. .. include:: /includes/search-shared/find-connection-string.rst

            #. Run the query.    

               In your terminal, run the following commands to build and run this 
               application:  
               
               .. io-code-block::
                  :copyable: true

                  .. input::
                     :language: shell

                     c++ --std=c++17 SynonymsExplicitQuery.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
                     ./app.out

                  .. output::
                     :visible: true

                     [{title Vessel} {score 5.373150825500488}]
                     [{title Boats} {score 4.589139938354492}]
                     [{title And the Ship Sails On} {score 4.3452959060668945}]
                     [{title Broken Vessels} {score 4.3452959060668945}]
                     [{title Sailing to Paradise} {score 4.3452959060668945}]
                     [{title Boat People} {score 3.711261749267578}]
                     [{title Boat Trip} {score 3.711261749267578}]
                     [{title Three Men in a Boat} {score 3.1153182983398438}]
                     [{title The Glass Bottom Boat} {score 3.1153182983398438}]
                     [{title Jack Goes Boating} {score 3.1153182983398438}]

               .. include:: /includes/fts/extracts/fts-synonyms-tutorial-explicit-query-output.rst

      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl``,``-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh
         
            c++ --std=c++17 SynonymsEquivalentQuery.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

   .. step:: Run advanced |fts| queries if you created the index that contains multiple synonym mappings.

      These code examples perform the following tasks:

      - Imports ``mongodb`` packages and dependencies.
      - Establishes a connection to your cluster.
      - Iterates over the cursor to print the documents that match the 
        query.

      |fts| query results vary based on the type of word mapping defined in 
      the synonyms source collection. 

      .. tabs:: 

         .. tab:: equivalent Mapping Type
            :tabid: equivalent

            a. Create a file named ``SynonymsEquivalentQuery.cpp``. 
            #. Copy and paste the code example into the 
               ``SynonymsEquivalentQuery.cpp`` file.

               The code example contains the following stages:
               
               - :pipeline:`$search` stage to search the ``title`` field 
                 for the word ``automobile`` and uses the synonym mapping 
                 definition named ``transportSynonyms`` to search for words 
                 configured as synonyms of the query word ``automobile`` in 
                 the synonyms source collection named 
                 ``transport_synonyms``. The query searches the ``title`` 
                 field for the word ``attire`` also and  uses the synonym 
                 mapping definition named ``attireSynonyms`` to search for 
                 words configured as synonyms of the query word ``attire`` 
                 in the synonyms source collection named 
                 ``attire_synonyms``. 
               - :pipeline:`$limit` stage to limit the output to 10 
                 results. 
               - :pipeline:`$project` stage to exclude all fields except 
                 ``title`` and add a field named ``score``.

               .. literalinclude:: /includes/fts/tutorials/synonyms/EquivalentAdvancedQuery.cpp
                  :language: cpp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 19

            #. .. include:: /includes/search-shared/find-connection-string.rst
              
            #. Run the query.

               In your terminal, run the following commands to build and run this 
               application:  
               
               .. io-code-block::
                  :copyable: true

                  .. input::
                     :language: shell

                     c++ --std=c++17 SynonymsEquivalentQuery.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
                     ./app.out

                  .. output::
                     :visible: true

                     [{title The Dress} {score 4.812004089355469}]
                     [{title Cars} {score 4.197734832763672}]
                     [{title Dressed to Kill} {score 3.891493320465088}]
                     [{title 27 Dresses} {score 3.891493320465088}]
                     [{title Planes, Trains & Automobiles} {score 3.8511905670166016}]
                     [{title Car Wash} {score 3.39473032951355}]
                     [{title Used Cars} {score 3.39473032951355}]
                     [{title Blue Car} {score 3.39473032951355}]
                     [{title Cars 2} {score 3.39473032951355}]
                     [{title Stealing Cars} {score 3.39473032951355}]

               .. include:: /includes/fts/extracts/fts-synonyms-tutorial-equivalent-advanced-query-output.rst

         .. tab:: explicit Mapping Type
            :tabid: explicit

            a. Create a file named ``SynonymsExplicitQuery.cpp``. 
            #. Copy and paste the code example into the 
               ``SynonymsExplicitQuery.cpp`` file.

               The code example contains the following stages:
               
               - :pipeline:`$search` stage to search the ``title`` field 
                 for the word ``boat`` and uses the synonym mapping 
                 definition named ``transportSynonyms`` to search for words 
                 configured as synonyms of the query word ``boat`` in the 
                 synonyms source collection named ``transport_synonyms``. 
                 The query searches the ``title`` field for the word 
                 ``hat`` also and uses the synonym mapping definition named 
                 ``attireSynonyms`` to search for words configured as 
                 synonyms of the query word ``hat`` in the synonyms source 
                 collection named ``attire_synonyms``.
               - :pipeline:`$limit` stage to limit the output to 10 
                 results. 
               - :pipeline:`$project` stage to exclude all fields except 
                 ``title`` and add a field named ``score``.

               .. literalinclude:: /includes/fts/tutorials/synonyms/ExplicitAdvancedQuery.cpp
                  :language: cpp
                  :linenos:
                  :dedent:
                  :emphasize-lines: 20

            #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

            #. Run the query.

               In your terminal, run the following commands to build and run this 
               application:  
               
               .. io-code-block::
                  :copyable: true

                  .. input::
                     :language: shell

                     c++ --std=c++17 SynonymsExplicitQuery.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
                     ./app.out

                  .. output::
                     :visible: true

                     [{title Fedora} {score 5.673145294189453}]
                     [{title Vessel} {score 5.373150825500488}]
                     [{title Boats} {score 4.589139938354492}]
                     [{title And the Ship Sails On} {score 4.3452959060668945}]
                     [{title Broken Vessels} {score 4.3452959060668945}]
                     [{title Sailing to Paradise} {score 4.3452959060668945}]
                     [{title Top Hat} {score 4.066137313842773}]
                     [{title A Hatful of Rain} {score 4.066137313842773}]
                     [{title Boat People} {score 3.711261749267578}]
                     [{title Boat Trip} {score 3.711261749267578}]

               .. include:: /includes/fts/extracts/fts-synonyms-tutorial-explicit-advanced-query-output.rst

      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl``,``-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh

            c++ --std=c++17 SynonymsExplicitQuery.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out