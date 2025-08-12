.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "sign",
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
        {
          _id: 3,
          message: 'try to sign-in'
        }  
      ]
