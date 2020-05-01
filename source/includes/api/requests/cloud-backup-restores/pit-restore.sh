curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest --include \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{PROJECT-ID}/clusters/{SOURCE-CLUSTER-NAME}/backup/restoreJobs" \
     --data '{
       "deliveryType" : "pointInTime",
       "pointInTimeUTCSeconds" : 1588523147,
       "targetClusterName" : "{TARGET-CLUSTER-NAME}",
       "targetGroupId" : "{TARGET-PROJECT-ID}"
     }'
