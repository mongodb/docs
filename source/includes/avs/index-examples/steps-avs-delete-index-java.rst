.. procedure:: 
   :style: normal 

   .. step:: Create the ``.java`` file and use the ``collection.dropSearchIndex()`` method to delete the index.

      .. literalinclude:: /includes/avs/index-management/delete-index/delete-index.java
         :language: java
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

   .. step:: Execute the code to delete the index.

      From your IDE, run the file to delete the specified index.
