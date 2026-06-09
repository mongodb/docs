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
            "query": "AUERBACH",
            "path": "page_updated_by.last_name"
          }
        }
      }

   .. output:: 
      :language: json
      :visible: false

      SCORE: 0.568153440952301  _id:  "1"
        message: "try to siGn-In"
        page_updated_by: Object
          last_name: "AUERBACH"
          first_name: "Siân"
          email: "auerbach@example.com"
          phone: "(123)-456-7890"
        text: Object
          en_US: "<head> This page deals with department meetings.</head>"
          sv_FI: "Den här sidan behandlar avdelningsmöten"
          fr_CA: "Cette page traite des réunions de département"

      SCORE: 0.521163284778595  _id:  "2"
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
