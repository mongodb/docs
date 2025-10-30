.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "1",
              "path": "message"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "message": 1
          }
        }
      ])

   .. output::
      :language: js
      :visible: false

      [ { _id: 2, message: 'do not forget to SIGN-IN. See ① for details.' } ]
