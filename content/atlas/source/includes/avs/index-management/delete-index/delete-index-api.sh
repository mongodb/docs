curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
     --header "Accept: application/json" \
     --include \
     --request DELETE "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId} | https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName|indexId}"