.. procedure:: 
   :style: normal 

   .. step:: Create a ``.cs`` file and use the ``.List()`` method to retrieve the indexes for the collection.

      .. literalinclude:: /includes/avs-examples/index-management/return-index/get-index.cs
         :language: csharp
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - The name of the database that contains the collection.

         * - ``<collectionName>``
           - The name of the collection.

   .. step:: Initialize the class and call the method in ``Program.cs``.

      .. code-block:: csharp

         using query_quick_start;

         var indexService = new IndexService();
         indexService.ViewSearchIndexes();

   .. step:: Compile and run your project.

      .. code-block:: shell

         dotnet run
