.. procedure:: 
   :style: normal 

   .. step:: Modify your query in the ``run-query.py`` file.

      Copy and paste the highlighted code into the ``run-query.py`` file.

      .. literalinclude:: /includes/hybrid-search/rerank/score-fusion/code-snippets/query/auto-embed-query.py
         :language: python
         :linenos:
         :emphasize-lines: 64-88
         :caption: run-query.py

   .. step:: Save the file.
   
   .. step:: Reorder the results of your :pipeline:`$scoreFusion` query.

      To reorder, run the following command:
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            python run-query.py
        
         .. output:: /includes/hybrid-search/rerank/score-fusion/code-snippets/output/auto-embed-python-query-results.js
            :language: javascript
            :visible: true