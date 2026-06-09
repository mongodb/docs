.. io-code-block:: 
   :copyable: true

   .. input:: 
      :language: json  

      db.minutes.aggregate([
        {
          "$search": {
           "index": "default",
           "text": {
              "query": "AUERBACH",
              "path": "page_updated_by.last_name"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "page_updated_by.last_name": 1
          }
        }
      ])

   .. output:: 
      :language: js
      :visible: false

      [
       { "_id" : 1, "page_updated_by" : { "last_name" : "AUERBACH" } }
       { "_id" : 2, "page_updated_by" : { "last_name" : "OHRBACH" } }
      ]
