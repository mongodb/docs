.. io-code-block:: 
   :copyable: true

   .. input:: 
      :language: javascript
      :linenos:

      db.movies.aggregate([
        {
          "$search": {
            "text": {
              "query": "liberte",
              "path": { "value": "title", "multi": "frenchAnalyzer" }
            }
          }
        }, 
        { 
          "$project": { 
            "title": 1,
            "year": 1,
            "_id": 0 
          } 
        }
      ])

   .. output:: 
      :language: json
      :visible: false

      [ { title: 'è Nous la Libertè', year: 1931 } ]