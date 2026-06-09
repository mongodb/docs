.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: json 
      :linenos:

      db.minutes.aggregate([
        {
          "$search": {
            "text": {
              "query": "no",
              "path": "message"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "message": 1,
            "title": 1
          }
        }
      ])

   .. output::
      :language: js
      :visible: false

      [
        {
          _id: 4,
          title: 'The daily huddle on tHe StandUpApp2',
          message: 'write down your signature or phone №'
        }
      ]
