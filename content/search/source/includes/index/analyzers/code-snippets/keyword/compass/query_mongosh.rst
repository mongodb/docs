.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: json 

      db.movies.aggregate([
        { 
          "$search": {
            "text": {
               "query": "Class Action",
               "path": "title"
            }
          }
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
          title: 'Class Action' 
        }
      ]