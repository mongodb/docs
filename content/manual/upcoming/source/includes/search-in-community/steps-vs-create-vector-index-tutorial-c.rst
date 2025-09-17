.. procedure::
   :style: normal

   .. step:: Install the MongoDB C Driver.

      For detailed installation instructions, refer
      to the `MongoDB C Driver documentation
      <https://www.mongodb.com/docs/languages/c/c-driver/current/libmongoc/tutorials/obtaining-libraries/>`__.

   .. step:: Create a new directory for your project. 
      
      This example uses a directory called ``query-quick-start``. Run the 
      following code to create a ``query-quick-start`` directory.

      .. code-block:: bash

         mkdir query-quick-start

   .. step:: Create a ``CMakeLists`` file.

      Enter your project directory and create a  ``CMakeLists`` file. 

      The following code navigates to the ``query-quick-start`` directory and
      creates a ``CMakeLists.txt`` file. 

      .. code-block:: bash

         cd query-quick-start
         touch CMakeLists.txt
         
      This example uses the following configuration in ``CMakeLists.txt``.

      .. include:: /includes/search-in-community/cmakelists-txt-c.rst

   .. step:: Define your index in a new file.
      
      This example uses a file named ``vector_index.c`` with the following
      code:

      .. literalinclude:: /includes/search-in-community/basic-example.c
         :language: c
         :copyable: true
         :caption: vector_index.c
         :emphasize-lines: 16
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

      The following codeblock creates the vector search index specified in ``vector_index.c``.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            ./vector-search-quick-start

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: sh
            :linenos:

   .. step:: Define your query in a new file.

      This example uses a file named ``vector-search-quick-start.c`` with the following sample query:

      .. literalinclude:: /includes/search-in-community/basic-query.c
         :language: c
         :caption: vector-search-quick-start.c
         :emphasize-lines: 24
         :linenos: 

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Update CMake for your project.

      Update your ``CMake`` file to use your query file.

      For example: 

      a. Replace the ``vector_index.c`` file name in your ``CMakeLists.txt``
         file with your new ``vector-search-quick-start.c`` filename.

      #. Navigate to the ``/build`` directory, and prepare the project.

         .. code-block:: bash

            cd build
            cmake ../

   .. step:: Run your query.
      
      From your ``build`` directory, compile and run your query. 
      
      The following code block compiles and runs the ``vector-search-quick-start.c`` file.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake --build . 
            ./vector-search-quick-start

         .. output:: /includes/search-in-community/basic-query-c-output.js
            :language: js
            :linenos: