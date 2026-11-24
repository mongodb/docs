// :snippet-start: rankfusion-pipeline
db.embedded_movies.aggregate( [
   {
      $rankFusion: {
         input: {
            pipelines: {
               searchOne: [
                  {
                     "$vectorSearch": {
                        "index": "<INDEX_NAME>",
                        "path": "<FIELD_NAME>",
                        "queryVector": <QUERY_EMBEDDINGS>,
                        "numCandidates": 500,
                        "limit": 20
                     }
                  }
               ],
               searchTwo: [
                  {
                     "$search": {
                        "index": "<INDEX_NAME>",
                        "text": {
                           "query": "<QUERY_TERM>",
                           "path": "<FIELD_NAME>"
                        }
                     }
                  },
                  { "$limit": 20 }
               ],
            }
         }
      }
   },
   { $limit: 20 }
] )
// :snippet-end:
