.. procedure:: 
   :style: normal 

   .. step:: Create a ``.java`` file and define the index in the file.

      .. literalinclude:: /includes/avs/index-management/create-index/create-index.java
         :language: java
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

      The following example index definitions:

      - Index the ``plot_embedding`` field as the ``vector`` type and the
        ``genres`` and ``year`` fields as the ``filter`` type in an {+avs+}
        index.
      - Specifies the ``plot_embedding`` field as the vector embeddings field,
        which contains embeddings created using OpenAI's
        ``text-embedding-ada-002`` embeddings model.
      - Specifies ``1536`` vector dimensions and measures similarity
        using ``dotProduct`` function. 

      .. tabs::

         .. tab:: Basic Example
            :tabid: basic

            This index definition indexes only the vector embeddings field (``plot_embedding``) for performing vector search.

            Copy and paste the following into the file you created, and replace the ``<connectionString>`` placeholder value.

            .. literalinclude:: /includes/avs/index-management/create-index/basic-example.java
               :language: java
               :copyable: true
               :linenos:

         .. tab:: Filter Example
            :tabid: advanced

            This index definition indexes the following fields:

            - A string field (``genres``) and a numeric field (``year``)
              for pre-filtering the data.
            - The vector embeddings field (``plot_embedding``) for
              performing vector search against pre-filtered data.

            Copy and paste the following into the file you created, and replace
            the ``<connectionString>`` placeholder value.

            .. literalinclude:: /includes/avs/index-management/create-index/filter-example.java
               :language: java
               :copyable: true
               :linenos:

   .. step:: Execute the code to create the index.

      From your IDE, run the file to create the index.
