curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--include \
--request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
--data '
  {
    "database": "sample_mflix",
    "collectionName": "embedded_movies",
    "type": "vectorSearch",
    "name": "vector_index",
    "definition: { 
      "fields":[ 
        {
          "type": "vector",
          "path": "plot_embedding_voyage_3_large",
          "numDimensions": 2048,
          "similarity": "dotProduct",
          "indexingMethod": "hnsw"
        },
        {
          "type": "filter",
          "path": "genres"
        },
        {
          "type": "filter",
          "path": "year"
        }
      ]
    }
  }'