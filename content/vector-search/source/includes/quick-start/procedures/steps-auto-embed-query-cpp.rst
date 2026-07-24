.. procedure::
   :style: normal

   .. step:: Construct your vector search query.

      a. Create a file named ``atlas_vector_search_quick_start.cpp``.

      #. Copy and paste the following sample query into the
         ``atlas_vector_search_quick_start.cpp`` file:

         .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/cpp/auto-embed-query.cpp
            :language: cpp
            :copyable: true
            :caption: atlas_vector_search_quick_start.cpp
            :emphasize-lines: 17
            :linenos:

      .. include:: /includes/quick-start/facts/fact-avs-auto-embed-quick-start-query-intro.rst

   .. step:: Replace the ``<connection-string>``.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Compile and run your query.

      a. Replace the ``vector_index.cpp`` file name in your
         ``CMakeLists.txt`` file with your new
         ``atlas_vector_search_quick_start.cpp`` filename.

      #. Prepare the project.

         .. code-block:: bash

            cmake -B build

      #. Build the app.

         .. code-block:: bash

            cmake --build build

      #. Execute the app to run the query.

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               ./query_quick_start

            .. output:: /includes/quick-start/code-snippets/output/autoembed-cpp-query-output.js
               :language: json
               :linenos:
