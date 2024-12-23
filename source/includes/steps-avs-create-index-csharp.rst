.. procedure:: 
   :style: normal 

   .. step:: Create a ``.cs`` file and define the index in the file.

      .. tabs:: 

         .. tab:: 
            :tabid: Single Index

            .. literalinclude:: /includes/avs-examples/index-management/create-index/create-index.cs
               :language: csharp
               :copyable: true 
               :linenos: 

         .. tab:: 
            :tabid: Multiple Indexes

            .. literalinclude:: /includes/avs-examples/index-management/create-index/create-indexes.cs
               :language: csharp
               :copyable: true 
               :linenos: 

      .. example:: 

         Create a file named ``IndexService.cs``.

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - |service| connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to create the index.

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Name of your index. If you omit the index name, |fts| names the index ``vector_index``.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

      .. example:: 

         Copy and paste the following into the ``IndexService.cs`` and
         replace the ``<connectionString>`` placeholder value. The following index
         definition indexes the ``plot_embedding`` field as the
         ``vector`` type and the ``genres`` and ``year`` fields as the
         ``filter`` type in an {+avs+} index. The ``plot_embedding``
         field contains embeddings created using OpenAI's
         ``text-embedding-ada-002`` embeddings model. The index
         definition specifies ``1536`` vector dimensions and measures
         similarity using ``dotProduct`` function. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition indexes only the vector
               embeddings field (``plot_embedding``) for performing
               vector search.   

               .. literalinclude:: /includes/avs-examples/index-management/create-index/basic-example.cs
                  :language: csharp
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding``) for
                 performing vector search against pre-filtered data.

               .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example.cs
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
