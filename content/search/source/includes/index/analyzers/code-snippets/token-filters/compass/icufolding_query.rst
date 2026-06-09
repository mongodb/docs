.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "wildcard": {
              "query": "*avdelning*",
              "path": "text.sv_FI",
              "allowAnalyzedField": true
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "text.sv_FI": 1
          }
        }
      ])

   .. output::
      :language: js
      :visible: false

      [
        {
          _id: 1,
          text: { sv_FI: 'Den här sidan behandlar avdelningsmöten' }
        },
        {
          _id: 2,
          text: { sv_FI: 'Först talade chefen för försäljningsavdelningen' }
        }
      ]
