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
             "wildcard": {
               "query": "*avdelning*",
               "path": "text.sv_FI",
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

         SCORE: 1  _id:  "2"
          message: "do not forget to SIGN-IN. See ① for details."
          page_updated_by: Object
          text: Object
            en_US: "The head of the sales department spoke first."
            fa_IR: "ابتدا رئیس بخش فروش صحبت کرد"
            sv_FI: "Först talade chefen för försäljningsavdelningen"
