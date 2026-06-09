.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: json 

      db.movies.aggregate([
        { 
          "$search": {
            "text": {
               "query": "action",
               "path": "title"
            }
          }
        },
        {
          "$limit": 2
        },
        {
          "$project": {
            "_id": 0,
            "title": 1
          }
        }
      ])

   .. output:: 
      :language: json 
      :visible: false

      [
        {
          title: 'Action Jackson'
        },
        { 
          title: 'Class Action' 
        }
      ]