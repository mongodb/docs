.. procedure::
   :style: normal

   .. step:: Create a ``CMakeLists.txt`` file in your project directory.

      Copy and paste the following lines into the ``CMakeLists.txt``
      file:

      .. code-block:: console

         cmake_minimum_required(VERSION 3.15)

         project(get_index)

         set(CMAKE_CXX_STANDARD 17)

         find_package(mongocxx REQUIRED)

         add_executable(get_index
           get-index.cpp
         )

         target_link_libraries(get_index PRIVATE mongo::mongocxx_shared)

   .. step:: Create a ``get-index.cpp`` file and use the ``list()`` method to retrieve the indexes for the collection.

      .. literalinclude:: /includes/index/vector-type/code-snippets/return-index/get-index.cpp
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
           - Name of the database that contains the collection.

         * - ``<collectionName>``
           - Name of the collection for which you want to retrieve the
             indexes.

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Run the following command to retrieve the index.

      .. code-block:: shell

         ./build/get_index
