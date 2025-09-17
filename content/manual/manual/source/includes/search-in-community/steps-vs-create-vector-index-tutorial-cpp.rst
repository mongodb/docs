.. procedure::
   :style: normal

   .. step:: Install the MongoDB C++ Driver.

      For detailed installation instructions, refer
      to the `MongoDB C++ Driver documentation
      <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/installation/>`__.

   .. step:: Create a new directory for your project. 
      
      For example, run the following code block to create a ``query-quick-start`` folder.

      .. code-block:: bash

         mkdir query-quick-start

   .. step:: Create a ``CMakeLists`` file.

      Enter your project directory and create a  ``CMakeLists`` file. 

      The following example navigates to the ``query-quick-start`` directory and
      creates a ``CMakeLists.txt`` file. 

      .. code-block:: bash

         cd query-quick-start
         touch CMakeLists.txt
         
      This example uses the following configuration in the ``CMakeLists.txt`` file. 

      .. include:: /includes/search-in-community/cmakelists-txt.rst

   .. step:: Define your index.

      Create a file to define your vector search index. 
      
      This example uses a file named ``vector_index.cpp`` with the following
      index definition:

      .. literalinclude:: /includes/search-in-community/basic-example.cpp
         :language: cpp
         :copyable: true
         :caption: vector_index.cpp
         :emphasize-lines: 18
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Create and enter the ``/build`` directory:

      .. code-block:: bash

         mkdir build && cd build

   .. step:: Prepare the project.

      .. code-block:: bash

         cmake ../

   .. step:: Build the app.

      .. code-block:: bash

         cmake --build .

   .. step:: Execute the app to create the index.

      The following code block creates the index specified in ``vector_index.cpp``.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            ./query_quick_start

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: sh
            :linenos:

   .. step:: Construct your query.

      Create a file to hold your vector search query. 

      This example uses a file named ``vector_search_quick_start.cpp`` with the
      following sample query:

      .. literalinclude:: /includes/search-in-community/basic-query.cpp
         :language: cpp
         :caption: vector_search_quick_start.cpp
         :emphasize-lines: 16
         :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst
      
      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Compile and run your query.

      To run the query from this example: 

      a. Replace the ``vector_index.cpp`` file name in your ``CMakeLists.txt``
         file with your new ``vector_search_quick_start.cpp`` filename.

      #. Navigate to the ``/build`` directory, and prepare the project.

         .. code-block:: bash

            cmake ../

      #. Build the app.

         .. code-block:: bash

            cmake --build .

      #. Execute the app to run your query.
   
         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               ./query_quick_start

            .. output:: /includes/search-in-community/basic-query-nodejs-output.js
               :language: js
               :linenos:


