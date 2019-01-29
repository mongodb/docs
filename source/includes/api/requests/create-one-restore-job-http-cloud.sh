curl --user "{USERNAME}:{APIKEY}" --digest \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --include \
  --request POST "https://cloud.mongodb.com/api/public/v1.0/groups/{GROUP-ID}/clusters/{CLUSTER-ID}/restoreJobs?pretty=true" \
  --data '
   {
     "delivery" : {
       "expirationHours" : "1",
       "maxDownloads" : "1",
       "methodName" : "HTTP"
     },
     "snapshotId" : "{SNAPSHOT-ID}"
   }'
