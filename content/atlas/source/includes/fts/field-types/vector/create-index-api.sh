curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
    --header "Accept: application/vnd.atlas.2025-03-12+json" \
    --header "Content-Type: application/json" \
    -X POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
    -d '{ "collectionName": "<collection>",
        "database": "<database>",
        "name": "default",
        "type": "search",
        "definition": {
            "mappings": { 
              "dynamic": true|false, 
              "fields": { 
                "<field-name>": { 
                  "type": "vector",
                  "numDimensions": <number-of-dimensions>,
                  "similarity": "euclidean | cosine | dotProduct",
                  "quantization": "none | scalar | binary",
                  "hnswOptions": {
                    "maxEdges": <number-of-connected-neighbors>,
                    "numEdgeCandidates": <number-of-nearest-neighbors>
                  }
                } 
              }
            }
        }
    }'