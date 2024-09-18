.. procedure:: 
   :style: normal

   .. step:: Add the MongoDB C++ Driver to your project.

      a. Install the C++ Driver. For detailed installation instructions, refer
         to the `MongoDB C++ Driver documentation
         <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/installation/>`__.

      #. Create a new directory called ``query-quick-start``.

         .. code-block:: bash

               mkdir query-quick-start
      
         Enter the directory, and create a ``CMakeLists.txt`` file.

         .. code-block:: bash

            cd query-quick-start
            touch CMakeLists.txt
      
         Copy and paste the following lines into the ``CMakeLists.txt`` file:

         .. include:: /includes/avs-examples/pipeline-stage-examples/cmakelists-txt.rst

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlas_vector_search_quick_start.cpp`` .

      #. Copy and paste the following sample query into the
         ``atlas_vector_search_quick_start.cpp`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.cpp
            :language: cpp
            :linenos:

      .. include:: /includes/fact-avs-quick-start-intro-II.rst
      
      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers.rst

   .. step:: Compile and run your query.

      a. Create and enter the ``/build`` directory:

         .. code-block:: bash

            mkdir build && cd build

      #. Prepare the project.

         .. code-block:: bash

            cmake ../

      #. Build the app.

         .. code-block:: bash

            cmake --build .

      #. Execute the app to run the query.
   
         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               ./query_quick_start

            .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-nodejs-output.js
               :language: js
               :linenos:
