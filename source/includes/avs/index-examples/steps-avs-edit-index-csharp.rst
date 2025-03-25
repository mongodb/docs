.. procedure:: 
   :style: normal 

   .. step:: Create the ``.cs`` file and define the index changes in the file.

      .. literalinclude:: /includes/avs/index-management/update-index/edit-index.cs
         :language: csharp
         :copyable: true 
         :linenos: 

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
           - Bame of your index. If you omit the index name, defaults to ``vector_index``.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

   .. step:: Initialize the class and call the method in ``Program.cs``.

      .. code-block:: csharp

         using query_quick_start;

         var indexService = new IndexService();
         indexService.EditVectorIndex();

   .. step:: Compile and run your project.

      .. code-block:: shell

         dotnet run
