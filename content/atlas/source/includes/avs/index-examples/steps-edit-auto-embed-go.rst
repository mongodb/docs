.. procedure:: 
   :style: normal 

   .. step:: Create a file called ``edit-index.go`` and define the index changes in the file. 

      .. literalinclude:: /includes/avs/index-management/update-index/edit-auto-embed-index.go
         :language: go
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connection-string>``
           - Cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<database-name>``
           - Database that contains the collection for which you want to create the index.

         * - ``<collection-name>``
           - Collection for which you want to create the index.

         * - ``<index-name>``
           - Name of your index. If you omit the index name, defaults to ``vector_index``.

         * - ``<embedding-model>``
           - Name of the |voyage| embedding model to use for generating embeddings.

         * - ``<field-to-index>``
           - Vector and filter fields to index.

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         go run edit-index.go
