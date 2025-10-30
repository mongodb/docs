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
            "query": "Sian",
            "path": "page_updated_by.first_name"
          }
        }
      }

   .. output:: 
      :language: json

      SCORE: 0.5472603440284729 _id:  "1"
        message: "try to siGn-In"
        page_updated_by: Object
          last_name: "AUERBACH"
          first_name: "Siân"
          email: "auerbach@example.com"
          phone: "(123)-456-7890"
        text: Object
          en_US: "<head> This page deals with department meetings.</head>"
          sv_FI: "Cette page traite des réunions de département"
