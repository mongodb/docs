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
             "wildcard": {
               "query": "*@example.com",
               "path": "page_updated_by.email",
               "allowAnalyzedField": true
             }
           }
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 1 _id:  "1"
          message: "try to siGn-In"
          page_updated_by: Object
            last_name: "AUERBACH"
            first_name: "Siân"
            email: "auerbach@example.com"
            phone: "(123)-456-7890"
          text: Object

         SCORE: 1  _id:  "2"
          message: "do not forget to SIGN-IN. See ① for details."
          page_updated_by: Object
            last_name: "OHRBACH"
            first_name: "Noël"
            email: "ohrbach@example.com"
            phone: "(123) 456 0987"
          text: Object

         SCORE: 1  _id:  "3"
          message: "try to sign-in"
          page_updated_by: Object
            last_name: "LEWINSKY"
            first_name: "Brièle"
            email: "lewinsky@example.com"
            phone: "(123).456.9870"
          text: Object

         SCORE: 1  _id:  "4"
          message: "write down your signature or phone №"
          page_updated_by: Object
            last_name: "LEVINSKI"
            first_name: "François"
            email: "levinski@example.com"
            phone: "123-456-8907"
          text: Object