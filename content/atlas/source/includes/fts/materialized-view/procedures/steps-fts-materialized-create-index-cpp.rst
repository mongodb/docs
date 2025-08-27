.. procedure::
   :style: normal

   .. step:: Define the index.

      Create a ``CreateIndex.cpp`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/materialized-view/create-index-example.cpp
         :caption: CreateIndex.cpp
         :language: cpp
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            c++ --std=c++17 CreateIndex.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

         .. output::
            :visible: false

            New index name: monthlySalesIndex
      
      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl,-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh
         
            c++ --std=c++17 CreateIndex.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out
