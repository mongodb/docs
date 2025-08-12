.. io-code-block::
   :copyable: true

   .. input::
      :language: json
      :linenos: 

      db.minutes.aggregate([
        {
          "$search": {
            "text": {
              "query": "try to sign-in",
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

      { _id: 3, message: 'try to sign-in' }
