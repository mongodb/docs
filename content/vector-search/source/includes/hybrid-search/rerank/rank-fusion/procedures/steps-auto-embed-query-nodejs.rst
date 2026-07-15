.. procedure::
   :style: normal

   .. step:: Modify your ``run-query.js`` file. 
      
      Copy and paste the highlighted code to your query.

      .. literalinclude:: /includes/hybrid-search/rerank/rank-fusion/code-snippets/query/auto-embed-query.js
         :language: javascript
         :linenos:
         :emphasize-lines: 65-91
         :caption: run-query.js

   .. step:: Save the file.
   
   .. step:: Reorder the results of your query.

      To reorder, run the following command:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            node run-query.js

         .. output:: /includes/hybrid-search/rerank/rank-fusion/code-snippets/output/auto-embed-nodejs-query-output.js
            :language: javascript
            :visible: false
            :linenos: