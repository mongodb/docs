.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``run-query.py``.

   .. step:: Copy and paste the following code into the ``run-query.py`` file.

      .. literalinclude:: /includes/hybrid-search/score-fusion-tutorial/code-snippets/query/auto-embed-query.py
         :language: python
         :linenos:
         :emphasize-lines: 3
         :caption: run-query.py

   .. step:: Replace the ``<connection-string>``.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the following command to query your collection:
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            python run-query.py
        
         .. output:: /includes/hybrid-search/score-fusion-tutorial/code-snippets/output/auto-embed-python-query-results.js
            :language: javascript
            :visible: true