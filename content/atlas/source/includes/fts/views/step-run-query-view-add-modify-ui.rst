.. step:: Go to the :guilabel:`Search Tester`.
      
   Click the :guilabel:`Query` button to the right of the index to 
   query.
   
.. step:: View and edit the query syntax.
   
   Click :guilabel:`Edit Query` to view a default query syntax 
   sample in |json| format.

.. step:: Run a query on the ``totalPriceIndex`` index.

   .. include:: /includes/search-shared/fact-partial-indexing-query.rst

   .. io-code-block::
      :copyable: true

      .. input:: /includes/fts/views/add-modify-fields-query-ui.json
         :language: json

      .. output:: /includes/fts/views/add-modify-fields-query-ui-output.js
         :visible: false
         :language: javascript