.. procedure:: 
   :style: normal 

   .. step:: Create the ``.py`` file and define the index changes in the file.

      .. literalinclude:: /includes/avs/index-management/update-index/edit-auto-embed-index.py  
         :language: python
         :copyable: true 
         :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection.

         * - ``<collectionName>``
           - Name of the collection for which you want to update the index.

         * - ``<indexName>``
           - Name of your index that you want to update. 

         * - ``<modelName>``
           - Name of the embedding model to use to generate embeddings.

         * - ``<fieldToIndex>``
           - Name of field to index.

             .. note:: 

                You can add text fields to index as the ``autoEmbed`` type, but 
                you can't replace or delete existing ``autoEmbed`` type fields in 
                the index definition.

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         python <file-name>.py
