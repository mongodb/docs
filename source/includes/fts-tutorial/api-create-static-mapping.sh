PUBLIC_KEY=MY_PUBLIC_KEY # replace replace with your public key
PRIVATE_KEY=MY_PRIVATE_KEY # replace with your private key
GROUP_ID=YOUR_GROUP_ID # replace with your project ID
CLUSTER_NAME=YOUR_CLUSTER_NAME # replace with your cluster's name

curl --user "$PUBLIC_KEY:$PRIVATE_KEY" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/$GROUP_ID/clusters/$CLUSTER_NAME/search/indexes?pretty=true" \
     --data '{
         "collectionName": "movies",
         "database": "sample_mflix",
         "definition":{
           "mappings": {
             "dynamic": false,
             "fields": {
               "title": {
                 "type": "string",
                 "analyzer": "lucene.standard",
                 "multi": {
                   "keywordAnalyzer": {
                     "type": "string",
                     "analyzer": "lucene.keyword"
                   }
                 }
               },
               "genres": {
                 "type": "string",
                 "analyzer": "lucene.standard"
               },
               "plot": {
                 "type": "string",
                 "analyzer": "lucene.standard"
               }
             }
           }
         },
         "name": "default"
       }'
