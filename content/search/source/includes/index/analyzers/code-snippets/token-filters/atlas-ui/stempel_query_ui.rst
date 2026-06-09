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
               "query": "punkt",
               "path": "text.pl_PL"
             }
           } 
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 0.5376965999603271 _id: "4"
           text: Object
             pl_PL: "Strona została zaktualizowana o punkty porządku obrad."
