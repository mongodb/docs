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
                "type": "autocomplete",
                "analyzer": "<lucene.analyzer>",
                "tokenization": "edgeGram|rightEdgeGram|nGram",
                "minGrams": <2>,
                "maxGrams": <15>,
                "foldDiacritics": true|false,
                "similarity": { "type": "bm25|boolean|stableTfl" }
              } 
            }
          }
        }
    }'