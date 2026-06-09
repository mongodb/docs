.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "réunion",
              "path": "text.fr_CA"
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "text.fr_CA": 1
          }
        }
      ])
   
   .. output::
      :language: js
      :visible: false

      [
        {
          _id: 1,
          text: {
            fr_CA: 'Cette page traite des réunions de département'
          }
        }
      ]
