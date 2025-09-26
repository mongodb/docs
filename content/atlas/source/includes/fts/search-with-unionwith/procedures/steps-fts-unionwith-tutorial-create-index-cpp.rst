Create the |fts| Index
~~~~~~~~~~~~~~~~~~~~~~

In this section, you will create a |fts| index named ``default`` on 
all the fields in the ``companies`` collection in the 
``sample_training`` database. You will create another |fts| index 
named ``default`` on all the fields in the ``inspections`` 
collection in the ``sample_training`` database.

.. procedure::
   :style: normal

   .. step:: Set up the C++ project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``search-with-unionwith`` for this project: 

      .. code-block:: shell
         :copyable: true

         mkdir search-with-unionwith
         cd search-with-unionwith

      For more detailed installation instructions, see the
      `MongoDB C++ Driver documentation <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/get-started/>`__.

   .. step:: Define the index.

      Create a ``CreateIndexes.cpp`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/search-with-unionwith/create-index-example.cpp
         :caption: CreateIndexes.cpp
         :language: cpp
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            c++ --std=c++17 CreateIndexes.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

         .. output::
            :visible: false

            New index name for companies: default
            New index name for inspections: default
      
      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl,-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh
         
            c++ --std=c++17 CreateIndexes.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out
