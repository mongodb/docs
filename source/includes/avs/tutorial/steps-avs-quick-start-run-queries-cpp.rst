.. procedure:: 
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlas_vector_search_quick_start.cpp`` .

      #. Copy and paste the following sample query into the
         ``atlas_vector_search_quick_start.cpp`` file:

         .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query.cpp
            :language: cpp
            :caption: atlas_vector_search_quick_start.cpp
            :emphasize-lines: 16
            :linenos:

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst
      
      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Compile and run your query.

      a. Replace the ``vector_index.cpp`` file name in your ``CMakeLists.txt``
         file with your new ``atlas_vector_search_quick_start.cpp`` filename.

      #. Navigate to the ``/build`` directory, and prepare the project.

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

            .. output:: /includes/avs/pipeline-stage-examples/basic-query-nodejs-output.js
               :language: js
               :linenos:
