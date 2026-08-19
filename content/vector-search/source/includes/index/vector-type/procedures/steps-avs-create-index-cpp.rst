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
           create-index.cpp
         )

         target_link_libraries(vector_index PRIVATE mongo::mongocxx_shared)

   .. step:: Create a ``create-index.cpp`` file and define the index in the file.

      .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/cpp/create-index.cpp
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

      To try {+avs+} with sample data, you can create a sample index
      based on the ``sample_mflix`` sample database. To do so, use one of
      the following index definitions. You only need to enter a valid
      ``<connectionString>`` value to run the sample index in your
      implementation. The following index definition indexes the
      ``plot_embedding_voyage_3_large`` field as the ``vector`` type and
      the ``genres`` and ``year`` fields as the ``filter`` type in a
      {+avs+} index. The ``plot_embedding_voyage_3_large`` field
      contains embeddings created using |voyage|'s ``voyage-3-large``
      embedding model. The index definition specifies ``2048`` vector
      dimensions, measures similarity using the ``dotProduct``
      function, and applies ``scalar`` quantization.

      .. tabs::

         .. tab:: Basic Example
            :tabid: basic

            The following index definition indexes only the vector
            embeddings field (``plot_embedding_voyage_3_large``) for
            performing vector search.

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/cpp/basic-example.cpp
               :language: cpp
               :copyable: true
               :linenos:
               :caption: create-index.cpp

         .. tab:: Filter Example
            :tabid: advanced

            This index definition indexes the following fields:

            - String field (``genres``) and numeric field (``year``)
              for pre-filtering the data.
            - Vector embeddings field
              (``plot_embedding_voyage_3_large``) for performing vector
              search against pre-filtered data.

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/cpp/filter-example.cpp
               :language: cpp
               :copyable: true
               :linenos:
               :caption: create-index.cpp

   .. step:: Prepare and build your project.

      .. code-block:: shell

         cmake -B build
         cmake --build build

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         ./build/vector_index
