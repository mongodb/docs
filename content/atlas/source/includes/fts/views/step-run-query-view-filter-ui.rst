.. step:: Go to the :guilabel:`Search Tester`.
      
   Click the :guilabel:`Query` button to the right of the index to 
   query.
   
.. step:: View and edit the query syntax.
   
   Click :guilabel:`Edit Query` to view a default query syntax 
   sample in |json| format.

.. step:: Query the ``releasedAfter2000Index`` partial index. 

   .. include:: /includes/search-shared/fact-partial-indexing-query.rst

   .. io-code-block::
      :copyable: true

      .. input:: /includes/fts/views/filter-documents-query-ui.json
         :language: json

      .. output:: /includes/fts/views/filter-documents-query-ui-output.js
         :language: javascript
         :visible: false
         