.. io-code-block::
   :copyable: true
   
   .. input:: 
      :language: json
      :linenos: 

      db.minutes.aggregate([
        {
          "$search": {
            "phrase": {
              "query": "head of the sales",
              "path": "text.en_US"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "text.en_US": 1
          }
        }
      ])
   
   .. output::
      :language: js
      :visible: false

      [
        {
          _id: 2,
          text: { en_US: 'The head of the sales department spoke first.' }
        }
      ]
