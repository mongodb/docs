.. procedure:: 
   :style: normal 

   .. step:: Create a ``.java`` file and define the index in the file.

      .. literalinclude:: /includes/avs/index-management/create-index/AutoEmbedIndex.java
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

         * - ``<embeddingModel>``
           - |voyage| embedding model you want {+avs+} to use for automatically generating 
             embeddings.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

      The following example index definitions enable Automated Embedding for the 
      ``fullplot`` field in the ``sample_mflix.movies`` collection.

      .. tabs::

         .. tab:: Basic Example
            :tabid: basic

            This index definition indexes the ``fullplot`` field as the ``autoEmbed`` 
            type to enable Automated Embedding for that field. It specifies the ``voyage-4`` 
            embedding model as the model to use for generating embeddings for the 
            ``fullplot`` field. 

            Copy and paste the following into the file you created, and
            replace the ``<connection-string>`` placeholder value. 

            .. literalinclude:: /includes/avs/index-management/create-index/basic-auto-embed-example.java
               :language: java
               :copyable: true
               :linenos:

         .. tab:: Filter Example
            :tabid: advanced

            This index definition indexes the following fields:

            - A string field (``genres``) and a numeric field (``year``)
              for pre-filtering the data.
            - The ``fullplot`` field as the ``autoEmbed`` type to enable Automated 
              Embedding for that field using the ``voyage-4`` embedding model.

            Copy and paste the following into the file you created, and replace
            the ``<connection-string>`` placeholder value.

            .. literalinclude:: /includes/avs/index-management/create-index/filter-auto-embed-example.java
               :language: java
               :copyable: true
               :linenos:

   .. step:: Execute the code to create the index.

      From your IDE, run the file to create the index.
