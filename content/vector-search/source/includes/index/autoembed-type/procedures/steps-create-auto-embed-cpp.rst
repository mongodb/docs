.. procedure::
   :style: normal

   .. step:: Create a ``CMakeLists.txt`` file in your project directory.

      Copy and paste the following lines into the ``CMakeLists.txt``
      file:

      .. code-block:: console

         cmake_minimum_required(VERSION 3.15)

         project(vector_index)

         set(CMAKE_CXX_STANDARD 17)

         find_package(mongocxx REQUIRED)

         add_executable(vector_index
           create-auto-embed-index.cpp
         )

         target_link_libraries(vector_index PRIVATE mongo::mongocxx_shared)

   .. step:: Create a ``create-auto-embed-index.cpp`` file and define the index in the file.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/cpp/create-auto-embed-index.cpp
         :language: cpp
         :copyable: true
         :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table::
         :widths: 25 75
         :stub-columns: 1

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want
             to create the index.

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Name of your index. If you omit the index name, defaults
             to ``vector_index``.

         * - ``<fieldToIndex>``
           - Field to index for automated embedding vector search.

         * - ``<embeddingModel>``
           - Name of the supported |voyage| embedding model to use for
             generating embeddings.

      For example, copy and paste the following into the
      ``create-auto-embed-index.cpp`` file and replace the
      ``<connectionString>`` placeholder value. The following index
      definition indexes the ``fullplot`` field as the ``autoEmbed``
      type and the ``genres`` and ``year`` fields as the ``filter``
      type in a {+avs+} index.

      .. tabs::

         .. tab:: Basic Example
            :tabid: basic

            The following index definition enables automated embedding
            vector search for the ``fullplot`` text field.

            .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/cpp/basic-auto-embed-example.cpp
               :language: cpp
               :copyable: true
               :linenos:
               :caption: create-auto-embed-index.cpp

         .. tab:: Filter Example
            :tabid: advanced

            This index definition indexes the following fields:

            - String field (``genres``) and numeric field (``year``)
              for pre-filtering the data
            - Text field (``fullplot``) for automated embedding
              vector search

            .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/cpp/filter-auto-embed-example.cpp
               :language: cpp
               :copyable: true
               :linenos:
               :caption: create-auto-embed-index.cpp

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         ./build/vector_index
