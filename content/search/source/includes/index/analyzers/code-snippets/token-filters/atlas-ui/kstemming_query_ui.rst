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
               "query": "Meeting",
               "path": "text.en_US"
             }
           }
         }

      .. output:: 
         :language: js

         SCORE: 0.5960260629653931 _id:  "1"
          message: "try to siGn-In"
          page_updated_by: Object
          text: Object
            en_US: "<head> This page deals with department meetings.</head>"
            sv_FI: "Den här sidan behandlar avdelningsmöten"
            fr_CA: "Cette page traite des réunions de département"
