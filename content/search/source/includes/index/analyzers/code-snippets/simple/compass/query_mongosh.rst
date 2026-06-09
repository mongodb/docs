.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: json 
      :linenos:

      db.movies.aggregate([
        { 
          "$search": {
            "text": {
               "query": "lion",
               "path": "title"
            }
          }
        },
        {
          "$limit": 5
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
        { title: 'White Lion' },
        { title: 'The Lion King' },
        { title: 'The Lion King 1 1/2' },
        { title: 'The Lion King 1 1/2' },
        { title: 'Lion's Den' },
      ]