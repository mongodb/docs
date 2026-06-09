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
                 "query": "Class Action",
                 "path": "title"
               }
             }
           }
         ]

      .. output:: 
         :language: js
         :visible: false

         SCORE: 4.346973419189453   _id:  "573a1399f29313caabcec6b7"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Jeb Ward is an attorney who specializes in whistle blower, David vs. G…"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-06 00:42:51.167000000"
            metacritic: 58
            num_mflix_comments: 2
            plot: "Jeb Ward is an attorney who specializes in whistle blower, David vs. G…"
            poster: "https://m.media-amazon.com/images/M/MV5BNWY5Mjk4ZmItMTAzYS00NWE3LWEzYz…"
            rated: "R"
            released: 1991-03-15T00:00:00.000+00:00
            runtime: 110
            title: "Class Action"
            tomatoes: Object
            type: "movie"
            writers: Array (3)
            year: 1991