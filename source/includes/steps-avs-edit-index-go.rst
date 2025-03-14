.. procedure:: 
   :style: normal 

   .. step:: Create the ``go`` file and define the index changes in the file. 

      .. literalinclude:: /includes/avs-examples/index-management/update-index/edit-index.go
         :language: go
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
           - Name of your index. If you omit the index name, defaults to ``vector_index``.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         go run <file-name>.go
