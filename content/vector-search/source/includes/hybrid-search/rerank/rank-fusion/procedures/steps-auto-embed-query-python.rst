.. procedure:: 
   :style: normal 

   .. step:: Modify the query in the ``run-query.py``.

      Copy and paste the highlighted code to your query.

      .. literalinclude:: /includes/hybrid-search/rerank/rank-fusion/code-snippets/query/auto-embed-query.py
         :language: python
         :linenos:
         :emphasize-lines: 60-86
         :caption: run-query.py

   .. step:: Save the file.
   
   .. step:: Reorder the results of your query.

      To reorder, run the following command:
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            python run-query.py
        
         .. output:: /includes/hybrid-search/rerank/rank-fusion/code-snippets/output/auto-embed-python-query-output.js
            :language: javascript
            :visible: false
            :linenos: