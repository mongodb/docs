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
              "dynamic": true|false | {
                "typeSet": "<type-set-name>"
              },
              "fields": { 
                "<field-name>": { 
                  "type": "document",
                  "dynamic": true|false,
                  "fields": {
                    "<sub-field-name>": {
                      <field-mapping-definition>
                    },
                    ...
                  }
                },
                ...
              }
            },
            "typeSets": [
              {
                "name": <type-set-name>",
                "types": [
                  {
                    "type": "<field-type>",
                    ...
                  },
                  ...
                ]
              }
            ]
        }
    }'
