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
                 "query": "lion",
                 "path": "title"
               }
             }
           }
         ]

      .. output:: 
         :language: js
         :visible: false

         SCORE: 3.9090898036956787  _id:  "573a13cbf29313caabd8135d"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "According to the legend of the Shangaan, white lions are the messenger…"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-02 00:45:38.833000000"
            num_mflix_comments: 2
            plot: "According to the legend of the Shangaan, white lions are the messenger…"
            poster: "https://m.media-amazon.com/images/M/MV5BMTcwMTAyMzg5OV5BMl5BanBnXkFtZT…"
            rated: "PG"
            released: 2010-02-19T00:00:00.000+00:00
            runtime: 88
            title: "White Lion"
            type: "movie"
            writers: Array (3)
            year: 2010

         SCORE: 3.363236427307129    _id:  "573a1399f29313caabcee7fc"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (2)
            fullplot: "A young lion Prince is cast out of his pride by his cruel uncle, who c…"
            genres: Array (3)
            imdb: Object
            languages: Array (4)
            lastupdated: "2015-08-31 00:04:32.670000000"
            metacritic: 83
            num_mflix_comments: 132
            plot: "Lion cub and future king Simba searches for his identity. His eagernes…"
            poster: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNm…"
            rated: "G"
            released: 1994-06-24T00:00:00.000+00:00
            runtime: 89
            title: "The Lion King"
            tomatoes: Object
            type: "movie"
            writers: Array (29)
            year: 1994

         SCORE: 3.363236427307129    _id:  "573a13a9f29313caabd1f600"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (1)
            fullplot: "Timon and Pumbaa start to watch the original Lion King movie, but Timo…"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-14 00:01:14.313000000"
            num_mflix_comments: 0
            plot: "Timon the meerkat and Pumbaa the warthog retell the story of The Lion …"
            poster: "https://m.media-amazon.com/images/M/MV5BYzg2N2Y1ODYtY2QyMi00ZDAyLWE3MT…"
            rated: "G"
            released: 2004-02-10T00:00:00.000+00:00
            runtime: 77
            title: "The Lion King 1 1/2"
            tomatoes: Object
            type: "movie"
            writers: Array (5)
            year: 2004

         SCORE: 3.363236427307129    _id:  "573a13abf29313caabd24af6"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (1)
            fullplot: "Timon and Pumbaa start to watch the original Lion King movie, but Timo…"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-31 05:44:38.700000000"
            num_mflix_comments: 0
            plot: "Timon the meerkat and Pumbaa the warthog retell the story of The Lion …"
            poster: "https://m.media-amazon.com/images/M/MV5BYzg2N2Y1ODYtY2QyMi00ZDAyLWE3MT…"
            rated: "G"
            released: 2004-02-10T00:00:00.000+00:00
            runtime: 77
            title: "The Lion King 1 1/2"
            tomatoes: Object
            type: "movie"
            writers: Array (5)
            year: 2004

         SCORE: 2.9511470794677734   _id:  "573a1396f29313caabce366e"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (1)
            fullplot: "Christmas 1183--an aging and conniving King Henry II plans a reunion w…"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-17 01:39:32.220000000"
            num_mflix_comments: 0
            plot: "1183 AD: King Henry II's three sons all want to inherit the throne, bu…"
            poster: "https://m.media-amazon.com/images/M/MV5BMTkzNzYyMzA5N15BMl5BanBnXkFtZT…"
            rated: "PG"
            released: 1968-10-30T00:00:00.000+00:00
            runtime: 134
            title: "The Lion in Winter"
            tomatoes: Object
            type: "movie"
            writers: Array (2)
            year: 1968

         SCORE: 2.9511470794677734   _id:  "573a13c1f29313caabd63be7"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            genres: Array (1)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-04-24 02:38:23.767000000"
            num_mflix_comments: 0
            poster: "https://m.media-amazon.com/images/M/MV5BMTg4Mzg4NDk5MF5BMl5BanBnXkFtZT…"
            released: 2009-11-06T00:00:00.000+00:00
            runtime: 92
            title: "Son of a Lion"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2007

         SCORE: 2.9511470794677734   _id:  "573a13dbf29313caabdaf30d"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (1)
            fullplot: "Neo-Nazi falls in love with a woman who has a black son and finds hims…"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-15 00:13:18.457000000"
            num_mflix_comments: 0
            plot: "Neo-Nazi falls in love with a woman who has a black son and finds hims…"
            poster: "https://m.media-amazon.com/images/M/MV5BY2M4ZjI5NmMtZjcyNy00NWU3LWI2Zj…"
            released: 2013-10-18T00:00:00.000+00:00
            runtime: 104
            title: "Heart of a Lion"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2013

         SCORE: 2.629019260406494    _id:  "573a1397f29313caabce5e62"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "At the beginning of the 20th century an American woman is abducted in …"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-02 00:17:16.943000000"
            num_mflix_comments: 2
            plot: "At the beginning of the 20th century an American woman is abducted in …"
            poster: "https://m.media-amazon.com/images/M/MV5BYTNhODI4NWYtYzc1Zi00OGIxLTk5ZW…"
            rated: "PG"
            released: 1975-10-26T00:00:00.000+00:00
            runtime: 119
            title: "The Wind and the Lion"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 1975

         SCORE: 2.629019260406494    _id:  "573a13ebf29313caabdcfc8d"
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

         SCORE: 2.3702940940856934   _id:  "573a139af29313caabcf0ccd"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (2)
            fullplot: "Simba and Nala have a daughter, Kiara. Timon and Pumbaa are assigned t…"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-24 00:49:09.900000000"
            num_mflix_comments: 0
            plot: "Simba's daughter is the key to a resolution of a bitter feud between S…"
            poster: "https://m.media-amazon.com/images/M/MV5BY2Y3MTk2MDgtOTc1Yy00ZmFjLThlNT…"
            rated: "G"
            released: 1998-10-27T00:00:00.000+00:00
            runtime: 81
            title: "The Lion King 2: Simba's Pride"
            tomatoes: Object
            type: "movie"
            writers: Array (10)
            year: 1998