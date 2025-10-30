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
               "query": "forsaljningsavdelningen",
               "path": "text.sv_FI"
             }
           }
         }

      .. output:: 
         :language: json

         SCORE: 0.13076457381248474  _id:  "2"
          message: "do not forget to SIGN-IN. See ① for details."
          page_updated_by: Object
          text: Object
            en_US: "The head of the sales department spoke first."
            fa_IR: "ابتدا رئیس بخش فروش صحبت کرد"
            sv_FI: "Först talade chefen för försäljningsavdelningen"
