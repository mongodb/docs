ACCESS_TOKEN=YOUR_ACCESS_TOKEN # replace with your service account access token
GROUP_ID=YOUR_GROUP_ID # replace with your project ID
CLUSTER_NAME=YOUR_CLUSTER_NAME # replace with your cluster's name

curl --header "Authorization: Bearer $ACCESS_TOKEN" \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/$GROUP_ID/clusters/$CLUSTER_NAME/search/indexes?pretty=true" \
     --data '{
         "collectionName": "movies",
         "database": "sample_mflix",
         "definition":{
           "mappings": {
             "dynamic": true
           }
         },
         "name": "default"
       }'
