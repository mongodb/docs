.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "Meet",
              "path": "title"
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "title": 1
          }
        }
      ])

   .. output::
      :language: json

      [
        {
          _id: 1,
          title: 'The team's weekly meeting'
        },
        {
          _id: 3,
          title: 'The regular board meeting'
        }
      ]
