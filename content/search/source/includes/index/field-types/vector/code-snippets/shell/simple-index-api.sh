curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  --header "Accept: application/vnd.atlas.2025-03-12+json" \
  --header "Content-Type: application/json" \
  -X POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
  -d '{ "collectionName": "embedded_movies",
        "database": "sample_mflix",
        "name": "default",
        "type": "search",
        "definition": {
          "mappings": { 
            "dynamic": true, 
            "fields": { 
              "plot_embedding_voyage_3_large": { 
                "numDimensions": 2048,
                "quantization": "scalar",
                "similarity": "dotProduct",
                "type": "vector"
              } 
            } 
          }
        }
    }'
