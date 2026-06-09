.. io-code-block::
   :copyable: true
   
   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "punto",
              "path": "text.es_MX"
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
      :language: json

      [
        {
          _id: 4,
          text : {
            es_MX: 'La página ha sido actualizada con los puntos de la agenda.',
          }
        }
      ]
