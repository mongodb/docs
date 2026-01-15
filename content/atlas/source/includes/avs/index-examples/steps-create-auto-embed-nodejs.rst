.. procedure:: 
   :style: normal 

   .. step:: Create a ``.js`` file and define the index in the file. 

      .. literalinclude:: /includes/avs/index-management/create-index/create-auto-embed-index.js  
         :language: javascript
         :copyable: true 
         :linenos: 

      .. example:: 

         Create a file named ``vector-index.js``.

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

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

         * - ``<embeddingModel>``
           - Name of |voyage| embedding model to use.

      .. example:: 

         Copy and paste the following into the ``vector-index.js`` file
         and replace the ``<connectionString>`` placeholder value. The
         following index definition uses the ``sample_mflix.movies``
         collection. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               .. include:: /includes/avs/tutorial/auto-embed-basic-example-description.rst 

               .. literalinclude:: /includes/avs/index-management/create-index/basic-auto-embed-example.js
                  :language: js
                  :copyable: true 
                  :linenos:
                  :caption: vector_index.js

            .. tab:: Filter Example 
               :tabid: advanced

               .. include:: /includes/avs/tutorial/auto-embed-filter-example-description.rst

               .. literalinclude:: /includes/avs/index-management/create-index/filter-auto-embed-example.js
                  :language: js
                  :copyable: true 
                  :linenos:
                  :caption: vector_index.js

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         node <file-name>.js

      .. example:: 

         .. code-block:: shell

            node vector_index.js
