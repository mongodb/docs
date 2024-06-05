curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--include \
--request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
--data '
  {
    "database": "<name-of-database>",
    "collectionName": "<name-of-collection>",
    "type": "vectorSearch",
    "name": "<index-name>",
    "definition": {
      "fields":[ 
        {
          "type": "vector",
          "path": <field-to-index>,
          "numDimensions": <number-of-dimensions>,
          "similarity": "euclidean | cosine | dotProduct"
        },
        {
          "type": "filter",
          "path": "<field-to-index>"
        },
        ...
      }
    ]
  }'