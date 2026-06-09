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
               "query": "1",
               "path": "message"
             }
           }
         }

      .. output:: 
         :language: js

         SCORE: 0.4342196583747864 _id:  "2"
          message: "do not forget to SIGN-IN. See ① for details."
          page_updated_by: Object
          text: Object
