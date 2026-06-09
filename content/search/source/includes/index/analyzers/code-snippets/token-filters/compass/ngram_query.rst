.. io-code-block::
   :copyable: true

   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "wildcard": {
              "query": "meet*",
              "path": "title",
              "allowAnalyzedField": true
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
        { _id: 1, title: 'The team's weekly meeting' },
        { _id: 3, title: 'The regular board meeting' }
      ]