curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest --include \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId} | https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName|indexId}" \
     --data'
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