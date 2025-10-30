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
               "query": "sign-in",
               "path": "message"
             }
           }
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 0.37036222219467163  _id:  "1"
           message: "try to siGn-In"
           page_updated_by: Object
          text: Object

         SCORE: 0.37036222219467163  _id:  "3"
           message: "try to sign-in"
           page_updated_by: Object
           text: Object

         SCORE: 0.2633555233478546   _id:  "2"
           message: "do not forget to SIGN-IN. See ① for details."
           page_updated_by: Object
           text: Object
