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

         .. include:: /includes/quick-start/facts/avs-voyageai-index-description.rst

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition indexes only the vector
               embeddings field using the default |hnsw| indexing method for 
               performing vector search.  

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/shell/basic-example-mongosh.sh  
                  :language: shell
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the |hnsw| ``indexingMethod`` for performing vector 
                 search against pre-filtered data.

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/shell/filter-example-mongosh.sh  
                  :language: shell
                  :copyable: true 
                  :linenos:

            .. tab:: Flat Example 
               :tabid: flat

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the ``flat`` indexing method for performing vector 
                 search against pre-filtered data.

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/shell/flat-example-mongosh.sh  
                  :language: shell
                  :copyable: true 
                  :linenos: