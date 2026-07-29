.. procedure:: 
   :style: normal 

   .. step:: Create a file called ``create-index.go`` and define the index in the file.

      .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/go/create-index.go
         :language: go
         :copyable: true 
         :linenos:

      .. note:: Programmatic Index Creation
      
         The MongoDB Go driver supports programmatic {+avs+} index management starting
         in v1.16.0, but the preceding code shows the syntax for the v2.x driver.

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to create the index.

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Name of your index. If you omit the index name, defaults to ``vector_index``.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

      For example, copy and paste the following into the ``create-index.go`` file
      and replace the ``<connectionString>`` placeholder value. 

      .. collapsible:: 
         :heading: Basic Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-basic-eg.rst

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/go/basic-example.go
            :language: go
            :copyable: true
            :emphasize-lines: 47-57
            :linenos:

      .. collapsible:: 
         :heading: Filter Example 
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-filter-eg.rst

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/go/filter-example.go
            :language: go
            :copyable: true
            :emphasize-lines: 50-57
            :linenos:

      .. collapsible:: 
         :heading: Multiple Vector Fields Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-multiple-fields-eg.rst

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/go/multi-vector-example.go
            :language: go
            :copyable: true
            :emphasize-lines: 49-62
            :linenos:

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         go run create-index.go
