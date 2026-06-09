.. io-code-block::
   :copyable: true

   .. input::
      :language: json
      :linenos: 

      db.minutes.aggregate([
        {
          "$search": {
            "text": {
              "query": "signature",
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

      { _id: 4, message: 'write down your signature or phone №' }
