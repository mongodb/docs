.. procedure:: 
   :style: normal 

   .. step:: Create the ``.js`` file and define the index changes in the file. 

      .. literalinclude:: /includes/avs/index-management/update-index/edit-auto-embed-index.js  
         :language: javascript
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to
             create the index. 

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Name of your index. If you omit the index name, defaults to
             ``vector_index``. 

         * - ``<fieldToIndex>``
           - Text and filter fields to index. 

             .. note:: 

                You can add text fields to index as the ``autoEmbed`` type, but 
                you can't replace or delete existing ``autoEmbed`` type fields in 
                the index definition. 

         * - ``<modelName>``
           - Name of the embedding model to use to generate the
             embeddings.  

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         node <file-name>.js
