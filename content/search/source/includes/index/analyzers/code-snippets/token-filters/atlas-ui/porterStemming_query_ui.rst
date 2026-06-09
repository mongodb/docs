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
             "text": {
               "query": "Meet",
               "path": "title"
             }
           }
         }

      .. output:: 
         :language: json

         SCORE: 0.34314215183258057  _id:  “1”
          message: "try to siGn-In"
          page_updated_by: Object
          text: Object

         SCORE: 0.34314215183258057  _id:  “3”
          message: "try to sign-in"
          page_updated_by: Object
          text: Object
