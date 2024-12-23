.. procedure:: 
   :style: normal 

   .. step:: Create the ``.cs`` file and use the ``DropOne()`` method to delete the index.

      .. literalinclude:: /includes/avs-examples/index-management/delete-index/delete-index.cs
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

         * - ``<indexName>``
           - The name of the index to delete.

   .. step:: Initialize the class and call the method in ``Program.cs``.

      .. code-block:: csharp

         using query_quick_start;

         var indexService = new IndexService();
         indexService.DeleteVectorIndex();

   .. step:: Compile and run your project to delete the index.

      .. code-block:: shell

         dotnet run
