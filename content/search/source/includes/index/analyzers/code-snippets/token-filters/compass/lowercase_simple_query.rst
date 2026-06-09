.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
       {
          "$search": {
            "index": "default",
            "autocomplete": {
              "query": "standup",
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

      [ { _id: 4, title: 'The daily huddle on tHe StandUpApp2' } ]