curl --header "Authorization: Bearer ${ACCESS_TOKEN}" \
    --header "Accept: application/vnd.atlas.2025-03-12+json" \
    --header "Content-Type: application/json" \
    -X POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
    -d '{ "collectionName": "movies",
        "database": "sample_mflix",
        "name": "default",
        "type": "search",
        "definition": {
            "mappings": {
              "dynamic": false,
              "fields": {
                "plot": {
                  "type": "string",
                  "analyzer": "lucene.english"
                }
              }
            },
            "synonyms": [
              {
                "analyzer": "lucene.english",
                "name": "my_synonyms",
                "source": {
                  "collection": "synonymous_terms"
                }
              }
            ]
        }
    }'