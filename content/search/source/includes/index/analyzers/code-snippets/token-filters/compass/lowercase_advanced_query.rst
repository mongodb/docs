.. io-code-block::
   :copyable: true

   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "sign-in",
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
      :language: json

      [
        { _id: 1, message: 'try to siGn-In' },
        { _id: 3, message: 'try to sign-in' },
        { _id: 2, message: 'do not forget to SIGN-IN. See ① for details.' }
      ]
