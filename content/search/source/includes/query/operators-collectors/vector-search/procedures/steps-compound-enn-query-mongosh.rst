.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``query-embeddings``. 

      .. code-block:: javascript

         touch query-embeddings

   .. step:: Copy and paste the following embeddings in to the ``query-embeddings`` file.

      .. literalinclude:: /includes/query/operators-collectors/vector-search/code-snippets/shared/compound-query-embeddings.js 
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
         
         .. input:: /includes/query/operators-collectors/vector-search/code-snippets/mongosh/compound-enn-query-mongosh.json
            :language: javascript 
            :linenos: 

         .. output:: /includes/query/operators-collectors/vector-search/code-snippets/output/compound-enn-query-mongosh-output.js
            :language: javascript 
            :linenos: 
