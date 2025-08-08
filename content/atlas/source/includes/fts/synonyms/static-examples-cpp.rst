Use Static Mappings
-------------------

.. include:: /includes/fts/synonyms/static-intro.rst

.. procedure::
   :style: normal

   .. step:: Set up your application

      To learn how to install the driver and configure your C++ application, see the
      `Get Started <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/get-started/>`__
      tutorial in the MongoDB C++ Driver documentation.

   .. step:: Define the index.

      Create a ``CreateStaticIndex.cpp`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/synonyms/CreateStaticIndex.cpp
         :caption: CreateStaticIndex.cpp
         :language: cpp
         :linenos:
         :copyable:

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            c++ --std=c++17 CreateStaticIndex.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

         .. output::
            :visible: false

            New index name: default