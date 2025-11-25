.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``query-embeddings``. 

      .. code-block:: javascript

         touch query-embeddings

   .. step:: Copy and paste the following embeddings in to the ``query-embeddings`` file.

      .. literalinclude:: /includes/fts/operators/vectorSearch/fuzzy-query-embeddings.js 
         :language: javascript
         :copyable: true 

   .. step:: Connect to your cluster and switch to the database that contains the collection. 

      .. code-block:: javascript

         use sample_mflix

   .. step:: Load the embeddings.

      .. code-block:: javascript

         load('<path/to>/query-embeddings.js');

   .. step:: Run the following query in your terminal.
    
      .. io-code-block:: 
         :copyable: true
         
         .. input:: /includes/fts/operators/vectorSearch/fuzzy-ann-query-mongosh.json
            :language: javascript 
            :linenos: 

         .. output:: /includes/fts/operators/vectorSearch/fuzzy-ann-query-mongosh-output.js
            :language: javascript 
            :linenos: 
