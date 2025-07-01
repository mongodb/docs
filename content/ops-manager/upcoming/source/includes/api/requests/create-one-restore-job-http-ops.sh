curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --include \
  --request POST "https://<OpsManagerHost>:<Port>/api/public/v1.0/groups/{PROJECT-ID}/clusters/{CLUSTER-ID}/restoreJobs?pretty=true" \
  --data '
   {
     "delivery" : {
       "expirationHours" : "1",
       "maxDownloads" : "1",
       "methodName" : "HTTP"
     },
     "snapshotId" : "{SNAPSHOT-ID}"
   }'
