.. procedure:: 
   :style: normal 

   .. step:: Create a ``.java`` file and use the ``updateSearchIndex()`` method to add or remove ``filter`` type fields.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/update-index/EditAutoEmbedIndex.java
         :language: java
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to create the index.

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Name of your index. If you omit the index name, defaults to ``vector_index``.

         * - ``<indexedField>``
           - Name of the field indexed as the ``autoEmbed`` type. 

         * - ``<modelName>``
           - |voyage| embedding model to use to generate embeddings.

         * - ``<fieldToIndex>``
           - Name of the field to index.

   .. step:: Execute the code to update the index.

      From your IDE, run the file to update the index with your changes.
