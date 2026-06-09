.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "forsaljningsavdelningen",
              "path": "text.sv_FI"
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
          _id: 2,
          text: {
            sv_FI: 'Först talade chefen för försäljningsavdelningen'
          }
        }
      ]
