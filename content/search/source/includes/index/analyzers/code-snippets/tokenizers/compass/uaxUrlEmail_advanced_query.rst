.. io-code-block::
   :copyable: true

   .. input::
      :language: json
      :linenos: 

      db.minutes.aggregate([ 
        { 
          "$search": { 
            "autocomplete": { 
              "query": "lewinsky@example.com",
              "path": "page_updated_by.email" 
            }
          } 
        },
        {
          "$project": {
            "_id": 1,
            "page_updated_by.email": 1
          }
        }
      ])

   .. output::
      :language: js
      :visible: false

      { _id: 3, page_updated_by: { email: 'lewinsky@example.com' } }
