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
                 "query": "action",
                 "path": "title"
               }
             }
           }
         ]

      .. output:: 
         :language: js
         :visible: false

         SCORE: 4.001246452331543  _id: "573a1398f29313caabceac7f"
           awards: Object
           cast: Array (4)
           countries: Array (1)
           directors: Array (1)
           fullplot: "Jericho "Action" Jackson is a Detroit police sergeant who was demoted …"
           genres: Array (3)
           imdb: Object
           languages: Array (1)
           lastupdated: "2015-08-20 00:24:08.470000000"
           num_mflix_comments: 2
           plot: "Vengence drives a tough Detroit cop to stay on the trail of a power hu…"
           poster: "https://m.media-amazon.com/images/M/MV5BZWFhNmI3OWQtOTU5Zi00ODA3LWExNj…"
           rated: "R"
           released: 1988-02-12T00:00:00.000+00:00
           runtime: 96
           title: "Action Jackson"
           tomatoes: Object
           type: "movie"
           writers: Array (1)
           year: 1988

          SCORE: 4.001246452331543  _id:  "573a1399f29313caabcec6b7"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Jeb Ward is an attorney who specializes in whistle blower, David vs. Goliath cases. When a major auto manufacturer is accused of knowingly marketing a defective car, Ward takes on the case, risking everything."
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-06 00:42:51.167000000"
            metacritic: 58
            num_mflix_comments: 2
            plot: "Jeb Ward is an attorney who specializes in whistle blower, David vs. Goliath cases."
            poster: "https://m.media-amazon.com/images/M/MV5BNWY5Mjk4ZmItMTAzYS00NWE3LWEzYz…"
            rated: "R"
            released: 1991-03-15T00:00:00.000+00:00
            runtime: 110
            title: "Class Action"
            tomatoes: Object
            type: "movie"
            writers: Array (3)
            year: 1991

          SCORE: 4.001246452331543  _id:  "573a13b0f29313caabd333e7"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (1)
            fullplot: "Vishi is a local goon who basically likes beating up people to get his way. He falls in love with Khushi, but his life takes a turn when he crosses paths with a ruthless mafia kingpin."
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-10 17:20:55.697000000"
            num_mflix_comments: 1
            plot: "In order to escape crime and clutches of a ruthless mafia, a Bangkok based goon seeks help from his lookalike, a Mumbai based criminal."
            released: 2014-12-05T00:00:00.000+00:00
            runtime: 144
            title: "Action Jackson"
            tomatoes: Object
            type: "movie"
            writers: Array (3)
            year: 2014

          SCORE: 4.001246452331543  _id:  "573a13d2f29313caabd913dc"
            awards: Object
            countries: Array (1)
            directors: Array (1)
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-06-15 03:15:33.967000000"
            num_mflix_comments: 0
            released: 2011-01-28T00:00:00.000+00:00
            runtime: 45
            title: "Slow Action"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2011

          SCORE: 3.440462112426758  _id:  "573a1399f29313caabcedcb0"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Young Danny Madigan is a big fan of Jack Slater, a larger-than-life action hero. When Danny is given a magic ticket, he is transported into Slater's latest adventure."
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-31 00:11:25.920000000"
            metacritic: 44
            num_mflix_comments: 0
            plot: "With the help of a magic ticket, a young film fan is transported into the fictional world of his favorite action movie character."
            poster: "https://m.media-amazon.com/images/M/MV5BNjdhOGY1OTktYWJkZC00OGY5LWJhY2…"
            rated: "PG-13"
            released: 1993-06-18T00:00:00.000+00:00
            runtime: 130
            title: "Last Action Hero"
            tomatoes: Object
            type: "movie"
            writers: Array (4)
            year: 1993

          SCORE: 3.440462112426758  _id:  "573a139af29313caabcf0e84"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Jan Schlichtmann, a tenacious lawyer, is addressed by a group of families whose children have died from leukemia. He takes on a case against two large companies accused of dumping toxic waste."
            genres: Array (1)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-09-07 00:21:34.950000000"
            metacritic: 68
            num_mflix_comments: 0
            plot: "The families of children who died sue two companies for dumping toxic waste."
            poster: "https://m.media-amazon.com/images/M/MV5BZmEzNjhiZWEtNTM5OS00ZmQyLThhYj…"
            rated: "PG-13"
            released: 1999-01-08T00:00:00.000+00:00
            runtime: 115
            title: "A Civil Action"
            tomatoes: Object
            type: "movie"
            writers: Array (2)
            year: 1998

          SCORE: 2.687220573425293  _id:  "573a1398f29313caabcead32"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Colonel James Braddock has a Vietnamese wife who was supposed to leave Vietnam with him, but was left behind. Years later, he returns to rescue her and their son."
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-17 00:28:26.627000000"
            num_mflix_comments: 0
            plot: "Colonel James Braddock has a Vietnamese wife who was supposed to leave Vietnam with him, but was left behind."
            poster: "https://m.media-amazon.com/images/M/MV5BZTRjODU0MTUtMjBmMi00ZTBmLTk2MD…"
            rated: "R"
            released: 1988-03-02T00:00:00.000+00:00
            runtime: 101
            title: "Braddock: Missing in Action III"
            tomatoes: Object
            type: "movie"
            writers: Array (5)
            year: 1988

          SCORE: 2.687220573425293  _id:  "573a13a9f29313caabd1f502"
            awards: Object
            cast: Array (4)
            countries: Array (2)
            directors: Array (1)
            fullplot: "Bugs Bunny and Daffy Duck are up to their feuding ways again. Tired of all the attention going to Bugs, Daffy persuades the studio to let him go off on his own."
            genres: Array (3)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-28 00:30:31.080000000"
            metacritic: 64
            num_mflix_comments: 1
            plot: "The Looney Tunes search for a man's missing father and the mythical Blue Monkey diamond."
            poster: "https://m.media-amazon.com/images/M/MV5BMTkxNDk5MDQ2MF5BMl5BanBnXkFtZT…"
            rated: "PG"
            released: 2003-11-14T00:00:00.000+00:00
            runtime: 91
            title: "Looney Tunes: Back in Action"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2003

          SCORE: 2.4220800399780273  _id:  "573a13bdf29313caabd5acfe"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "Fueled by the belief that another world is possible, acclaimed filmmaker Velcrow Ripper takes us on a journey through the spiritual activism movement."
            genres: Array (1)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-12 00:50:56"
            num_mflix_comments: 1
            plot: "Captures the exciting movement of Spiritual Activism that is exploding around the planet."
            poster: "https://m.media-amazon.com/images/M/MV5BMTI2MjM2Mzk2NV5BMl5BanBnXkFtZT…"
            released: 2008-10-01T00:00:00.000+00:00
            runtime: 90
            title: "Fierce Light: When Spirit Meets Action"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 2008