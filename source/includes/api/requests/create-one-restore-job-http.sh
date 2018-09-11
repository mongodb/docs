curl --user "{USERNAME}:{APIKEY}" --digest \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --include \
  --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters/{CLUSTER-NAME}/restoreJobs?pretty=true" \
  --data '
   {
     "delivery" : {
       "expirationHours" : "1",
       "maxDownloads" : "1"
       "methodName" : "HTTP",
       "targetGroupId" : "{TARGET-GROUP-ID}",
       "targetClusterName" : "{TARGET-CLUSTER-NAME}"
     },
     "snapshotId" : "{SNAPSHOT-ID}"
   }'
