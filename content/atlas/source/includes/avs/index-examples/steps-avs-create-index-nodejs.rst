.. procedure:: 
   :style: normal 

   .. step:: Create a ``.js`` file and define the index in the file. 

      .. literalinclude:: /includes/avs/index-management/create-index/create-index.js  
         :language: javascript
         :copyable: true 
         :linenos: 

      .. example:: 

         Create a file named ``vector-index.js``.

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

      .. example:: 

         Copy and paste the following into the ``vector-index.js`` file
         and replace the ``<connectionString>`` placeholder value. The
         following index definition indexes the
         ``plot_embedding_voyage_3_large`` field as the ``vector`` type
         and the ``genres`` and ``year`` fields as the ``filter`` type
         in a {+avs+} index. The ``plot_embedding_voyage_3_large``
         field contains embeddings created using |voyage|'s
         ``voyage-3-large`` embedding model. The index definition
         specifies ``2048`` vector dimensions and measures similarity
         using ``dotProduct`` function.

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition indexes only the vector
               embeddings field (``plot_embedding_voyage_3_large``) for
               performing vector search.  

               .. literalinclude:: /includes/avs/index-management/create-index/basic-example.js
                  :language: js
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field
                 (``plot_embedding_voyage_3_large``) for performing
                 vector search against pre-filtered data. 

               .. literalinclude:: /includes/avs/index-management/create-index/filter-example.js
                  :language: js
                  :copyable: true 
                  :linenos:

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         node <file-name>.js

      .. example:: 

         .. code-block:: shell

            node vector_index.js
