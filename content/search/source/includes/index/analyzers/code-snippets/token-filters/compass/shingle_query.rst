.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "auerbach@ex",
              "path": "page_updated_by.email"
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "text.es_MX": 1
          }
        }
      ])
   
   .. output::
      :language: js
      :visible: false

      [ { _id: 1, page_updated_by: { email: 'auerbach@example.com' } } ]
