.. procedure::
   :style: normal

   .. step:: Install the MongoDB C++ Driver.

      For detailed installation instructions, refer
      to the `MongoDB C++ Driver documentation
      <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/installation/>`__.

   .. step:: Create a new directory called ``query-quick-start``.

      .. code-block:: bash

         mkdir query-quick-start

   .. step:: Enter the directory, and create a ``CMakeLists.txt`` file.

      .. code-block:: bash

         cd query-quick-start
         touch CMakeLists.txt

      Copy and paste the following lines into the ``CMakeLists.txt`` file:

      .. include:: /includes/pipeline-stage/vectorSearch/code-snippets/c/cmakelists-txt.rst

   .. step:: Define the index.

      Create a file named ``vector_index.cpp``. Copy and paste the following
      code into the file.

      .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/cpp/auto-embed-create-index.cpp
         :language: cpp
         :copyable: true
         :caption: vector_index.cpp
         :emphasize-lines: 18
         :linenos:

      For details on all the {+avs+} index settings for Automated
      Embedding, see :ref:`avs-types-vector-search-options`.

      This code also includes a polling mechanism to check if the index
      is ready to use.

   .. step:: Replace the ``<connection-string>``.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Prepare the project.

      .. code-block:: bash

         cmake -B build

   .. step:: Build the app.

      .. code-block:: bash

         cmake --build build

   .. step:: Execute the app to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            ./query_quick_start

         .. output:: /includes/quick-start/code-snippets/output/autoembed-cpp-create-index-output.sh
            :language: sh
            :linenos:
