.. procedure:: 
   :style: normal 

   .. step:: Create a ``.js`` file and define the index in the file. 

      .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/nodejs/create-index.js
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

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

      .. example:: 

         Copy and paste the following into the ``vector-index.js`` file
         and replace the ``<connectionString>`` placeholder value. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition on the ``sample_mflix.embedded_movies`` 
               collection indexes only the ``plot_embedding_voyage_3_large`` field  
               as the ``vector`` type using the default indexing method, |hnsw|, 
               for performing vector search.  

               .. literalinclude:: /includes/quick-start/code-snippets/nodejs/basic-example.js
                  :language: js
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               The following index definition on the ``sample_mflix.embedded_movies`` 
               collection indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the |hnsw| indexing method for performing vector search 
                 against pre-filtered data. 

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/nodejs/filter-example.js
                  :language: js
                  :copyable: true 
                  :linenos:

            .. tab:: Flat Example 
               :tabid: flat

               The following index definition on the ``sample_mflix.embedded_movies`` 
               collection indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the ``flat`` indexing method for performing vector 
                 search against pre-filtered data. 

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/nodejs/flat-example.js
                  :language: js
                  :copyable: true
                  :linenos:

            .. tab:: Stored Source Example
               :tabid: storedSource

               .. include:: /includes/index/vector-type/facts/stored-source-example.rst

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/nodejs/stored-source-example.js
                  :language: js
                  :copyable: true
                  :linenos:

            .. tab:: Nested Field Example 
               :tabid: nested

               Run the following Python script to create nested embeddings for the 
               ``reviews.comments`` field in the ``sample_airbnb.listingsAndReviews`` 
               collection after replacing following placeholder values:

               .. list-table:: 
                  :widths: 30 70 
                  :header-rows: 1

                  * - Placeholder 
                    - Valid Value 

                  * - ``<CONNECTION-STRING>``
                    - Cluster connection string. To learn more, see
                      :ref:`connect-via-driver`.

                  * - ``<API-KEY>``
                    - Voyage AI API key. To learn more, see
                      :ref:`Voyage AI API Keys <voyage-api-keys>`.

               The script creates 1024-dimension embeddings using the 
               ``voyage-4-large`` model for the ``reviews.comments`` field in the 
               ``reviews`` array. It adds the embeddings to the ``reviews`` array 
               as a new field named ``comments_embedding``.

               .. literalinclude:: /includes/pipeline-stage/vectorSearch/code-snippets/python/add-nested-embeddings.py
                  :language: python
                  :linenos:
                  :copyable: true

               The following index definition on the ``sample_airbnb.listingsAndReviews`` 
               collection indexes the following fields: 
      
               - The string field (``address.country`` and ``property_type``), a 
                 numeric field (``bedrooms``), and a date field (``reviews.date``)
                 for pre-filtering the data. 
               - The vector embeddings field (``reviews.comments_embedding``) for 
                 performing vector search against pre-filtered data.
               - The ``reviews`` array field as the ``nestedRoot`` field for indexing 
                 nested vector fields.

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/nodejs/nested-field-example.js
                  :language: js
                  :copyable: true 
                  :linenos:

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         node <file-name>.js

      .. example:: 

         .. code-block:: shell

            node vector_index.js
