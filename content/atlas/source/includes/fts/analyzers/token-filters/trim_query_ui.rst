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
               "query": "*department meetings*",
               "path": "text.en_US",
               "allowAnalyzedField": true
             }
           }
         }

      .. output:: 
         :language: js

         SCORE: 1  _id:  "1"
         message: "try to siGn-In"
         page_updated_by: Object
         text: Object
           en_US: "<head> This page deals with department meetings.</head>"
           sv_FI: "Den här sidan behandlar avdelningsmöten"
           fr_CA: "Cette page traite des réunions de département"
