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
             "text": {
               "query": "صحبت",
               "path": "text.fa_IR"
             }
           }
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 0.13076457381248474  _id:  “2”
          message: "do not forget to SIGN-IN. See ① for details."
          page_updated_by: Object
            last_name: "OHRBACH"
            first_name: "Noël"
            email: "ohrbach@example.com"
            phone: "(123) 456 0987"
          text: Object
            en_US: "The head of the sales department spoke first."
            fa_IR: "ابتدا رئیس بخش فروش صحبت کرد"
            sv_FI: "Först talade chefen för försäljningsavdelningen"