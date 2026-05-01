.. procedure:: 
   :style: normal 

   .. step:: Connect to the cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. example:: 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell
              
               use sample_mflix 

            .. output:: 
              :language: shell 

              switched to db sample_mflix

   .. step:: Run the ``db.collection.createSearchIndex()`` method. 

      The :method:`db.collection.createSearchIndex()` method has the
      following syntax:   

      .. code-block:: shell 
         :copyable: true 
         :linenos: 

         db.<collectionName>.createSearchIndex(
           "<index-name>",
           "vectorSearch", //index type
           {
             fields: [
               {
                 "type": "vector",
                 "numDimensions": <number-of-dimensions>,
                 "path": "<field-to-index>",
                 "similarity": "euclidean | cosine | dotProduct",
                 "quantization": "none | scalar | binary",
                 "indexingMethod": "flat | hnsw",
                 "hnswOptions": {
                   "maxEdges": <number-of-connected-neighbors>,
                   "numEdgeCandidates": <number-of-nearest-neighbors>
                 }
               },
               {
                 "type": "filter",
                 "path": "<field-to-index>"
               },
               ...
             ]
           }
         );
         
      .. example:: 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition on the ``sample_mflix.embedded_movies`` 
               collection indexes only the vector embeddings field using the default 
               |hnsw| indexing method for performing vector search.  

               .. literalinclude:: /includes/avs/index-management/create-index/basic-example-mongosh.sh  
                  :language: shell
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               The following index definition on the ``sample_mflix.embedded_movies`` 
               collection indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the |hnsw| ``indexingMethod`` for performing vector 
                 search against pre-filtered data.

               .. literalinclude:: /includes/avs/index-management/create-index/filter-example-mongosh.sh  
                  :language: shell
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

               .. literalinclude:: /includes/avs/index-management/create-index/flat-example-mongosh.sh  
                  :language: shell
                  :copyable: true 
                  :linenos:

            .. tab:: Nested Field Example 
               :tabid: nested

               Run the following Python script to create nested embeddings for the 
               ``reviews.comments`` field in the ``sample_airbnb.listingsAndReviews`` 
               collection after replacing the following placeholder values:

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

               .. literalinclude:: /includes/avs/pipeline-stage/examples/add-nested-embeddings.py
                  :language: python
                  :linenos:
                  :copyable: true

               The following index definition on the ``sample_airbnb.listingsAndReviews`` 
               collection indexes the following fields: 

               - The string fields (``address.country`` and ``property_type``), a 
                 numeric field (``bedrooms``), and a date field (``reviews.date``)
                 for pre-filtering the data. 
               - The vector embeddings field (``reviews.comments_embedding``) for
                 performing vector search against pre-filtered data.
               - The ``reviews`` array field as the ``nestedRoot`` field for indexing 
                 nested vector fields.

               .. literalinclude:: /includes/avs/index-management/create-index/nested-embedding-example-mongosh.sh
                  :language: shell
                  :linenos:
                  :copyable: true 
