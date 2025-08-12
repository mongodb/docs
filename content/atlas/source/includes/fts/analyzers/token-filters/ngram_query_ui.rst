1. Click the :guilabel:`Query` button for your index.
#. Click :guilabel:`Edit Query` to edit the query.
#. Click on the query bar and select the database and collection.
#. Replace the default query with the following and click
   :guilabel:`Find`:

   .. io-code-block:: 
      :copyable: true

      .. input:: 
         :language: json

         {
           "$search": {
             "index": "default",
             "wildcard": {
               "query": "meet*",
               "path": "title",
               "allowAnalyzedField": true
             }
           }
         }

      .. output:: 
        :language: js

        
