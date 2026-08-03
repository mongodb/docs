.. procedure:: 
   :style: normal 

   .. step:: Create a ``.java`` file and define the index in the file.

      .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/java/create-index.java
         :language: java
         :copyable: true 
         :linenos: 

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

      The following example index definitions index the vector and filter 
      fields in the sample data.

      .. collapsible:: 
         :heading: Basic Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-basic-eg.rst

         Copy and paste the following into the file you created, and
         replace the ``<connectionString>`` placeholder value. 

         .. literalinclude:: /includes/quick-start/code-snippets/vector/java/basic-example.java
            :language: java
            :copyable: true
            :linenos:

      .. collapsible:: 
         :heading: Filter Example
         :expanded: false

         This index definition indexes the following fields:

         - A string field (``genres``) and a numeric field (``year``)
           for pre-filtering the data.
         - The vector embeddings field (``plot_embedding_voyage_3_large``) 
           using the default indexing method, |hnsw|, for performing vector 
           search against pre-filtered data.

         Copy and paste the following into the file you created, and replace
         the ``<connectionString>`` placeholder value.

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/java/filter-example.java
            :language: java
            :copyable: true
            :linenos:

      .. collapsible:: 
         :heading: Stored Source Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/stored-source-example.rst

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/java/stored-source-example.java
            :language: java
            :copyable: true
            :linenos:

      .. collapsible:: 
         :heading: Multiple Vector Fields Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-multiple-fields-eg.rst

         Copy and paste the following into the file you created, and replace
         the ``<connectionString>`` placeholder value.

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/java/multi-vector-example.java
            :language: java
            :copyable: true
            :linenos:

   .. step:: Execute the code to create the index.

      From your IDE, run the file to create the index.
