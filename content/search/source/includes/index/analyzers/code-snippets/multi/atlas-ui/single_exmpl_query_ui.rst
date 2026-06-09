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
                 "query": "liberte",
                 "path": { "value": "title", "multi": "frenchAnalyzer" }
               }
             }
           }
         ]

      .. output:: 
         :language: js
         :visible: false

         SCORE: 4.9305267333984375  _id:  "573a1392f29313caabcd9950"
            awards: Object
            cast: Array (4)
            countries: Array (1)
            directors: Array (1)
            fullplot: "A famous left-wing satirical comedy about two ex-convicts, one of whom…"
            genres: Array (2)
            imdb: Object
            languages: Array (1)
            lastupdated: "2015-08-21 00:02:36.330000000"
            num_mflix_comments: 1
            plot: "A famous left-wing satirical comedy about two ex-convicts, one of whom…"
            poster: "https://m.media-amazon.com/images/M/MV5BODg0ODAzNTItM2M4ZC00NGYxLWIzMm…"
            rated: "APPROVED"
            released: 1931-12-31T00:00:00.000+00:00
            runtime: 97
            title: "è Nous la Libertè"
            tomatoes: Object
            type: "movie"
            writers: Array (1)
            year: 1931