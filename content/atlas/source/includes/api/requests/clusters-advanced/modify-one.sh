curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v1.5/groups/{GROUP-ID}/clusters/{CLUSTER-NAME}?pretty=true" \
     --data '{
         "biConnector" : {
           "enabled" : "true",
           "readPreference" : "analytics"
         }
       }'
