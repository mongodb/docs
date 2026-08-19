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
           edit-index.cpp
         )

         target_link_libraries(edit_index PRIVATE mongo::mongocxx_shared)

   .. step:: Create an ``edit-index.cpp`` file and define the index changes in the file.

      .. literalinclude:: /includes/index/vector-type/code-snippets/update-index/edit-index.cpp
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
           - Name of the index you want to edit. If you omit the index
             name, defaults to ``vector_index``.

         * - ``<fieldToIndex>``
           - Field that contains your vector embeddings.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at
             index-time and query-time. This value must match the
             number of dimensions in your embeddings.

         * - ``<similarity>``
           - Vector similarity function to use when searching. You can
             specify ``euclidean``, ``cosine``, or ``dotProduct``.

         * - ``<quantization>``
           - Automatic quantization to use for vectors before indexing,
             which reduces resource consumption. You can specify
             ``none``, ``scalar``, or ``binary``. Use ``scalar`` to
             reduce memory while retaining accuracy, ``binary`` for the
             largest memory savings with the highest impact on accuracy,
             or ``none`` to disable quantization. To learn how to choose
             a quantization method, see :ref:`mdb_vs-quantization`.

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         ./build/edit_index
