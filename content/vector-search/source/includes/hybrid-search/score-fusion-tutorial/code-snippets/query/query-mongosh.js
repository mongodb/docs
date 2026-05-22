db.embedded_movies.aggregate( [
   {
      $scoreFusion: {
         input: {
            pipelines: {
               searchOne: [
                  {
                     "$vectorSearch": {
                        "index": "hybrid-vector-search",
                        "path": "plot_embedding_voyage_3_large",
                        "queryVector": STAR_WARS_EMBEDDING,
                        "numCandidates": 100,
                        "limit": 20
                     }
                  }
               ],
               searchTwo: [
                  {
                     "$search": {
                        "index": "hybrid-full-text-search",
                        "text": {
                           "query": "star wars",
                           "path": "title"
                        }
                     }
                  },
                  {
                     "$limit": 20
                  }
               ]
            },
            normalization: "sigmoid"
         },
         combination: {
            method: "expression",
            expression: {
               $sum: [
                 {$multiply: [ "$$searchOne", 10]}, "$$searchTwo"
               ]
            }
         },
         "scoreDetails": true
      }
   },
   {
      "$project": {
         _id: 1,
         title: 1,
         plot: 1,
         scoreDetails: {"$meta": "scoreDetails"}
      }
   },
   { $limit: 10 }
] )