.. procedure::
   :style: normal

   .. step:: Create a ``CMakeLists.txt`` file in your project directory.

      Copy and paste the following lines into the ``CMakeLists.txt``
      file:

      .. code-block:: console

         cmake_minimum_required(VERSION 3.30)

         project(delete_index)

         set(CMAKE_CXX_STANDARD 17)

         find_package(mongocxx REQUIRED)

         add_executable(delete_index
           delete-index.cpp
         )

         target_link_libraries(delete_index PRIVATE mongo::mongocxx_shared)

   .. step:: Create a ``delete-index.cpp`` file and specify the index to delete.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/delete-index/cpp/delete-index.cpp
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
             to delete the index.

         * - ``<collection-name>``
           - Collection for which you want to delete the index.

         * - ``<index-name>``
           - Name of the index you want to delete. If you omit the index
             name, defaults to ``vector_index``.

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Run the app to delete the index.

      .. code-block:: shell

         ./build/delete_index
