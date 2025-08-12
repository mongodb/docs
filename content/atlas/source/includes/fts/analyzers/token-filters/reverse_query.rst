.. io-code-block::
   :copyable: true
   
   .. input:: 
      :language:  json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "wildcard": {
              "query": "*@example.com",
              "path": "page_updated_by.email",
              "allowAnalyzedField": true
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "page_updated_by.email": 1,
          }
        }
      ])
   
   .. output:: 
      :language:  json
         
      [
        { _id: 1, page_updated_by: { email: 'auerbach@example.com' } },
        { _id: 2, page_updated_by: { email: 'ohrback@example.com' } },
        { _id: 3, page_updated_by: { email: 'lewinsky@example.com' } },
        { _id: 4, page_updated_by: { email: 'levinski@example.com' } }
      ]
