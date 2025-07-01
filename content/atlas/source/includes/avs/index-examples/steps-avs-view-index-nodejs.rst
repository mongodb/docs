.. procedure:: 
   :style: normal 

   .. step:: Create the ``.js`` file and use the ``listSearchIndexes()`` method to retrieve the index. 

      .. literalinclude:: /includes/avs/index-management/return-index/get-index.js  
         :language: javascript
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

         node <file-name>.js
