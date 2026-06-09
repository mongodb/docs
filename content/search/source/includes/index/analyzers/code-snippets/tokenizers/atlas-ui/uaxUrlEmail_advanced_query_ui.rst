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
             "autocomplete": {
               "query": "lewinsky@example.com",
               "path": "page_updated_by.email"
             }
           }
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 1.0203158855438232   _id:  "3"
          message: "try to sign-in"
            page_updated_by: Object
            last_name: "LEWINSKY"
            first_name: "Brièle"
            email: "lewinsky@example.com"
            phone: "(123).456.9870"
          text: Object
            en_US: "<body>We'll head out to the conference room by noon.</body>"
