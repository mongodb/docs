.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "meeting",
              "path": "text.en_US"
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "title": 1,
            "text.en_US": 1
          }
        }
      ])

   .. output::
      :language: json
      :visible: false

      [
        {
          _id: 1,
          title: "The team's weekly meeting",
          text: { en_US: '<head> This page deals with department meetings.</head>' }
        }
      ]
