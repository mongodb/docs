1. Click the :guilabel:`Query` button for your index.
#. Click :guilabel:`Edit Query` to edit the query.
#. Click on the query bar and select the database and collection.
#. Replace the default query with the following and click
   :guilabel:`Find`:

   .. io-code-block:: 
      :copyable: true

      .. input:: 
         :language: json

         [
           { 
             "$search": {
               "text": {
                 "query": "Lion's",
                 "path": "title"
               }
             }
           }
         ]

      .. output:: 
         :language: js
         :visible: false

         SCORE: 3.7370920181274414  _id:  "573a13ebf29313caabdcfc8d"    
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "A documentary on young actress, Marianna Palka, as she confronts her r…"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-03 00:37:45.227000000"
            num_mflix_comments: 0
            plot: "A documentary on young actress, Marianna Palka, as she confronts her r…"
            poster: "https://m.media-amazon.com/images/M/MV5BMTgzMTc2OTg2N15BMl5BanBnXkFtZT…"
            released: 2014-01-18T00:00:00.000+00:00
            runtime: 15
            title: "The Lion's Mouth Opens"
            type: "movie"
            writers: Array (1)
            year: 2014