.. procedure::
   :style: normal

   .. step:: Prepare your query embeddings.

      Save the following embeddings in a file named ``query-embeddings.js``:

      .. literalinclude:: /includes/pipeline-stage/vectorSearch/code-snippets/basic-query-embeddings.js
         :language: javascript
         :copyable: true 

   .. step:: Connect to your cluster using {+mongosh+}. 

      Open a terminal window and connect to your cluster by using
      {+mongosh+}. To learn more, see :ref:`connect-mongo-shell`.  
   
   .. step:: Load the query embeddings into {+mongosh+}. 

      Load the file into {+mongosh+} to use the embeddings in your query:
   
      .. code-block:: javascript 

         load('/<path-to-file>/query-embeddings.js');
         
   .. step:: Switch to your database. 
      
      .. example:: 

         Use the ``sample_mflix`` database. To switch to the
         ``sample_mflix`` database, run the following command at
         {+mongosh+} prompt: 

         .. io-code-block::
            :copyable: true 

            .. input:: 
               :language: sh

               use sample_mflix 

            .. output:: 
               :language: sh

               switched to db sample_mflix

   .. step:: Run your |enn| query. 

      The following query uses the :pipeline:`$vectorSearch` stage to search
      the ``plot_embedding_voyage_4_large`` field for movies. The query uses 
      ``exact`` to perform an |enn| search and limits the results to ``10`` 
      documents only. The query also specifies a :pipeline:`$project` stage to 
      exclude all fields except ``plot``, ``title``, and ``genres`` from the 
      documents in the results. It also adds a field named ``score`` that 
      shows the vector search score of the documents in the results.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/evaluate-results/code-snippets/enn-query-mongosh.sh
            :language: shell 
            :linenos:

         .. output:: /includes/evaluate-results/code-snippets/enn-mongosh-results.sh 
            :language: shell 
            :visible: false

      .. include:: /includes/evaluate-results/facts/avs-evaluate-results-enn-query.rst

   .. step:: Run your |ann| query. 

      The following query uses the :pipeline:`$vectorSearch` stage to search
      the ``plot_embedding_voyage_4_large`` field for movies. The query uses 
      ``numCandidates`` to perform an |ann| search and limits the results to 
      ``10`` documents only. The query also specifies a :pipeline:`$project` 
      stage to exclude all fields except ``plot``, ``title``, and ``genres`` 
      from the documents in the results. It also adds a field named ``score`` 
      that shows the vector search score of the documents in the results.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/evaluate-results/code-snippets/ann-query-mongosh.sh
            :language: shell 
            :linenos:

         .. output:: /includes/evaluate-results/code-snippets/ann-mongosh-results.sh
            :language: shell 
            :visible: false

      .. include:: /includes/evaluate-results/facts/avs-evaluate-results-ann-query.rst

   .. step:: Rerank your |ann| results. 

      The following query uses the :pipeline:`$vectorSearch` stage to search
      the ``plot_embedding_voyage_4_large`` field for movies. The query passes 
      up to ``50`` documents from the |ann| search to the :pipeline:`$rerank` 
      stage to rerank the results by semantic relevance to the query. The query 
      uses the ``rerank-2.5`` model to rerank the results. The query also adds 
      a field named ``rerankScore`` that shows the rerank score of the documents 
      in the results.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/evaluate-results/code-snippets/rerank-query-mongosh.sh
            :language: shell 
            :linenos:

         .. output:: /includes/evaluate-results/code-snippets/rerank-mongosh-results.sh
            :language: shell 
            :visible: false
