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
               "query": "no",
               "path": "message"
             }
           }
         }

      .. output:: 
         :language: js
         :visible: false

         SCORE: 0.4923309087753296  _id:  “4”
          message: "write down your signature or phone №"
          page_updated_by: Object
            last_name: "LEVINSKI"
            first_name: "François"
            email: "levinski@example.com"
            phone: "123-456-8907"
          text: Object
            en_US: "<body>This page has been updated with the items on the agenda.</body>"
            es_MX: "La página ha sido actualizada con los puntos de la agenda."
            pl_PL: "Strona została zaktualizowana o punkty porządku obrad."
