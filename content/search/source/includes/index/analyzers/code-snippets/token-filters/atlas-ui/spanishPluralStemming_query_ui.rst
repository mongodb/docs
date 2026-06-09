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
               "query": "punto",
               "path": "text.es_MX"
             }
           } 
         }

      .. output:: 
         :language: js
         :visible: false

          SCORE: 0.13076457381248474  _id:  "4"
            message: "write down your signature or phone №"
            page_updated_by: Object
            text: Object
              en_US: "<body>This page has been updated with the items on the agenda.</body>"
              es_MX: "La página ha sido actualizada con los puntos de la agenda."
              pl_PL: "Strona została zaktualizowana o punkty porządku obrad."
