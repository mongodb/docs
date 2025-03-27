.. procedure:: 
   :style: normal 

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      {+cluster+}. For detailed instructions on  connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

   .. step:: Switch to the ``sample_mflix`` database. 

      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: shell

            use sample_mflix
      
         .. output:: 
            :language: shell
      
            switched to db sample_mflix

   .. step:: Run an |fts| query against the indexed field and sort the results.

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-desc.rst 

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-stages.rst

      .. io-code-block::
         :copyable: true
      
         .. input:: 
            :language: json

            db.movies.aggregate(
              {
                "$search": {
                  "index": "case-insensitive-sort",
                  "text": {
                    "path": "title",
                    "query": "train",
                  },
                  "sort": {
                    "title": 1
                  }
                }
              },
              {
                "$limit": 5
              },
              {
                "$project": {
                  "_id": 1,
                  "title": 1,
                  "awards": 1,
                  "score": { $meta: "searchScore" }
                }
              }
            )
      
         .. output:: 
            :language: javascript

            [
              {
                _id: ObjectId("573a139cf29313caabcf662c"),
                title: 'Atomic Train',
                awards: { wins: 1, nominations: 1, text: '1 win & 1 nomination.' },
                score: 3.317898988723755
              },
              {
                _id: ObjectId("64de50ae2932de4dd3203061"),
                title: 'atomic train',
                awards: { wins: 1, nominations: 1 },
                score: 3.317898988723755
              },
              {
                _id: ObjectId("573a13bbf29313caabd52ff4"),
                title: 'How to Train Your Dragon',
                awards: {
                  wins: 32,
                  nominations: 51,
                  text: 'Nominated for 2 Oscars. Another 30 wins & 51 nominations.'
                },
                score: 2.228306293487549
              },
              {
                _id: ObjectId("64de50da2932de4dd3204393"),
                title: 'how to train your dragon',
                awards: { wins: 32, nominations: 51 },
                score: 2.228306293487549
              },
              {
                _id: ObjectId("573a13ccf29313caabd83281"),
                title: 'How to Train Your Dragon 2',
                awards: {
                  wins: 18,
                  nominations: 52,
                  text: 'Nominated for 1 Oscar. Another 17 wins & 52 nominations.'
                },
                score: 2.008449077606201
              }
            ]

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-results.rst 

      .. code-block:: json
         :copyable: false 

         [
           {
             _id: ObjectId("573a139cf29313caabcf662c"),
             title: 'Atomic Train',
             awards: { wins: 1, nominations: 1, text: '1 win & 1 nomination.' },
             score: 3.3326687812805176
           },
          {
             _id: ObjectId("573a13bbf29313caabd52ff4"),
             title: 'How to Train Your Dragon',
             awards: {
               wins: 32,
               nominations: 51,
               text: 'Nominated for 2 Oscars. Another 30 wins & 51 nominations.'
             },
             score: 2.2382168769836426
           },
           {
             _id: ObjectId("573a13ccf29313caabd83281"),
             title: 'How to Train Your Dragon 2',
             awards: {
               wins: 18,
              nominations: 52,
               text: 'Nominated for 1 Oscar. Another 17 wins & 52 nominations.'
             },
             score: 2.0173802375793457
           },
           {
             _id: ObjectId("573a13b1f29313caabd36490"),
             title: "Howard Zinn: You Can't Be Neutral on a Moving Train",
             awards: { wins: 1, nominations: 0, text: '1 win.' },
             score: 1.446497917175293
           },
           {
             _id: ObjectId("573a13c8f29313caabd78a6b"),
             title: 'Last Train Home',
             awards: { wins: 14, nominations: 9, text: '14 wins & 9 nominations.' },
             score: 2.8655927181243896
           }
         ]  

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-run-query.rst
