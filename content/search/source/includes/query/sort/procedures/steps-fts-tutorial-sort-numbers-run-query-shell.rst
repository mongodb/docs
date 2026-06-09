To run the query in {+mongosh+}:

.. io-code-block::
   :copyable: true

   .. input::
      :language: js
      :linenos:

      db.movies.aggregate([
        {
          "$search": {
            "range": {
              "path": "awards.wins",
              "gte": 10
            },
            "sort": {
              "awards.wins": -1,
            }
          }
        },
        {
          $limit: 5
        },
        {
          "$project": {
            "_id": 0,
            "title": 1,
            "awards.wins": 1
          }
        }
      ])

   .. output::
      :language: json
      :visible: false

      [
        {
          title: '12 Years a Slave',
          awards: { wins: 267 }
        },
        {
          title: 'Gravity',
          awards: { wins: 231 }
        },
        {
          title: 'Gravity',
          awards: { wins: 231 }
        },
        {
          title: 'Birdman: Or (The Unexpected Virtue of Ignorance)',
          awards: { wins: 210 }
        },
        {
          title: 'Boyhood',
          awards: { wins: 185 }
        }
      ]

