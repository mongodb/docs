db.embedded_movies.aggregate( [
   {
      "$scoreFusion": {
         "input": {
            "pipelines": {
               "searchOne": [
                  {
                     "$vectorSearch": {
                        "index": "hybrid-vector-search",
                        "path": "plot_embedding_voyage_4_large",
                        "queryVector": CHARMING_ANIMAL_EMBEDDING,
                        "numCandidates": 500,
                        "limit": 50
                     }
                  }
               ],
               "searchTwo": [
                  {
                     "$search": {
                        "index": "hybrid-full-text-search",
                        "text": {
                           "query": "charming animal",
                           "path": "fullplot"
                        }
                     }
                  },
                  {
                     "$limit": 50
                  }
               ]
            },
            "normalization": "sigmoid"
         },
         "combination": {
            "method": "expression",
            "expression": {
               "$sum": [
                 {"$multiply": [ "$$searchOne", 10]}, "$$searchTwo"
               ]
            }
         },
         "scoreDetails": true
      }
   },
   {
      "$project": {
         "_id": 1,
         "title": 1,
         "fullplot": 1,
         "scoreDetails": {"$meta": "scoreDetails"}
      }
   },
   { "$limit": 10 }
] )