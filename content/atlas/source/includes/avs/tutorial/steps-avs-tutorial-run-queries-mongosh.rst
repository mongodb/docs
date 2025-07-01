.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      {+cluster+}. For detailed instructions on connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

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
      
               .. input:: /includes/avs/tutorial/filter-by-and-query.sh 
                  :language: json
                  :linenos:
                       
               .. output:: /includes/avs/tutorial/filter-by-and-query-shell-output.js
                  :language: javascript
                  :linenos:

         .. tab:: Pre-Filter by OR or AND Operator
            :tabid: advanced

            .. include:: /includes/avs/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. io-code-block::
               :copyable: true
      
               .. input:: /includes/avs/tutorial/filter-by-or-and-query.sh
                  :language: json
                  :linenos:
                       
               .. output:: /includes/avs/tutorial/filter-by-or-and-query-shell-output.js
                  :language: javascript
                  :linenos:
