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

         add_executable(vector_index
           edit-auto-embed-index.cpp
         )

         target_link_libraries(vector_index PRIVATE mongo::mongocxx_shared)

   .. step:: Create an ``edit-auto-embed-index.cpp`` file and define the index changes in the file.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/update-index/cpp/edit-auto-embed-index.cpp
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
             to edit the index.

         * - ``<collection-name>``
           - Collection for which you want to edit the index.

         * - ``<index-name>``
           - Name of your index. If you omit the index name, defaults
             to ``vector_index``.

         * - ``<indexed-field>``
           - Name of the text field to index as the ``autoEmbed``
             type. {+avs+} automatically generates vector embeddings
             for this field by using the specified |voyage| model.

         * - ``<embedding-model>``
           - Name of the supported |voyage| embedding model to use for
             generating embeddings. You can specify
             ``voyage-4-lite``, ``voyage-4``, ``voyage-4-large``, or
             ``voyage-code-3``. To learn more, see
             :ref:`avs-auto-embeddings-model-ecosystem`.

         * - ``<field-to-index>``
           - Field to index as the ``filter`` type for pre-filtering
             your data. Filtering narrows the scope of your semantic
             search, such as in a multi-tenant environment. You can
             filter on {+avs-filter-types+}.

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Run the app to edit the index.

      .. code-block:: shell

         ./build/vector_index
