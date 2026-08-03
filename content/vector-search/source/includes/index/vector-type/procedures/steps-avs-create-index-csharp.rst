.. procedure:: 
   :style: normal 

   .. step:: Create a ``.cs`` file and define the index in the file.

      .. tabs:: 

         .. tab:: 
            :tabid: Single Index

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/csharp/create-index.cs
               :language: csharp
               :copyable: true 
               :linenos: 

         .. tab:: 
            :tabid: Multiple Indexes

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/csharp/create-indexes.cs
               :language: csharp
               :copyable: true 
               :linenos: 

      .. example:: 

         Create a file named ``IndexService.cs``.

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

         * - ``<documentType>``
           - Class that represents a document in the collection. To learn more,
             see :driver:`POCOs </csharp/current/serialization/poco/>` in the .NET/C# driver
             documentation.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index. For this parameter, you can pass either
             a ``FieldDefinition<TDocument>`` object or a lambda expression.
         
         * - ``<vectorSimilarity>``
           - Vector similarity function, defined in the ``VectorSimilarity`` enum.
         
         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

      For example, copy and paste the following example index definition 
      into the ``IndexService.cs`` and replace the ``<connectionString>`` 
      placeholder value. 

      .. collapsible:: 
         :heading: Basic Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-basic-eg.rst

         .. literalinclude:: /includes/quick-start/code-snippets/vector/csharp/basic-example.cs
            :language: csharp
            :copyable: true 
            :linenos:

      .. collapsible:: 
         :heading: Filter Example 
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-filter-eg.rst

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/csharp/filter-example.cs
            :language: csharp
            :copyable: true 
            :linenos:

      .. collapsible:: 
         :heading: Multiple Vector Fields Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-multiple-fields-eg.rst

         .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/csharp/multi-vector-example.cs
            :language: csharp
            :copyable: true 
            :linenos:

   .. step:: Initialize the class and call the method in ``Program.cs``.

      .. code-block:: csharp

         using query_quick_start;

         var indexService = new IndexService();
         indexService.CreateVectorIndex();

   .. step:: Compile and run your project to create the index.

      .. code-block:: shell

         dotnet run
