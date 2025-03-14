.. procedure:: 
   :style: normal 

   .. step:: Create the ``.js`` file and use the ``dropSearchIndex()`` method to delete the index. 

      .. literalinclude:: /includes/avs-examples/index-management/delete-index/delete-index.js  
         :language: javascript
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - The database that contains the collection for which you want to create the index.

         * - ``<collectionName>``
           - The collection for which you want to create the index.

         * - ``<indexName>``
           - The name of your index. If you omit the index name, defaults to ``vector_index``.

   .. step:: Run the following command to delete the index.

      .. code-block:: shell

         node <file-name>.js
