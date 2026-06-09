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
               "query": "auerbach@ex",
               "path": "page_updated_by.email"
             }
           }
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 0.8824931383132935  _id:  "1"
          message: "try to siGn-In"
          page_updated_by: Object
            last_name: "AUERBACH"
            first_name: "Siân"
            email: "auerbach@example.com"
            phone: "(123)-456-7890"
          text: Object