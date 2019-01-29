curl --user "{USERNAME}:{APIKEY}" --digest \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --include \
  --request POST "https://cloud.mongodb.com/api/public/v1.0/groups/{GROUP-ID}/clusters/{CLUSTER-ID}/restoreJobs?pretty=true" \
  --data '
   {
     "delivery" : {
       "methodName" : "AUTOMATED_RESTORE",
       "targetGroupId" : "{TARGET-GROUP-ID}",
       "targetClusterId" : "{TARGET-CLUSTER-ID}"
     },
     "pointInTimeUTCMillis" : "1536610288000"
   }'
