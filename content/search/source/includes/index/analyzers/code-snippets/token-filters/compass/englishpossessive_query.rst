.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "team",
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
      :language: js
      :visible: false

      [
        {
          _id: 1,
          title: 'The team's weekly meeting'
        },
        { 
          _id: 2,
          title: 'The check-in with sales team'
        }
      ]
