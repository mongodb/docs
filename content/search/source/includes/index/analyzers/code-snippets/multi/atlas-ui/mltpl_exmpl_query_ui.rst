

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
                 "query": "revolution",
                   "path": [
                     "title", "plot",
                     { "value": "title", "multi": "frenchAnalyzer" },
                     {  "value": "plot", "multi": "frenchAnalyzer" }
                  ]
               }
             }
           }
         ]

      .. output:: 
         :language: js
         :visible: false

         SCORE: 14.07243537902832   _id:  "573a13dbf29313caabdaf845"
            awards: Object
            cast: Array (4)
            countries: Array (11)
            directors: Array (1)
            fullplot: "REVOLUTION is a film about changing the world, going for it, taking a …"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-07-09 11:14:18.300000000"
            metacritic: 53
            num_mflix_comments: 0
            plot: "REVOLUTION is a film about changing the world, going for it, taking a …"
            poster: "https://m.media-amazon.com/images/M/MV5BMTc1NDIxNjc0N15BMl5BanBnXkFtZT…"
            rated: "PG"
            released: 2015-04-22T00:00:00.000+00:00
            runtime: 85
            title: "Revolution"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2012

         SCORE: 13.935744285583496   _id:  "573a1398f29313caabce9ae2"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (1)
            fullplot: "New York trapper Tom Dobb becomes an unwilling participant in the Amer…"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-14 00:46:28.990000000"
            num_mflix_comments: 1
            plot: "New York trapper Tom Dobb becomes an unwilling participant in the Amer…"
            poster: "https://m.media-amazon.com/images/M/MV5BZmZhMmEyNjktZTgxZC00NzQyLTkyZD…"
            rated: "PG-13"
            released: 1985-12-25T00:00:00.000+00:00
            runtime: 126
            title: "Revolution"
            type: "movie"
            writers: Array (1)
            year: 1985

         SCORE: 11.623137474060059   _id:  "573a13f5f29313caabde37d4"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Together with five Soviet avant-garde artists, hero of the Russian rev…"
            genres: Array (1)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-15 03:33:53.177000000"
            num_mflix_comments: 1
            plot: "Together with five Soviet avant-garde artists, hero of the Russian rev…"
            released: 2014-11-18T00:00:00.000+00:00
            runtime: 113
            title: "Angels of Revolution"
            type: "movie"
            writers: Array (3)
            year: 2014

         SCORE: 11.210482597351074   _id:  "573a1396f29313caabce4248"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "An account of the adventures of two sets of identical twins, badly scr…"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-05 00:50:08.277000000"
            num_mflix_comments: 0
            plot: "Two mismatched sets of identical twins - one aristocrat, one peasant -…"
            poster: "https://m.media-amazon.com/images/M/MV5BODM2MzE3NmMtNmE2ZS00OGI2LWI5NT…"
            rated: "M"
            released: 1970-08-14T00:00:00.000+00:00
            runtime: 90
            title: "Start the Revolution Without Me"
            tomatoes: Object
            type: "movie"
            writers: Array (2)
            year: 1970

         SCORE: 8.332647323608398   _id:  "573a1398f29313caabceba10"
            awards: Object
            cast: Array (4)
            countries: Array (5)
            directors: Array (2)
            fullplot: "A history of the French Revolution from the decision of the king to co…"
            genres: Array (3)
            imdb: Object
            languages: Array (2)
            lastupdated: "2015-09-05 00:30:36.643000000"
            num_mflix_comments: 0
            plot: "A history of the French Revolution from the decision of the king to co…"
            released: 1989-10-25T00:00:00.000+00:00
            runtime: 360
            title: "La rèvolution franèaise"
            tomatoes: Object
            type: "movie"
            writers: Array (5)
            year: 1989

         SCORE: 7.699893474578857   _id:  "573a13a4f29313caabd10215"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            genres: Array (1)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-10 17:19:25.853000000"
            metacritic: 63
            num_mflix_comments: 0
            poster: "https://m.media-amazon.com/images/M/MV5BMTkxOTUzNjg0Ml5BMl5BanBnXkFtZT…"
            released: 2001-04-22T00:00:00.000+00:00
            runtime: 90
            title: "Revolution #9"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2001

         SCORE: 6.8415961265563965   _id:  "573a13a0f29313caabd05edb"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Friendship and betrayal between two poets during the French Revolution…"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-04-17 01:56:58.940000000"
            metacritic: 60
            num_mflix_comments: 0
            plot: "Friendship and betrayal between two poets during the French Revolution…"
            poster: "https://m.media-amazon.com/images/M/MV5BMTQ0Nzc0OTkwM15BMl5BanBnXkFtZT…"
            rated: "PG-13"
            released: 2001-04-18T00:00:00.000+00:00
            runtime: 124
            title: "Pandaemonium"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2000

         SCORE: 6.7074995040893555   _id:  "573a1397f29313caabce8972"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Set ten years after the most peaceful revolution in United States hist…"
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-10 17:14:53.427000000"
            num_mflix_comments: 1
            plot: "Set ten years after the most peaceful revolution in United States hist…"
            poster: "https://m.media-amazon.com/images/M/MV5BYTE5MGNhN2QtMTNhYy00MDQ1LTgzOT…"
            released: 1983-11-03T00:00:00.000+00:00
            runtime: 80
            title: "Born in Flames"
            tomatoes: Object
            type: "movie"
            writers: Array (2)
            year: 1983

         SCORE: 6.615457057952881   _id:  "573a1395f29313caabce1c90"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "The study of a youth on the edge of adulthood and his aunt, ten years …"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-21 00:16:07.580000000"
            num_mflix_comments: 0
            plot: "The study of a youth on the edge of adulthood and his aunt, ten years …"
            poster: "https://m.media-amazon.com/images/M/MV5BMmJjOGRjNWMtOGE5Ni00YzYwLThkM2…"
            released: 1964-05-12T00:00:00.000+00:00
            runtime: 105
            title: "Before the Revolution"
            tomatoes: Object
            type: "movie"
            writers: Array (2)
            year: 1964

         SCORE: 6.615457057952881   _id:  "573a13cef29313caabd86ecc"
            awards: Object
            cast: Array (1)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Through intimate interviews, provocative art, and rare, historical fil…"
            genres: Array (1)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-04-02 00:54:39.997000000"
            metacritic: 70
            num_mflix_comments: 1
            plot: "Through intimate interviews, provocative art, and rare, historical fil…"
            poster: "https://m.media-amazon.com/images/M/MV5BMjE1MDU1MDA2Nl5BMl5BanBnXkFtZT…"
            released: 2011-06-01T00:00:00.000+00:00
            runtime: 83
            title: "!Women Art Revolution"
            tomatoes: Object
            type: "movie"
            year: 2010
