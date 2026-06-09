.. io-code-block::
   :copyable: true
   
   .. input:: 
      :language: json
      :linenos: 

      db.minutes.aggregate([
        {
          "$search": {
            "wildcard": {
              "query": "*department meetings*",
              "path": "text.en_US",
              "allowAnalyzedField": true
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "text.en_US": 1
          }
        }
      ])
   
   .. output::
      :language: json
      :linenos: 

      [
        {
          _id: 1,
          text: { en_US: '<head> This page deals with department meetings. </head>' }
        }
      ]
