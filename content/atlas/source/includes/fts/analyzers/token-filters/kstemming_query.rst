.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
       {
          "$search": {
            "index": "default",
            "text": {
              "query": "Meeting",
              "path": "text.en_US"
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "text.en_US": 1
          }
        }
      ])

   .. output::
      :language: json

      [
        {
          _id: 1,
          text: {
            en_US: '<head> This page deals with department meetings. </head>'
          }
        }
      ]
