curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--include \
--request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
--data '
  {
    "collectionName": "sample_mflix",
    "database": "embedded_movies",
    "type": "vectorSearch",
    "name": "vector_index",
    "definition: {
      "fields":[ 
        {
          "type": "vector",
          "path": "plot_embedding",
          "numDimensions": 1536,
          "similarity": "euclidean"
        }
      ]
    }
  }'