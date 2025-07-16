.. procedure:: 
   :style: normal
   
   .. step:: Prepare your query embeddings.

      Save the following embeddings in a file named ``query-embeddings.js``:

      .. literalinclude:: /includes/avs/tutorial/mongosh-query-embeddings.js
         :language: javascript
         :copyable: true 

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      {+cluster+}. For detailed instructions on connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.
   
   .. step:: Load the query embeddings into {+mongosh+}. 

      Load the file into {+mongosh+} to use the embeddings in your query:
   
      .. code-block:: javascript 

         load('/<path-to-file>/query-embeddings.js');

   .. step:: Switch to the ``sample_mflix`` database. 

      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: shell

            use sample_mflix
      
         .. output:: 
            :language: shell
      
            switched to db sample_mflix

   .. step:: Run the semantic search query against the indexed fields.

      .. include:: /includes/avs/extracts/fts-vector-search-tutorial-queries-desc.rst

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: basic

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. io-code-block::
               :copyable: true
      
               .. input:: /includes/avs/tutorial/semantic-search/filter-by-and-query.sh 
                  :language: json
                  :linenos:
                       
               .. output:: /includes/avs/tutorial/semantic-search/filter-by-and-query-shell-output.js
                  :language: javascript
                  :linenos:

         .. tab:: Pre-Filter by OR or AND Operator
            :tabid: advanced

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. io-code-block::
               :copyable: true
      
               .. input:: /includes/avs/tutorial/semantic-search/filter-by-or-and-query.sh
                  :language: json
                  :linenos:
                       
               .. output:: /includes/avs/tutorial/semantic-search/filter-by-or-and-query-shell-output.js
                  :language: javascript
                  :linenos:
