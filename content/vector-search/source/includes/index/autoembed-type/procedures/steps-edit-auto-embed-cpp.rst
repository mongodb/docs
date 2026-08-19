.. procedure::
   :style: normal

   .. step:: Create a ``CMakeLists.txt`` file in your project directory.

      Copy and paste the following lines into the ``CMakeLists.txt``
      file:

      .. code-block:: console

         cmake_minimum_required(VERSION 3.15)

         project(edit_index)

         set(CMAKE_CXX_STANDARD 17)

         find_package(mongocxx REQUIRED)

         add_executable(edit_index
           edit-auto-embed-index.cpp
         )

         target_link_libraries(edit_index PRIVATE mongo::mongocxx_shared)

   .. step:: Create an ``edit-auto-embed-index.cpp`` file and define the index changes in the file.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/update-index/cpp/edit-auto-embed-index.cpp
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
             to edit the index.

         * - ``<collectionName>``
           - Collection for which you want to edit the index.

         * - ``<indexName>``
           - Name of your index. If you omit the index name, defaults
             to ``vector_index``.

         * - ``<indexedField>``
           - Name of the text field to index as the ``autoEmbed``
             type. {+avs+} automatically generates vector embeddings
             for this field by using the specified |voyage| model.

         * - ``<embeddingModel>``
           - Name of the supported |voyage| embedding model to use for
             generating embeddings. You can specify
             ``voyage-4-lite``, ``voyage-4``, ``voyage-4-large``, or
             ``voyage-code-3``. To learn more, see
             :ref:`avs-auto-embeddings-model-ecosystem`.

         * - ``<fieldToIndex>``
           - Field to index as the ``filter`` type for pre-filtering
             your data. Filtering narrows the scope of your semantic
             search, such as in a multi-tenant environment. You can
             filter on {+avs-filter-types+}.

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         ./build/edit_index
