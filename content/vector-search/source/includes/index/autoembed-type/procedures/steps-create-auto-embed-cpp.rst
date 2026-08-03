.. procedure::
   :style: normal

   .. step:: Create a ``CMakeLists.txt`` file in your project directory.

      Copy and paste the following lines into the ``CMakeLists.txt``
      file:

      .. code-block:: console

         cmake_minimum_required(VERSION 3.30)

         project(vector_index)

         set(CMAKE_CXX_STANDARD 17)

         find_package(mongocxx REQUIRED)
         find_package(bsoncxx REQUIRED)

         add_executable(vector_index
           vector_index.cpp
         )

         target_link_libraries(vector_index PRIVATE mongo::mongocxx_shared)
         target_link_libraries(vector_index PRIVATE mongo::bsoncxx_shared)

   .. step:: Create a ``vector_index.cpp`` file and define the index in the file.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/cpp/create-auto-embed-index.cpp
         :language: cpp
         :copyable: true
         :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table::
         :stub-columns: 1

         * - ``<connection-string>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<database-name>``
           - Database that contains the collection for which you want
             to create the index.

         * - ``<collection-name>``
           - Collection for which you want to create the index.

         * - ``<index-name>``
           - Name of your index. If you omit the index name, defaults
             to ``vector_index``.

         * - ``<field-to-index>``
           - Field to index for automated embedding vector search.

         * - ``<embedding-model>``
           - Name of the supported |voyage| embedding model to use for
             generating embeddings.

      For example, copy and paste the following into the
      ``vector_index.cpp`` file and replace the
      ``<connection-string>`` placeholder value. The following index
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
               :caption: vector_index.cpp

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
               :caption: vector_index.cpp

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Execute the app to create the index.

      .. code-block:: shell

         ./vector_index
