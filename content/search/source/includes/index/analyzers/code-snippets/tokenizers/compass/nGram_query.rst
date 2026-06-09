.. io-code-block::
   :copyable: true

   .. input::
      :language: json
      :linenos: 

      db.minutes.aggregate([
        {
          "$search": {
            "text": {
              "query": "week",
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

      { _id: 1, title: "The team's weekly meeting" }
