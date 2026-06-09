.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "punkt",
              "path": "text.pl_PL"
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "text.pl_PL": 1
          }
        }
      ])
   
   .. output::
      :language: js
      :visible: false

      [
        {
          _id: 4,
          text: {
            pl_PL: 'Strona została zaktualizowana o punkty porządku obrad.'
          }
        }
      ]
