.. io-code-block:: 
   :copyable: true

   .. input:: 
      :language: json  

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "Sian",
              "path": "page_updated_by.first_name"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "page_updated_by.last_name": 1,
            "page_updated_by.first_name": 1
          }
        }
      ])

   .. output:: 
      :language: js
      :visible: false

      [
       {
          _id: 1,
          page_updated_by: { last_name: 'AUERBACH', first_name: 'Siân'}
       }
      ]
