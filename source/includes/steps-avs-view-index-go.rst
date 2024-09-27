.. procedure:: 
   :style: normal 

   .. step:: Create the ``.go`` file and use the ``SearchIndexes().List()`` method to retrieve the index. 

      .. literalinclude:: /includes/avs-examples/index-management/return-index/get-index.go
         :language: go
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - The database that contains the collection.

         * - ``<collectionName>``
           - The collection for which you want to retrieve the indexes.

         * - ``<indexName>``
           - The name of your index if you want to retrieve a specific
             index. To return all indexes on the collection, omit this
             value.

   .. step:: Run the following command to retrieve the index.

      .. code-block:: shell

         go run <file-name>.go
