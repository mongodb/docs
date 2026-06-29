.. procedure:: 
   :style: normal
   
   .. step:: Connect to your cluster using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      cluster. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Use the ``sample_mflix`` database. 

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_mflix 

         .. output:: 
            :language: sh
            :emphasize-lines: 1 

            switched to db sample_mflix

   .. step:: Run the following query against the ``embedded_movies`` collection.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/hybrid-search/rrf-tutorial/code-snippets/query/auto-embed-query.sh
            :language: javascript 
            :linenos:

         .. output:: /includes/hybrid-search/rrf-tutorial/code-snippets/output/auto-embed-shell-query-output.js
            :language: javascript
            :visible: false
