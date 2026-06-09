1. Click the :guilabel:`Query` button for your index.
#. Click :guilabel:`Edit Query` to edit the query.
#. Click on the query bar and select the database and collection.
#. Replace the default query with the following and click
   :guilabel:`Search`:

   .. io-code-block:: 
      :copyable: true

      .. input:: 
         :language: json

         {
           "$search": {
             "index": "default",
             "autocomplete": {
               "query": "standup",
               "path": "title"
             }
           }
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 0.9239386320114136 _id:  “4”
          message: "write down your signature or phone №"
          page_updated_by: Object
          text: Object
