.. procedure:: 
   :style: normal 

   .. step:: Connect to the |service| {+cluster+} using {+mongosh+}. 

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

   .. step:: Run the :method:`db.collection.createSearchIndex()` method. 

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
                 "similarity": "euclidean | cosine | dotProduct"
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

         .. include:: /includes/avs-openai-index-description.rst

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition indexes only the vector
               embeddings field for performing vector search.  

               .. literalinclude:: /includes/avs-examples/index-management/create-index/basic-example-mongosh.sh  
                  :language: shell
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding``) for
                 performing vector search against pre-filtered data.

               .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example-mongosh.sh  
                  :language: shell
                  :copyable: true 
                  :linenos:
