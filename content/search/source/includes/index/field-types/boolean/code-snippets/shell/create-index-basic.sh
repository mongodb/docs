curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
    --header "Accept: application/vnd.atlas.2025-03-12+json" \
    --header "Content-Type: application/json" \
    -X POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
    -d '{ "collectionName": "customers",
        "database": "sample_analytics",
        "name": "default",
        "type": "search",
        "definition": {
            "mappings": { 
              "dynamic": true, 
              "fields": { 
                "active": { 
                  "type": "boolean",
                } 
              }
            }
        }
    }'